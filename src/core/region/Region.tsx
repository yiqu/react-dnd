import { Box, IconButton, LinearProgress, List, Stack, Typography } from "@mui/material";
import { PokemonTag, pokemonApi, useFetchPokemonsByRegionQuery } from "../store/pokemon.api";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { Pokemon } from "../store/pokemon.state";
import PokemonCard from "../detail/Pokemon";
import Refresh from "@mui/icons-material/Refresh";
import { useAppDispatch } from "../../store/appHook";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Draggable } from '@hello-pangea/dnd';
import { GREY } from "../../theme/palette";

export interface RegionProps {
  regionId: string;
  index: number;
}

function Region({ regionId, index }: RegionProps) {
  const dispatch = useAppDispatch();
  const { data, pokemonData, isFetching, isLoading } = useFetchPokemonsByRegionQuery(regionId ?? skipToken, {
    selectFromResult: (data) => ({
      ...data,
      pokemonData: data.data?.pokemons ?? []
    }),
  });

  const handleRefreshRegion = () => {
    dispatch(pokemonApi.util.invalidateTags([{type: PokemonTag, id: regionId}]));
  };

  return (
    <Draggable draggableId={ regionId } index={ index }>
      {
        (provided, snapshot) => {
          
          return (
            <Stack direction="column" justifyContent="start" alignItems="center" width="100%" ref={ provided.innerRef } { ...provided.draggableProps }
              bgcolor="#fff" 
              border={ snapshot.isDragging ? '2px solid' : 'none' } 
              borderColor={ snapshot.isDragging ? 'primary.main' : GREY[100] }
              borderRadius={ snapshot.isDragging ? '15px' : '0px' }
              paddingX={ snapshot.isDragging ? '20px' : '0px' }
            >
              <Stack direction="row" justifyContent="center" alignItems="center" width="100%">
                <IconButton aria-label="drag" { ...provided.dragHandleProps }>
                  <DragIndicatorIcon />
                </IconButton>
                <Typography variant="h6" my={ 2 } color={ import.meta.env.VITE_POKEMON_BLUE_COLOR }> { regionId.toUpperCase() } ({pokemonData.length})</Typography>
                <IconButton aria-label="refresh" onClick={ handleRefreshRegion } disabled={ isFetching }>
                  <Refresh />
                </IconButton>
              </Stack>
              <Box width="100%" height="5px">
                {
                  isFetching && <LinearProgress />
                }
              </Box>
              <Box width="100%">
                <List sx={ { width: '100%' } }>
                  {
                    pokemonData.map((pokemon: Pokemon) => {
                      return (
                        <PokemonCard key={ pokemon.id } id={ pokemon.id } name={ pokemon.name } sprite={ pokemon.sprite } />
                      );
                    })
                  }
                </List>
              </Box>
            </Stack>
          );
        }
      }
    </Draggable>
  );
}

export default Region;
import { Box, IconButton, LinearProgress, List, Skeleton, Stack, Typography } from "@mui/material";
import { PokemonTag, pokemonApi, useFetchPokemonsByRegionQuery } from "../store/pokemon.api";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { Pokemon } from "../store/pokemon.state";
import PokemonCard from "../detail/Pokemon";
import Refresh from "@mui/icons-material/Refresh";
import { useAppDispatch, useAppSelector } from "../../store/appHook";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Draggable, Droppable, DroppableProvided, DroppableStateSnapshot } from '@hello-pangea/dnd';
import { GREY } from "../../theme/palette";
import { selectAllowCrossRegionDrag } from "../store/pokemon-config.selectors";

export interface RegionProps {
  regionId: string;
  index: number;
}

function Region({ regionId, index }: RegionProps) {
  const dispatch = useAppDispatch();
  const isCrossRegionAllowed = useAppSelector(selectAllowCrossRegionDrag);
  const { data, pokemonData, isFetching, isLoading } = useFetchPokemonsByRegionQuery(regionId ?? skipToken, {
    selectFromResult: (data) => ({
      ...data,
      pokemonData: data.data?.pokemons ?? []
    }),
  });

  const handleRefreshRegion = () => {
    dispatch(pokemonApi.util.invalidateTags([{type: PokemonTag, id: regionId}]));
  };

  if (isLoading) {
    return (
      <Stack width="100%" direction="column" justifyContent="start" alignItems="center" spacing={ 3 }>
        <Skeleton animation="wave" width="100%" />
        <Skeleton animation="wave" width="100%" />
        <Skeleton animation="wave" width="100%" />
      </Stack>
    );
  }

  if (!data) {
    return null;
  }
  
  return (
    <Draggable draggableId={ `draggable-${regionId}` } index={ index }>
      {
        (provided, snapshot) => {
          
          return (
            <Stack direction="column" justifyContent="start" alignItems="center" width="100%" ref={ provided.innerRef } { ...provided.draggableProps }
              bgcolor="#fff" 
              border={ snapshot.isDragging ? '2px solid' : 'none' } 
              borderColor={ snapshot.isDragging ? 'primary.main' : GREY[100] }
              borderRadius={ snapshot.isDragging ? '15px' : '0px' }
              // paddingX={ snapshot.isDragging ? '20px' : '0px' }
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
                {/* set type to same for all Region List if you want to enable cross-dragging between regions */}
                <Droppable droppableId={ `droppable-${regionId}` } type={ isCrossRegionAllowed ? `pokemons-cross-regions` : `${regionId}-pokemons` }> 
                  {
                    (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
                      return (
                        <List 
                          { ...provided.droppableProps } 
                          ref={ provided.innerRef } 
                          sx={ {width: '100%', 
                            bgcolor: snapshot.isDraggingOver ? '#e6f2ff' : '#fff',
                            border: snapshot.isDraggingOver ? '1px solid' : 'initial',
                            borderColor: snapshot.isDraggingOver ? 'primary.main' : 'initial'
                          } }
                        >
                          {
                            pokemonData.map((pokemon: Pokemon, index: number) => {
                              return (
                                <PokemonCard key={ pokemon.id } id={ pokemon.id } name={ pokemon.name } sprite={ pokemon.sprite } index={ index } />
                              );
                            })
                          }
                          { provided.placeholder }
                        </List>
                      );
                    }
                  }
                </Droppable>
                
              </Box>
            </Stack>
          );
        }
      }
    </Draggable>
  );
}

export default Region;
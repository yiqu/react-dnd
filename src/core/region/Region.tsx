import { Box, IconButton, LinearProgress, List, Stack, Typography } from "@mui/material";
import { PokemonTag, pokemonApi, useFetchPokemonsByRegionQuery } from "../store/pokemon.api";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { Pokemon } from "../store/pokemon.state";
import PokemonCard from "../detail/Pokemon";
import Refresh from "@mui/icons-material/Refresh";
import { useAppDispatch } from "../../store/appHook";


export interface RegionProps {
  regionId: string;
}

function Region({ regionId }: RegionProps) {
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
    <Stack direction="column" justifyContent="start" alignItems="center" width="100%">
      <Stack direction="row" justifyContent="center" alignItems="center" width="100%">
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

export default Region;
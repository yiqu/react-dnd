import { Box, Button, Divider, Skeleton, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { pokemonApi, useFetchRegionListQuery } from '../store/pokemon.api';
import Region from '../region/Region';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAppDispatch } from '../../store/appHook';

function FilmsAll() {
  const dispatch = useAppDispatch();
  const { data, isFetching, isLoading, refetch } = useFetchRegionListQuery();

  const handleRefresh = () => {
    //dispatch(pokemonApi.util.invalidateTags([{type: PokemonTag}]));
    dispatch(pokemonApi.util.invalidateTags([{type: "Region", id: 'ALL'}]));
    //refetch();
  };
  
  if (isLoading) {
    return (
      <Box width="100%">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </Box>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Box width="100%">
      <Stack direction="row" justifyContent="start" alignItems="start" width="100%">
        <Button startIcon={ <RefreshIcon /> } variant='text' onClick={ handleRefresh }>
          Refresh
        </Button>
      </Stack>
      <Divider flexItem variant='fullWidth' />
      <Grid container xs={ 12 } columnSpacing={ 2 }>
        {
          data.map((res) => {
            return (
              <Grid xs={ 4 } key={ res }>
                <Region regionId={ res } />
              </Grid>
            );
          })
        }
      </Grid>
      <Divider flexItem variant='fullWidth' />
    </Box>
  );
}

export default FilmsAll;
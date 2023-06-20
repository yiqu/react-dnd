import { Box, Button, Divider, FormControlLabel, FormGroup, LinearProgress, Skeleton, Stack, Switch } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { pokemonApi, useFetchRegionListQuery, useUpdateRegionsMutation } from '../store/pokemon.api';
import Region from '../region/Region';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAppDispatch, useAppSelector } from '../../store/appHook';
import { DragDropContext, DragStart, DropResult, Droppable, DroppableProvided, DroppableStateSnapshot, ResponderProvided } from '@hello-pangea/dnd';
import { selectAllowCrossRegionDrag } from '../store/pokemon-config.selectors';
import { toggleCrossRegionDrag } from '../store/pokemon-config.reducer';
import { useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { Pokemon } from '../store/pokemon.state';


function FilmsAll() {
  const dispatch = useAppDispatch();
  const { data, isFetching, isLoading, refetch } = useFetchRegionListQuery();
  const [updateRegions, updateRegionsResult] = useUpdateRegionsMutation();
  const isCrossRegionAllowed = useAppSelector(selectAllowCrossRegionDrag);
  const [currentDragActionRegion, setCurrentDragActionRegion] = useState<string | undefined>(undefined);

  const handleRefresh = () => {
    //dispatch(pokemonApi.util.invalidateTags([{type: PokemonTag}]));
    dispatch(pokemonApi.util.invalidateTags([{type: "Region", id: 'ALL'}]));
    //refetch();
  };
  
  const pokemonsByRegionSelector = pokemonApi.endpoints.fetchPokemonsByRegion.select(currentDragActionRegion ?? skipToken);
  const pokemonsByRegion = useAppSelector(pokemonsByRegionSelector);

  const handleOnDragStart = (start: DragStart, provided: ResponderProvided) => {
    const regionId = start.type.split("-")[0];
    setCurrentDragActionRegion(regionId);
  };

  const handleOnDragEnd = (result: DropResult, provided: ResponderProvided) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId === result.source.droppableId && result.destination.index === result.source.index) {
      return;
    }

    if (result.type === 'regions') {
      const dataCopy = [...data ?? []];
      const newOrdered = reorder<string>(dataCopy, result.source.index, result.destination.index);
      updateRegions(newOrdered);
    }
    else if (result.type.includes('-pokemons')) {
      const dataCopy: Pokemon[] = [...pokemonsByRegion.data?.pokemons ?? []];
      const newOrdered = reorder<Pokemon>(dataCopy, result.source.index, result.destination.index);
      console.log(dataCopy);
      console.log(newOrdered);
    }
    
  };

  const handleCrossDragToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleCrossRegionDrag(event.target.checked));
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
      <Stack direction="row" justifyContent="space-between" alignItems="start" width="100%">
        <Button startIcon={ <RefreshIcon /> } variant='text' onClick={ handleRefresh }>
          Refresh
        </Button>
        <FormGroup>
          <FormControlLabel control={ <Switch value={ isCrossRegionAllowed } onChange={ handleCrossDragToggle } /> } label="Allow Cross Region" />
        </FormGroup>
      </Stack>
      <Divider flexItem variant='fullWidth' sx={ {mb: 1} } />
      <Box width="100%" height="5px">
        {
          isFetching && <LinearProgress />
        }
      </Box>
      <DragDropContext onDragEnd={ handleOnDragEnd } onDragStart={ handleOnDragStart }>
        <Droppable droppableId={ 'droppable-regions' } type='regions' direction='horizontal'>
          {
            (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
              return (
                <Grid container xs={ 12 } columnSpacing={ 2 } { ...provided.droppableProps } ref={ provided.innerRef }
                  border={ snapshot.isDraggingOver ? '1px solid' : 'initial' } 
                  borderColor={ snapshot.isDraggingOver ? 'primary.main' : 'initial' }
                >
                  {
                    data.map((res, index) => {
                      return (
                        <Grid xs={ snapshot.isDraggingOver ? 'auto' : 4 } key={ res }>
                          <Region regionId={ res } index={ index } />
                        </Grid>
                      );
                    })
                  }
                  {provided.placeholder}
                </Grid>
              );
            }
          }
        </Droppable>
      </DragDropContext>
      
      <Divider flexItem variant='fullWidth' />
    </Box>
  );
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list) as T[];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export default FilmsAll;
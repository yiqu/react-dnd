import { Box, Button, Divider, FormControlLabel, FormGroup, LinearProgress, Skeleton, Stack, Switch } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { pokemonApi, useFetchRegionListQuery, useUpdatePokemonsByRegionMutation, useUpdateRegionsMutation } from '../store/pokemon.api';
import Region from '../region/Region';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAppDispatch, useAppSelector } from '../../store/appHook';
import { DragDropContext, DragStart, DragUpdate, DropResult, Droppable, DroppableProvided, DroppableStateSnapshot, ResponderProvided } from '@hello-pangea/dnd';
import { selectAllowCrossRegionDrag } from '../store/pokemon-config.selectors';
import { toggleCrossRegionDrag } from '../store/pokemon-config.reducer';
import { useCallback, useMemo, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { Pokemon, REGIONS } from '../store/pokemon.state';
import useScreenSize from '../../shared/hooks/useScreensize';


function FilmsAll() {
  const dispatch = useAppDispatch();
  const { isAboveXl } = useScreenSize();

  // Region list
  const { data, isFetching, isLoading, refetch } = useFetchRegionListQuery();

  // Mutation hooks
  const [updateRegions, updateRegionsResult] = useUpdateRegionsMutation();
  const [updatePokemonsByRegion, updatePokemonsByRegionResult] = useUpdatePokemonsByRegionMutation();

  // Cross region mode
  const isCrossRegionAllowed = useAppSelector(selectAllowCrossRegionDrag);

  // Get the Pokemon list of the region you dragged to and from.
  // DestRegion is used when cross region is enabled
  const [currentDragActionRegion, setCurrentDragActionRegion] = useState<string | undefined>(undefined);
  const [currentDragActionDestRegion, setCurrentDragActionDestRegion] = useState<string | undefined>(undefined);
  const pokemonsByRegionSelector = useMemo(() => pokemonApi.endpoints.fetchPokemonsByRegion.select(currentDragActionRegion ?? skipToken),[currentDragActionRegion]);
  const pokemonsByDestRegioSelector = useMemo(() => pokemonApi.endpoints.fetchPokemonsByRegion.select(currentDragActionDestRegion ?? skipToken),[currentDragActionDestRegion]);
  const pokemonsByRegion = useAppSelector(pokemonsByRegionSelector);
  const pokemonsByDestRegion = useAppSelector(pokemonsByDestRegioSelector);

  const apiLoading = isFetching || updatePokemonsByRegionResult.isLoading || updateRegionsResult.isLoading;
  
  const handleRefresh = () => {
    //dispatch(pokemonApi.util.invalidateTags([{type: PokemonTag}]));
    dispatch(pokemonApi.util.invalidateTags([{type: "Region", id: 'ALL'}]));
    //refetch();
  };

  const handleOnDragStart = (start: DragStart, provided: ResponderProvided) => {
    if (isCrossRegionAllowed) {
      const sourceRegion = start.source.droppableId.split("-")[1];
      setCurrentDragActionRegion(sourceRegion);
    } else {
      const regionId = start.type.split("-")[0];
      setCurrentDragActionRegion(regionId);
    }
  };

  const handleOnDragUpdate = useCallback((update: DragUpdate, provided: ResponderProvided) => {
    if (!update.destination) {
      return;
    }
    if ((update.destination?.droppableId === update.source.droppableId) && update.destination.index === update.source.index) {
      return;
    }
    const destinationRegion = update.destination.droppableId.split("-")[1];
    setCurrentDragActionDestRegion(destinationRegion);
  }, []);

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
      const regionId = result.type.split("-")[0];
      if (REGIONS.includes(regionId)) {
        updatePokemonsByRegion({
          id: regionId,
          pokemons: newOrdered
        });
      }
    } else if (result.type === 'pokemons-cross-regions') {

      console.log(result);
      console.log(pokemonsByRegion.data);
      console.log(pokemonsByDestRegion.data);

      if (result.source.droppableId === result.destination.droppableId) {
        console.log("same region drop while cross region enabled");
      } else {
        console.log("cross region");
      }
    }
    
  };

  const handleCrossDragToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleCrossRegionDrag(event.target.checked));
  };
  
  if (isLoading) {
    return (
      <Stack width="100%" direction="column" spacing={ 3 }>
        <Skeleton animation="wave" sx={ {mt: 3} } />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </Stack>
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
          <FormControlLabel control={ <Switch checked={ isCrossRegionAllowed } onChange={ handleCrossDragToggle } /> } label="Allow Cross Region" />
        </FormGroup>
      </Stack>
      <Divider flexItem variant='fullWidth' sx={ {mb: 1} } />
      <Box width="100%" height="5px">
        {
          apiLoading && 
            <LinearProgress color={ (updatePokemonsByRegionResult.isLoading || updateRegionsResult.isLoading) ? 'warning' : 'success' } />
        }
      </Box>
      <DragDropContext onDragEnd={ handleOnDragEnd } onDragStart={ handleOnDragStart } onDragUpdate={ handleOnDragUpdate }>
        <Droppable droppableId={ 'droppable-regions' } type={ 'regions' } direction='horizontal'>
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
import { Alert, Box, Button, DialogActions, DialogContent, Divider, LinearProgress, MenuItem, Stack } from "@mui/material";
import Save from '@mui/icons-material/Save';
import Close from '@mui/icons-material/Close';
import HFTextField from "../../shared/hook-forms/TextField";
import HFSelectField from "../../shared/hook-forms/Select";
import { SmallText } from "./AddPokemon";
import Image from 'mui-image';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { isEmpty, startCase } from "lodash";
import { NewPokemon, PokemonSchema, UpdatePokemon } from "../store/pokemon.state";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAddPokemonMutation, useFetchPokemonsByRegionQuery, useFetchRegionListQuery, useUpdatePokemonMutation } from "../store/pokemon.api";
import { ellipsis } from "../../shared/utils/css.utils";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";
import { BASE_POKEMON_SPRITE_URL } from "../../shared/api/endpoints";
import produce from "immer";
import { DevTool } from "@hookform/devtools";
import { useAppendUserHistoryMutation } from "../../store/user-history/user-history.api";


export interface AddEditPokemonFormProps { 
  initValue: (NewPokemon & UpdatePokemon) | undefined;
  mode: "add" | "edit";
  onClose: () => void;
}

function AddEditPokemonForm({ initValue, mode, onClose }: AddEditPokemonFormProps) {

  const { handleSubmit, formState, control, watch, reset, setFocus } = useForm<NewPokemon & UpdatePokemon>({
    defaultValues: initValue,
    resolver: yupResolver(PokemonSchema),
    //mode: "onChange"
  });
  const pokemonName = watch("name");
  const pokemonId = watch("id");
  const region = watch("region");

  const { data: regionsList, isLoading, isFetching: isFetchRegionListFetching } = useFetchRegionListQuery();
  const { data: pokemonListByRegion, isFetching: isFetchPokemonsByRegionFetching } = useFetchPokemonsByRegionQuery((region ? region : skipToken), {
    refetchOnMountOrArgChange: true
  });
  const [addNewPokemon, addNewPokemonResult] = useAddPokemonMutation();
  const [updatePokemon, updatePokemonResult] = useUpdatePokemonMutation();
  const [updateHistory, updateHistoryResult] = useAppendUserHistoryMutation();
  const apiLoading: boolean = isFetchRegionListFetching || isFetchPokemonsByRegionFetching || addNewPokemonResult.isLoading || updatePokemonResult.isLoading;


  const handleDialogClose = () => {
    onClose();
  };

  const handleResetForm = () => {
    reset();
  };

  const handleSave = (pokemon: NewPokemon & UpdatePokemon) => {
    if (pokemonListByRegion) {
      if (mode === "add") {
        const add$ = addNewPokemon({
          ...pokemon,
          index: pokemonListByRegion.pokemons.length
        });
        add$.unwrap().then((res) => {
          reset();
          handleDialogClose();
        }).catch((error) => {
          console.log(error);
        });
      } else if (mode === "edit") {
        const newRegionList = produce(pokemonListByRegion, (draft) => {
          draft.pokemons[pokemon.index] = {
            id: +pokemon.id,
            name: pokemon.name,
            sprite: `${BASE_POKEMON_SPRITE_URL}${pokemon.id}.png`
          };
        });
        const update$ = updatePokemon(newRegionList);
        update$.unwrap().then((res) => {
          reset(pokemon);
          handleDialogClose();
        }).catch((error) => {
          console.log(error);
        });
      }

      updateHistory({
        actionEntity: 'pokemon',
        actionType: mode,
        actionEntitySource: pokemonListByRegion.id,
        actionEntitySourcePosition: initValue?.name ?? '',
        actionEntityTarget: pokemonListByRegion.id,
        actionEntityTargetPosition: pokemon.name,
      });
    }
  };

  return (
    <>
      <DialogContent>
        <Box width="100%" height="5px">
          {
            apiLoading && (<LinearProgress color={ (isFetchPokemonsByRegionFetching || isFetchRegionListFetching) ? "primary" : "warning" } />)
          }
        </Box>
        <Stack direction="row" justifyContent="start" alignItems="space-between" width="100%" mt={ 3 }>
          <Stack direction="column" justifyContent="start" alignItems="start" spacing={ 2 }  flexBasis="50%">
            <HFTextField name="name" label="Name" control={ control } variant="standard" type="text" helperText="Pokemon name" fullWidth />
            <HFTextField name="id" label="ID" control={ control } type="number" variant="standard" helperText="Pokemon ID" fullWidth />
            <HFSelectField name="region" label="Region" control={ control } variant="standard" helperText="Choose a Region" disabled={ mode==="add" ? false : true }>
              <MenuItem value="" disabled><em>None</em></MenuItem>
              {
                regionsList && regionsList.map((region: string) => {
                  return (
                    <MenuItem key={ region } value={ region }>{ startCase(region) }</MenuItem>
                  );
                })
              }
            </HFSelectField>
          </Stack>

          <Divider variant="middle" flexItem orientation="vertical" sx={ {mx: 4} } />
          
          <Stack direction="column" justifyContent="space-between" alignItems="start" flexBasis="50%" style={ {...ellipsis} }>
            <Box width="100%" >
              <SmallText>
                You are { mode==="add" ? 'adding a' : 'editing' } Pokemon:
              </SmallText>
              { pokemonName &&  <SmallText>
                <span style={ {fontWeight: 500} }>{ pokemonName }</span> 
              </SmallText> }
              { pokemonId && <SmallText>
                with an ID of <span style={ {fontWeight: 500} }>{ pokemonId }</span>
              </SmallText >}
              { region && <SmallText>
                in the region of <span style={ {fontWeight: 500} }>{ startCase(region) }</span>
              </SmallText> }
            </Box>
            <Image src={ pokemonId ? `${BASE_POKEMON_SPRITE_URL}${pokemonId}.png` : "/logo2.png" } height={ pokemonId ? '140px' : '40px' } alt="logo" fit="contain" />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" height="3rem">
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={ 1 }>
            <Button onClick={ handleDialogClose } variant="text" startIcon={ <Close /> }> Close </Button>
            <Button onClick={ handleResetForm } variant="text" startIcon={ <RestartAltIcon /> }> Reset </Button>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            { (!isEmpty(formState.errors)) && <Alert severity="error" variant="outlined" sx={ {fontSize: '14px', py: 0} }> Invalid fields </Alert> }
            <Button onClick={ handleSubmit(handleSave) } variant="contained" startIcon={ <Save /> } sx={ {ml: 3} }>
              Save { formState.isDirty && '*'}
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
      
      { import.meta.env.DEV && <DevTool control={ control } />}
    </>
  );
}

export default AddEditPokemonForm;
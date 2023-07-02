import { Alert, Box, Button, DialogActions, DialogContent, Divider, LinearProgress, MenuItem, Stack, Typography, styled } from "@mui/material";
import Add from '@mui/icons-material/Add';
import Save from '@mui/icons-material/Save';
import Close from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useState } from "react";
import DialogLayout from "../../shared/components/dialog/DialogLayout";
import { useForm } from "react-hook-form";
import { DEFAULT_NEW_POKEMON, NewPokemon, PokemonSchema } from "../store/pokemon.state";
import HFTextField from "../../shared/hook-forms/TextField";
import Image from 'mui-image';
import { ellipsis } from "../../shared/utils/css.utils";
import HFSelectField from "../../shared/hook-forms/Select";
import { useAddPokemonMutation, useFetchPokemonsByRegionQuery, useFetchRegionListQuery } from "../store/pokemon.api";
import { isEmpty, startCase } from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import { skipToken } from "@reduxjs/toolkit/dist/query/react";

function AddPokemon() {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { data: regionsList, isLoading, isFetching: isFetchRegionListFetching } = useFetchRegionListQuery();
  const { handleSubmit, formState, control, watch, reset, setFocus } = useForm<NewPokemon>({
    defaultValues: DEFAULT_NEW_POKEMON,
    resolver: yupResolver(PokemonSchema),
    //mode: "onChange"
  });
  const pokemonName = watch("name");
  const pokemonId = watch("id");
  const region = watch("region");
  const { data: pokemonListByRegion, isFetching: isFetchPokemonsByRegionFetching } = useFetchPokemonsByRegionQuery((region ? region : skipToken), {
    refetchOnMountOrArgChange: true
  });
  const [addNewPokemon, addNewPokemonResult] = useAddPokemonMutation();
  const apiLoading: boolean = isFetchRegionListFetching || isFetchPokemonsByRegionFetching || addNewPokemonResult.isLoading;
  
  const handleAddPokemon = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleResetForm = () => {
    reset();
  };

  const handleSave = (pokemon: NewPokemon) => {
    if (pokemonListByRegion) {
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
    }
  };
  
  return (
    <>
      <Button startIcon={ <Add /> } variant='text' onClick={ handleAddPokemon }>
        Add Pokemon
      </Button>

      <DialogLayout open={ dialogOpen } title={ <>Add New Pokemon</> } onClose={ handleDialogClose } maxWidth="sm">
        <Box width="100%" height="5px">
          {
            apiLoading && (<LinearProgress color={ (isFetchPokemonsByRegionFetching || isFetchRegionListFetching) ? "primary" : "warning" } />)
          }
        </Box>
        <DialogContent>
          <Stack direction="row" justifyContent="start" alignItems="space-between" width="100%" mt={ 3 }>
            <Stack direction="column" justifyContent="start" alignItems="start" spacing={ 2 }  flexBasis="50%">
              <HFTextField name="name" label="Name" control={ control } variant="standard" type="text" helperText="Pokemon name" fullWidth />
              <HFTextField name="id" label="ID" control={ control } type="number" variant="standard" helperText="Pokemon ID" fullWidth />
              <HFSelectField name="region" label="Region" control={ control } variant="standard" helperText="Choose a Region">
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
                  You are adding a Pokemon called...
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
              <Image src="/logo2.png" height={ '40px' } alt="logo" showLoading fit="contain" />
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
      </DialogLayout>
    </>
  );
}

export const SmallText = styled(Typography)(() => ({
  ...ellipsis,
  fontSize: '13px',
}));


export default AddPokemon;
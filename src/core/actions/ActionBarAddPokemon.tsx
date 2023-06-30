import { Button, DialogContent, Divider, Stack, Typography } from "@mui/material";
import Add from '@mui/icons-material/Add';
import { useState } from "react";
import DialogLayout from "../../shared/components/dialog/DialogLayout";
import { useForm } from "react-hook-form";
import { DEFAULT_NEW_POKEMON, NewPokemon } from "../store/pokemon.state";
import HFTextField from "../../shared/hook-forms/TextField";

function AddPokemon() {
  console.log("RENDER");

  const { handleSubmit, formState, control, watch } = useForm<NewPokemon>({
    defaultValues: DEFAULT_NEW_POKEMON
  });
  const pokemonName = watch("name");
  const pokemonId = watch("id");

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleAddPokemon = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  return (
    <>
      <Button startIcon={ <Add /> } variant='text' onClick={ handleAddPokemon }>
        Add Pokemon
      </Button>

      <DialogLayout open={ dialogOpen } title={ <>Add New Pokemon</> } onClose={ handleDialogClose } maxWidth="sm">
        <DialogContent>
          <Stack direction="row" justifyContent="start" alignItems="start" width="100%" mt={ 3 }>
            <Stack direction="column" justifyContent="start" alignItems="start" spacing={ 2 }  flexBasis="50%">
              <HFTextField name="name" label="Name" control={ control } variant="standard" type="text" fullWidth />
              <HFTextField name="id" label="ID" control={ control } type="number" variant="standard" fullWidth />
            </Stack>

            <Divider variant="middle" flexItem orientation="vertical" sx={ {mx: 4} } />
            
            <Stack direction="column" justifyContent="start" alignItems="start" flexBasis="50%">
              <Typography>
                You are adding a Pokemon called
              </Typography>
              <Typography>
                <span style={ {fontWeight: 500} }>{ pokemonName }</span> with ID of <span style={ {fontWeight: 500} }>{ pokemonId }</span>.
              </Typography>
            </Stack>
          </Stack>
          
        </DialogContent>
      </DialogLayout>


    </>
  );
}

export default AddPokemon;
import { Button, Typography, styled } from "@mui/material";
import Add from '@mui/icons-material/Add';
import { useCallback, useState } from "react";
import { DEFAULT_NEW_POKEMON } from "../store/pokemon.state";
import { ellipsis } from "../../shared/utils/css.utils";
import AddEditPokemonForm from "./AddEditPokemonForm";
import DialogLayout from "../../shared/components/dialog/DialogLayout";

function AddPokemon() {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleAddPokemon = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, []);
  
  return (
    <>
      <Button startIcon={ <Add /> } variant='text' onClick={ handleAddPokemon }>
        Add Pokemon
      </Button>

      <DialogLayout open={ dialogOpen } title={ <>Add New Pokemon</> } onClose={ handleDialogClose } maxWidth="sm">
        <AddEditPokemonForm initValue={ DEFAULT_NEW_POKEMON as any } mode="add" onClose={ handleDialogClose } />
      </DialogLayout>
    </>
  );
}

export const SmallText = styled(Typography)(() => ({
  ...ellipsis,
  fontSize: '13px',
}));


export default AddPokemon;
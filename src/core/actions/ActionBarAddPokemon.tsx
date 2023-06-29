import { Button, DialogContent, DialogContentText } from "@mui/material";
import Add from '@mui/icons-material/Add';
import { useState } from "react";
import DialogLayout from "../../shared/components/dialog/DialogLayout";


function AddPokemon() {

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

      <DialogLayout open={ dialogOpen } title={ <>Title</> } onClose={ handleDialogClose } maxWidth="sm">
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>

        </DialogContent>
      </DialogLayout>


    </>
  );
}

export default AddPokemon;
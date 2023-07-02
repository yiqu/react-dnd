import { Dialog, DialogProps, DialogTitle, IconButton, Stack } from "@mui/material";
import Close from '@mui/icons-material/Close';

export interface DialogLayoutProps {
  open: boolean;
  title: React.ReactNode;
  maxWidth?: DialogProps['maxWidth'];
  onClose: (payload?: any) => void;
  children: React.ReactNode
}

function DialogLayout({ open, title, maxWidth="lg", onClose, children }: DialogLayoutProps) {

  const handleClose = () => {
    onClose();
  };


  return (
    <Dialog
      fullWidth={ true }
      maxWidth={ maxWidth }
      open={ open }
      onClose={ handleClose }
    >
      <DialogTitle sx={ {backgroundColor: "background.default", color: 'text.primary'} }>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          { title}
          <IconButton aria-label="close" onClick={ handleClose }> <Close /> </IconButton> 
        </Stack>
        
      </DialogTitle>
       
      { children }
    </Dialog>
  );
}


export default DialogLayout;
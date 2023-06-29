import { Dialog, DialogProps, DialogTitle } from "@mui/material";

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
      <DialogTitle sx={ {backgroundColor: "background.default", color: 'text.primary'} }> { title} </DialogTitle>
       
      { children }
    </Dialog>
  );
}


export default DialogLayout;
import { AppBar } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import { GREY } from "../../../theme/palette";
import { useTheme } from '@mui/material/styles';

interface ToolbarProps {
  toolbarProps: any;
  children: any;
}

export default function AppToolbar({ toolbarProps, children }: ToolbarProps) {
  const theme = useTheme();
  return (
    <AppBar elevation={ 0 } { ...toolbarProps } style={ {backgroundColor: theme.palette.mode ===  'light' ? GREY[100] : null, color: theme.palette.mode === 'light' ? '#000' : null } }>
      <Toolbar 
        variant="regular" 
        sx={ {bgcolor: (theme) => theme.palette.mode === 'light' ? GREY[100] : null, 
          color: (theme) => theme.palette.mode === 'light' ? '#000' : null,
          //pr: 0
        } }>
        { children }
      </Toolbar>
    </AppBar>
  );
}
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { AppBar } from '../routes/Layouts/layout-components';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// import { useState } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, Button, Container, PaletteMode, Stack, Tooltip } from "@mui/material";
import ThemeContext from "../../src/theme/ThemeContext";
import { useLocalStorage } from 'react-use';
import { LS_APP_THEME } from "../../src/shared/utils/constants";

export interface TopNavProps {
  open: boolean;
  onNavOpen: (openState: boolean) => void;
}

export default function TopNav() {

  const pages = ['Films', 'About'];

  const location = useLocation();
  // const [title, setTitle] = useState<string>();
  // const [titleUrlPath, setTitleUrlPath] = useState<string>('');
  const themeContext = useContext(ThemeContext);
  const [_currentTheme, setLocalStorageTheme, _remove] = useLocalStorage<PaletteMode>(LS_APP_THEME, 'light');
  
  useEffect(() => {
    // const urlArray: string[] = location.pathname.split("/");
    // let pathTitle: string = urlArray[1];
    // setTitleUrlPath(pathTitle);
    // if (pathTitle === 'core') {
    //   pathTitle = urlArray[2];
    //   setTitleUrlPath(`core/${pathTitle}`);
    // }
    // setTitle(pathTitle);
  }, [location.pathname]);

  const toggleThemeHandler = () => {
    const themeToSet = themeContext.currentTheme==='light' ? 'dark' : 'light';
    themeContext.setTheme(themeToSet);
    setLocalStorageTheme(themeToSet);
  };

  const handlePageClick = () => {
    
  };

  return (
    <React.Fragment>
      <AppBar position="static" elevation={ 1 }>
        <Container maxWidth="lg">
          <Toolbar>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
              <Stack direction="row" justifyContent="start" alignItems="center">
                <Box sx={ { flexGrow: 1, display: { xs: 'none', md: 'flex' } } }>
                  { pages.map((page) => (
                    <Button
                      key={ page }
                      onClick={ handlePageClick }
                      sx={ { my: 2, color: 'white', display: 'block' } }
                    >
                      {page}
                    </Button>
                  )) }
                </Box>
              </Stack>

              <Tooltip title={ `Turn ${themeContext.currentTheme==='light'?'off':'on'} the lights` }>
                <IconButton sx={ { ml: 1 } } color="inherit" onClick={ toggleThemeHandler }>
                  { themeContext.currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon /> }
                </IconButton>
              </Tooltip>

            </Stack>
          </Toolbar>
        </Container>
       

        {/* Nested Action bar that is sticky under main top nav */}
        {/* <AppBar position="sticky" elevation={ 0 }>
          <Toolbar variant="dense" sx={ {bgcolor: '#fff', color: '#000'} }>
            <Button color="inherit" variant="text">
              <RefreshIcon sx={ {mr: '10px'} } />
              Refresh
            </Button>
          </Toolbar>
        </AppBar> */}
          
      </AppBar>
    </React.Fragment>
  );
}

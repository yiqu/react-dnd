/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { AppBar } from '../routes/Layouts/layout-components';
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
// import { useState } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, Button, Container, PaletteMode, Stack } from "@mui/material";
import ThemeContext from "../../src/theme/ThemeContext";
import { useLocalStorage } from 'react-use';
import { APP_TOOLTIP_ID, LS_APP_THEME } from "../../src/shared/utils/constants";
import { GREY } from "../theme/palette";
import Image from 'mui-image';

export interface TopNavProps {
  open: boolean;
  onNavOpen: (openState: boolean) => void;
}

export default function TopNav() {

  const pages = ['Pokemons', 'History', 'About'];

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
      <AppBar position="static" elevation={ 0 }>
        <Container maxWidth="xl" disableGutters>
          <Toolbar>
            <Stack direction="row" justifyContent="center" alignItems="center" mr={ 2 }
              component={ Link } to={ "/" }>
              <Image src="/logo1.png" height={ '64px' } alt="logo" />
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
              <Stack direction="row" justifyContent="start" alignItems="center">
                <Box sx={ { flexGrow: 1, display: { xs: 'none', md: 'flex' } } }>
                  { pages.map((page) => (
                    <Button
                      component={ Link }
                      to={ `/${page.toLowerCase()}` }
                      key={ page }
                      onClick={ handlePageClick }
                      sx={ { color: GREY[200],
                        '&:hover': {
                          color: GREY[200],
                          textDecoration: 'underline'
                       }
                      } }
                    >
                      {page}
                    </Button>
                  )) }
                </Box>
              </Stack>

              <IconButton sx={ { ml: 1 } } color="inherit" onClick={ toggleThemeHandler }
                data-tooltip-id={ APP_TOOLTIP_ID }
                data-tooltip-content={ `Turn ${themeContext.currentTheme==='light'?'off':'on'} the lights` }
              >
                { themeContext.currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon /> }
              </IconButton>

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

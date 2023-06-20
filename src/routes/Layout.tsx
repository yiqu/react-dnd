import { useContext, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { getMyTheme } from '../../src/theme/AppTheme';
import ThemeContext from '../../src/theme/ThemeContext';
import Grid from '@mui/material/Unstable_Grid2';
import { GREY } from '../../src/theme/palette';
import { Toaster } from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import TopNav from '../top-nav/TopNav';
import { Box } from '@mui/material';
import LayoutWithGutter from '../shared/components/layouts/LayoutWithGutter';
import { APP_TOOLTIP_ID } from '../shared/utils/constants';

const Layout = () => {
  
  const themeContext = useContext(ThemeContext);
  const theme: Theme = useMemo(() => {
    return createTheme(getMyTheme(themeContext.currentTheme));
  }, [themeContext.currentTheme]);


  return (
    <ThemeProvider theme={ theme }>
      <Box sx={ { display: 'flex', height: '100%' } }>

        <Box component="main" sx={ { flexGrow: 1, bgcolor:(theme) => theme.palette.mode === 'light' ? GREY[0] : null } }>

          <Grid container xs={ 12 } sx={ {
            bgcolor:(theme) => theme.palette.mode === 'light' ? GREY[0] : '#000',
            background: 'url(logo1.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '10rem',
            backgroundPosition: '95% 100%'
          } }>
            <LayoutWithGutter size='skinny'>
              <>
                <TopNav />
            
                <Outlet />
              </>
            </LayoutWithGutter>
            

          </Grid>
        </Box>
        <Toaster
          position="top-center"
          containerClassName="toast-container"
          containerStyle={ {} }
          toastOptions={ {
            className: 'dnd-toast',
            duration: 5000,
            success: {
              duration: 8000,
            },
            error: {
              duration: 10000
            }
          } }
        />
        <Tooltip id={ APP_TOOLTIP_ID } place="bottom" />
      </Box>
    </ThemeProvider>
    
  );
};

export default Layout;
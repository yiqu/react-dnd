import React, { useContext, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import routeList from './routes/Routes';
import { useLocalStorage } from 'react-use';
import ThemeContext, { ThemeContextProp } from './theme/ThemeContext';
import { PaletteMode } from '@mui/material';
import { LS_APP_THEME } from './shared/utils/constants';
import { UAParser } from 'ua-parser-js'; 
import { sha1 } from 'object-hash';
import { useAppDispatch } from './store/appHook';
import { updateUser } from './store/auth/auth.reducer';
import { User } from './store/auth/auth.state';

let firstTime = true;

function App() {
  const dispatch = useAppDispatch();
  const [theme, _setTheme, _remove] = useLocalStorage<PaletteMode>(LS_APP_THEME, 'light');
  const themeContext: ThemeContextProp = useContext(ThemeContext);

  useEffect(() => {
    themeContext.setTheme(theme!);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    if (firstTime) {
      const parser = new UAParser();
      const result = parser.getResult();
      const userHash = sha1(result);
      const user: User = {
        userHash,
        userAgent: result
      };
      dispatch(updateUser(user));
    }
    firstTime = false;
  }, [dispatch]);

  return (
    <React.Fragment>
      <RouterProvider router={ routeList } />
    </React.Fragment>
  );
}

export default App;

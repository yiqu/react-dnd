import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'animate.css';
import App from './App';
import 'react-tooltip/dist/react-tooltip.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { ThemeContextProvider } from './theme/ThemeContext';
import { Provider } from 'react-redux';
import { appStore } from './store/appStore';
// import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={ appStore }>
      {/* <PersistGate loading={ null } persistor={ persistor }> */}
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
  
);
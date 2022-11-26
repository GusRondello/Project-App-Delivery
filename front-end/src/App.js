import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import Common from './routers/Common';
import Customer from './routers/Customer';
import Seller from './routers/Seller';
import Admin from './routers/Admin';
import GlobalStyle from './styles/Globals';
import DeliveryContext from './context/DeliveryContext';
import { lightTheme, darkTheme } from './components/Themes';

function App() {
  const { theme } = useContext(DeliveryContext);

  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <div>
        <GlobalStyle />
        <Common />
        <Customer />
        <Seller />
        <Admin />
      </div>
    </ThemeProvider>
  );
}

export default App;

import React, { useEffect, useContext } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import DeliveryContext from '../context/DeliveryContext';
import Button from './Button';
import FlexRow from './FlexRow';

function ThemeComponent() {
  const { theme, setTheme } = useContext(DeliveryContext);

  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  // cria função para chamar o setMode e trocar o tema
  const themeToggler = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('appDeliveryTheme');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  return (
    <Button onClick={ themeToggler }>
      <FlexRow as="abbr" title="Mode" align="center">
        {theme === 'light' ? (
          <MdDarkMode id="modeIcon" />
        ) : (
          <MdLightMode id="modeIcon" />
        )}
      </FlexRow>
    </Button>
  );
}

export default ThemeComponent;

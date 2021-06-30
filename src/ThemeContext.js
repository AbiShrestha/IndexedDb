import React from 'react';
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
  red: {
    foreground: '#ffffff',
    background: '#800000',
  },
  blue: {
    foreground: '#ffffff',
    background: '#0000FF',
  },
};
export const ThemeContext = React.createContext(themes.light);
export const user = {
  name: '',
  age: '',
  email: '',
  ssn: '',
};
export const UserContext = React.createContext(user);

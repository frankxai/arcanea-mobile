import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Theme, elementalThemes, ElementalTheme } from './theme';

interface ThemeContextType {
  theme: Theme;
  elementalTheme: ElementalTheme;
  setElementalTheme: (theme: ElementalTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [elementalTheme, setElementalTheme] = useState<ElementalTheme>('void');
  const [theme, setTheme] = useState<Theme>(elementalThemes[elementalTheme]);

  const updateElementalTheme = (newTheme: ElementalTheme) => {
    setElementalTheme(newTheme);
    setTheme(elementalThemes[newTheme]);
  };

  return (
    <ThemeContext.Provider value={{ theme, elementalTheme, setElementalTheme: updateElementalTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

type Theme = 'system' | 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event: SelectChangeEvent<unknown>, child?: React.ReactNode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 서버에서는 기본값(예: 'light')을 사용하고, 클라이언트 하이드레이션 후에 로컬 스토리지 값을 반영
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle(
        'dark', 
        storedTheme === "dark" ||
          (storedTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
  }, []);

  const toggleTheme = ({ target: { value } }: SelectChangeEvent<unknown>, child?: React.ReactNode) => {
    const newTheme = value as Theme;
    setTheme(newTheme);
    document.documentElement.classList.toggle(
      'dark', 
      newTheme === "dark" ||
      (newTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
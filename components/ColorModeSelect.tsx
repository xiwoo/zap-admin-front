'use client'
import * as React from 'react';
// import { useColorScheme } from '@mui/material/styles';
import { useTheme } from '@/context/ThemeContext';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';

export default function ColorModeSelect(props: SelectProps) {
  
  const { theme, toggleTheme } = useTheme();

  // const { mode, setMode } = useColorScheme();
  // if (!mode) {
  //   return null;
  // }
  return (
    <Select
      value={theme}
      onChange={toggleTheme}
      // SelectDisplayProps={{
      //   // @ts-ignore
      //   'data-screenshot': 'toggle-mode',
      // }}
      {...props}
    >
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}
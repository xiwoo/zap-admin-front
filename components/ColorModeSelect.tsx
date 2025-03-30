'use client'
import * as React from 'react';
import { useTheme } from '@/context/ThemeContext';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';

export default function ColorModeSelect(props: SelectProps) {
  
  const { theme, toggleTheme } = useTheme();

  return (
    <Select
      value={theme}
      onChange={toggleTheme}
      {...props}
    >
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}
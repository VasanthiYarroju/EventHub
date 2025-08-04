// src/components/admin/ThemeSwitcher.js
import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-switcher" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}>
      {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
    </div>
  );
};

export default ThemeSwitcher;
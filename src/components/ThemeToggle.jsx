import React from 'react';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="
        relative w-9 h-9 flex items-center justify-center rounded-full
        transition-all duration-200 group
        dark:text-cinema-text-soft dark:hover:text-cinema-amber
        text-light-text-soft hover:text-light-text
        dark:hover:bg-cinema-border/40 hover:bg-light-border
      "
    >
      <span className="absolute inset-0 rounded-full transition-opacity duration-200 opacity-0 group-hover:opacity-100 dark:bg-cinema-border/30 bg-light-border/60" />
      {dark ? (
        <RiSunLine className="w-[18px] h-[18px] relative z-10 transition-transform duration-300 group-hover:rotate-12" />
      ) : (
        <RiMoonLine className="w-[18px] h-[18px] relative z-10 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
import React from 'react';
import { useIsDarkMode } from '@/hooks/use-is-dark-mode';

interface ThemeModeProps {
  children: (theme: 'dark' | 'light') => React.ReactNode;
  fallback?: React.ReactNode;
}

export function ThemeMode({ children, fallback = null }: ThemeModeProps) {
  const isDarkMode = useIsDarkMode();

  if (isDarkMode == null) {
    return fallback;
  }

  return children(isDarkMode ? 'dark' : 'light');
}

import { useTheme } from 'nextra-theme-docs';
import { useEffect, useState } from 'react';

export function useIsDarkMode() {
  const { resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  return isDarkMode;
}

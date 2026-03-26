import { createContext, useState, useEffect, useCallback } from 'react';

export const THEMES = {
  OCEAN: 'ocean',
  CODE: 'code',
  FUSION: 'fusion',
};

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('atp-theme') || THEMES.FUSION;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('atp-theme', theme);
  }, [theme]);

  const switchTheme = useCallback((newTheme) => {
    if (newTheme === theme || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(newTheme);
      setTimeout(() => setIsTransitioning(false), 800);
    }, 50);
  }, [theme, isTransitioning]);

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

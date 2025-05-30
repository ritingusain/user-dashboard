'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Types
type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
};

// Constants
const STORAGE_KEY = 'theme';
const THEME_CLASSES = ['light', 'dark'] as const;

// Utils
const getSystemTheme = (): Theme => 
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const getSavedTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(STORAGE_KEY) as Theme;
  return THEME_CLASSES.includes(saved) ? saved : null;
};

// Context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme
  useEffect(() => {
    const initialTheme = getSavedTheme() || getSystemTheme();
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  // Sync theme with DOM
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    THEME_CLASSES.forEach(cls => root.classList.remove(cls));
    root.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = getSavedTheme();
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted]);

  const toggleTheme = useCallback(() => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  }, []);

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  // Prevent flash of wrong theme
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 
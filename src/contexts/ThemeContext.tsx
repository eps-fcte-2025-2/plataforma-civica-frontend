'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'normal' | 'high-contrast';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isHighContrast: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('normal');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && (savedTheme === 'normal' || savedTheme === 'high-contrast')) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    if (theme === 'high-contrast') {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'normal' ? 'high-contrast' : 'normal');
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      isHighContrast: theme === 'high-contrast'
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
"use client"

import { useState, useEffect, useCallback } from 'react';
import { playButtonClickSound } from '@/utils/sound';

export type Theme = 'light' | 'dark' | 'system';

interface ThemePreferences {
  theme: Theme;
  systemPreference: 'light' | 'dark';
}

const STORAGE_KEY = 'grean-theme-preference';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  // Get system preference
  const getSystemPreference = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'dark';
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Get stored theme preference
  const getStoredTheme = useCallback((): Theme => {
    if (typeof window === 'undefined') return 'system';
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored as Theme;
      }
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
    }
    
    return 'system';
  }, []);

  // Save theme preference
  const saveTheme = useCallback((newTheme: Theme) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, []);

  // Get effective theme (resolves 'system' to actual theme)
  const getEffectiveTheme = useCallback((themeValue: Theme, systemPref: 'light' | 'dark'): 'light' | 'dark' => {
    return themeValue === 'system' ? systemPref : themeValue;
  }, []);

  // Apply theme to document
  const applyTheme = useCallback((effectiveTheme: 'light' | 'dark') => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(effectiveTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', effectiveTheme === 'dark' ? '#0a1628' : '#ffffff');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = effectiveTheme === 'dark' ? '#0a1628' : '#ffffff';
      document.head.appendChild(meta);
    }
  }, []);

  // Set theme
  const setThemeValue = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    saveTheme(newTheme);
    
    const effectiveTheme = getEffectiveTheme(newTheme, systemPreference);
    applyTheme(effectiveTheme);
    
    playButtonClickSound();
    
    // Dispatch custom event for theme change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('grean:theme-change', {
        detail: { theme: newTheme, effectiveTheme }
      }));
    }
  }, [systemPreference, getEffectiveTheme, applyTheme, saveTheme]);

  // Toggle between light and dark (skips system)
  const toggleTheme = useCallback(() => {
    const currentEffective = getEffectiveTheme(theme, systemPreference);
    const newTheme = currentEffective === 'dark' ? 'light' : 'dark';
    setThemeValue(newTheme);
  }, [theme, systemPreference, getEffectiveTheme, setThemeValue]);

  // Cycle through all themes: light -> dark -> system
  const cycleTheme = useCallback(() => {
    const themeOrder: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setThemeValue(themeOrder[nextIndex]);
  }, [theme, setThemeValue]);

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = getStoredTheme();
    const systemPref = getSystemPreference();
    
    setTheme(storedTheme);
    setSystemPreference(systemPref);
    
    const effectiveTheme = getEffectiveTheme(storedTheme, systemPref);
    applyTheme(effectiveTheme);
    
    setMounted(true);
  }, [getStoredTheme, getSystemPreference, getEffectiveTheme, applyTheme]);

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemPref = e.matches ? 'dark' : 'light';
      setSystemPreference(newSystemPref);
      
      // If using system theme, update the applied theme
      if (theme === 'system') {
        applyTheme(newSystemPref);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme, applyTheme]);

  // Get current effective theme
  const effectiveTheme = getEffectiveTheme(theme, systemPreference);

  return {
    theme,
    effectiveTheme,
    systemPreference,
    mounted,
    setTheme: setThemeValue,
    toggleTheme,
    cycleTheme,
    isLight: effectiveTheme === 'light',
    isDark: effectiveTheme === 'dark',
    isSystem: theme === 'system'
  };
}

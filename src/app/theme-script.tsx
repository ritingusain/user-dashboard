'use client';

import React from 'react';

export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        // Remove any existing theme classes
        document.documentElement.classList.remove('light', 'dark');
        // Add the correct theme class
        document.documentElement.classList.add(initialTheme);
      } catch (e) {
        console.error('Theme initialization failed:', e);
      }
    })()
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      id="theme-script"
    />
  );
} 
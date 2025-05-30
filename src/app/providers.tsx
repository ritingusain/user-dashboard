'use client';

import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </ThemeProvider>
  );
} 
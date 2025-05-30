/**
 * User Context Provider
 * Handles user data management and persistence
 * 
 * @author Ritin Gusain
 * @created 2025
 */

'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Basic types a developer would start with
type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    street?: string;
    city: string;
    zipcode?: string;
  };
};

type UserContextType = {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  deleteUser: (id: number) => void;
  loading: boolean;
  error: string | null;
};

// Simple storage helpers
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (users: User[]) => {
  try {
    localStorage.setItem('users', JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users:', err);
  }
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load users on mount
  useEffect(() => {
    const loadUsers = async () => {
      // Try to load from storage first
      const savedUsers = loadFromStorage();
      if (savedUsers?.length) {
        setUsers(savedUsers);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Failed to fetch');
        
        const data = await res.json();
        setUsers(data);
        saveToStorage(data);
      } catch (err) {
        console.error('Error loading users:', err);
        setError('Could not load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Basic CRUD operations
  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser = {
      ...userData,
      id: Date.now(), // Simple ID generation
    };

    setUsers(current => {
      const updated = [...current, newUser];
      saveToStorage(updated);
      return updated;
    });
  };

  const deleteUser = (id: number) => {
    setUsers(current => {
      const updated = current.filter(user => user.id !== id);
      saveToStorage(updated);
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

// Simple hook for using the context
export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within UserProvider');
  }
  return context;
} 
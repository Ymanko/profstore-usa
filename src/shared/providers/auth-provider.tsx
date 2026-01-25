'use client';

import { createContext, useContext, useState } from 'react';

import type { Customer } from '@/shared/queries/customer/types';
import type { ReactNode } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  customer: Customer | null;
  setCustomer: (customer: Customer | null) => void;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  initialCustomer: Customer | null;
}

export function AuthProvider({ children, initialCustomer }: AuthProviderProps) {
  const [customer, setCustomer] = useState<Customer | null>(initialCustomer);
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialCustomer);

  return (
    <AuthContext.Provider value={{ isAuthenticated, customer, setCustomer, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

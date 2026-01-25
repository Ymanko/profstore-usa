'use client';

import { createContext, useContext } from 'react';

import type { Customer } from '@/shared/queries/customer/types';
import type { ReactNode } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  customer: Customer | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  initialCustomer: Customer | null;
}

export function AuthProvider({ children, initialCustomer }: AuthProviderProps) {
  // Customer data is managed by the server - use router.refresh() to update
  const customer = initialCustomer;
  const isAuthenticated = !!initialCustomer;

  return (
    <AuthContext.Provider value={{ isAuthenticated, customer }}>
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

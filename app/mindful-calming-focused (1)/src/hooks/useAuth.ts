import { useState, useEffect } from 'react';
import { User } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('truthWithinUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('truthWithinUser');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      isGuest: false,
      subscriptionType: 'free',
      meditationStreak: 7,
      totalSessions: 23,
      totalMinutes: 345,
      createdAt: new Date()
    };
    
    setUser(newUser);
    localStorage.setItem('truthWithinUser', JSON.stringify(newUser));
    return newUser;
  };

  const signUp = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: '1',
      email,
      name,
      isGuest: false,
      subscriptionType: 'free',
      meditationStreak: 0,
      totalSessions: 0,
      totalMinutes: 0,
      createdAt: new Date()
    };
    
    setUser(newUser);
    localStorage.setItem('truthWithinUser', JSON.stringify(newUser));
    return newUser;
  };

  const guestAccess = () => {
    const guestUser: User = {
      id: 'guest',
      email: 'guest@example.com',
      name: 'Guest',
      isGuest: true,
      subscriptionType: 'free',
      meditationStreak: 0,
      totalSessions: 0,
      totalMinutes: 0,
      createdAt: new Date()
    };
    
    setUser(guestUser);
    localStorage.setItem('truthWithinUser', JSON.stringify(guestUser));
    return guestUser;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('truthWithinUser');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('truthWithinUser', JSON.stringify(updatedUser));
  };

  return {
    user,
    isLoading,
    signIn,
    signUp,
    guestAccess,
    signOut,
    updateUser
  };
};
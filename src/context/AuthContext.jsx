import React, { createContext, useContext, useState, useEffect } from 'react';
import { TelegramWebApp } from '../bot/tmaSdk';

const AuthContext = createContext(null);

export const DEMO_ACCOUNTS = {
  traveler: {
    id: 'usr-trav-001',
    name: 'Bethlehem Tadesse',
    phone: '+251 911 482910',
    email: 'bethlehem@example.com',
    role: 'traveler', // 'traveler' | 'host' | 'admin'
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    nationalId: 'ET-AA-0928419',
    emergencyContact: '+251 922 113355 (Brother: Dawit)',
    city: 'Addis Ababa (Bole)',
    joinedDate: 'January 2026',
    tickets: [
      {
        id: 'tkt-8842',
        bookingRef: 'GZ-8842-ETH',
        tripTitle: 'Wenchi Crater Lake Hike & Boat',
        departureDate: '2026-09-13',
        seats: 2,
        totalPaidETB: 4400,
        organizerName: 'Addis Hikers Club',
        status: 'CONFIRMED',
        pickupLocation: 'Meskel Square, Addis Ababa (06:00 AM)',
        qrCode: 'GZ-8842-ETH-WENCHI-2SEATS'
      },
      {
        id: 'tkt-8843',
        bookingRef: 'GZ-8843-ETH',
        tripTitle: 'Simien Mountains 4-Day Trek',
        departureDate: '2026-10-04',
        seats: 1,
        totalPaidETB: 24500,
        organizerName: 'Simien Highland Trekkers',
        status: 'CONFIRMED',
        pickupLocation: 'Gondar Airport / Circle Hotel (07:30 AM)',
        qrCode: 'GZ-8843-ETH-SIMIEN-1SEAT'
      }
    ]
  },
  host: {
    id: 'usr-host-002',
    name: 'Addis Hikers Club',
    ownerName: 'Yonas Bekele',
    phone: '+251 911 234567',
    email: 'info@addishikers.et',
    role: 'host',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    licenseNumber: 'MOT-ET-2025-08492',
    city: 'Addis Ababa',
    telegramChannel: '@AddisHikersClub',
    joinedDate: 'September 2025',
    verified: true,
    tickets: []
  },
  admin: {
    id: 'usr-adm-003',
    name: 'Bole Operations HQ',
    phone: '+251 911 000000',
    email: 'ops@guzotribe.et',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80',
    city: 'Addis Ababa (Bole Medhanialem)',
    joinedDate: 'August 2025',
    tickets: []
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('guzotribe_user');
      return saved ? JSON.parse(saved) : DEMO_ACCOUNTS.traveler;
    } catch {
      return DEMO_ACCOUNTS.traveler;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('guzotribe_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('guzotribe_user');
      }
    } catch {}
  }, [user]);

  // Login with Phone + OTP
  const loginWithPhone = (phone, _otp) => {
    TelegramWebApp.haptic('success');
    const existing = Object.values(DEMO_ACCOUNTS).find((acc) => acc.phone === phone);
    const loggedInUser = existing || {
      id: 'usr-' + Date.now(),
      name: 'Traveler ' + phone.slice(-4),
      phone,
      email: `${phone.replace(/\D/g, '')}@guzotribe.et`,
      role: 'traveler',
      city: 'Addis Ababa',
      joinedDate: 'September 2026',
      tickets: []
    };
    setUser(loggedInUser);
    return loggedInUser;
  };

  // Login with Telegram 1-click
  const loginWithTelegram = (tgUser = null) => {
    TelegramWebApp.haptic('success');
    const loggedInUser = {
      id: tgUser?.id ? `tg-${tgUser.id}` : 'tg-892810',
      name: tgUser?.first_name ? `${tgUser.first_name} ${tgUser.last_name || ''}`.trim() : 'Telegram Adventurer',
      phone: '+251 9' + Math.floor(10000000 + Math.random() * 90000000),
      email: tgUser?.username ? `${tgUser.username}@telegram.org` : 'telegram.user@guzotribe.et',
      role: 'traveler',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
      city: 'Addis Ababa',
      joinedDate: 'September 2026',
      tickets: []
    };
    setUser(loggedInUser);
    return loggedInUser;
  };

  // Login with Email & Password
  const loginWithEmail = (email, _password) => {
    TelegramWebApp.haptic('success');
    const existing = Object.values(DEMO_ACCOUNTS).find((acc) => acc.email === email);
    const loggedInUser = existing || {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0],
      phone: '+251 911 000000',
      email,
      role: 'traveler',
      city: 'Addis Ababa',
      joinedDate: 'September 2026',
      tickets: []
    };
    setUser(loggedInUser);
    return loggedInUser;
  };

  // Register new account
  const register = (data) => {
    TelegramWebApp.haptic('success');
    const newUser = {
      id: 'usr-' + Date.now(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      role: data.role || 'traveler',
      city: data.city || 'Addis Ababa',
      businessName: data.businessName,
      licenseNumber: data.licenseNumber,
      joinedDate: 'September 2026',
      tickets: []
    };
    setUser(newUser);
    return newUser;
  };

  // Quick Demo Account Switcher
  const switchDemoRole = (roleKey) => {
    TelegramWebApp.haptic('impact');
    if (DEMO_ACCOUNTS[roleKey]) {
      setUser(DEMO_ACCOUNTS[roleKey]);
    }
  };

  // Logout
  const logout = () => {
    TelegramWebApp.haptic('impact');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithPhone,
        loginWithTelegram,
        loginWithEmail,
        register,
        logout,
        switchDemoRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

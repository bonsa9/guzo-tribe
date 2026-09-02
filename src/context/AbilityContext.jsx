import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';

const AbilityContext = createContext(null);

export function defineRulesFor(user) {
  const role = user?.role || 'traveler';

  return {
    role,
    can(action, subject) {
      if (role === 'admin') return true;

      if (role === 'host') {
        if (subject === 'Trip' && ['create', 'read', 'update'].includes(action)) return true;
        if (subject === 'Manifest' && ['read', 'print'].includes(action)) return true;
        if (subject === 'EscrowPayout' && ['create', 'read'].includes(action)) return true;
        if (subject === 'Booking' && ['read'].includes(action)) return true;
        return false;
      }

      // Traveler role
      if (subject === 'Trip' && action === 'read') return true;
      if (subject === 'Booking' && ['create', 'read', 'cancel'].includes(action)) return true;
      if (subject === 'GroupSplit' && ['create', 'read', 'pay'].includes(action)) return true;
      if (subject === 'Manifest' && action === 'read') return true;
      if (subject === 'EscrowPayout') return false; // Not allowed

      return false;
    },
    cannot(action, subject) {
      return !this.can(action, subject);
    }
  };
}

export function AbilityProvider({ children }) {
  const { user } = useAuth();

  const ability = useMemo(() => {
    return defineRulesFor(user);
  }, [user]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

export function useAbility() {
  const context = useContext(AbilityContext);
  if (!context) {
    throw new Error('useAbility must be used within an AbilityProvider');
  }
  return context;
}

export function Can({ I, a, children, fallback = null }) {
  const { can } = useAbility();
  return can(I, a) ? <>{children}</> : <>{fallback}</>;
}

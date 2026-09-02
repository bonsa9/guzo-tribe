import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useToast } from './ToastContext';

const DataSourceContext = createContext(null);

export function DataSourceProvider({ children }) {
  const { addToast } = useToast();

  const [dataMode, setDataModeState] = useState(() => {
    try {
      return localStorage.getItem('guzotribe_data_mode') || 'backend';
    } catch {
      return 'backend';
    }
  });

  const [isBackendOnline, setIsBackendOnline] = useState(true);

  // Sync mode with api service
  useEffect(() => {
    api.setMode(dataMode);
    try {
      localStorage.setItem('guzotribe_data_mode', dataMode);
    } catch {}
  }, [dataMode]);

  // Ping backend to check real liveness
  const checkBackendHealth = useCallback(async () => {
    try {
      const res = await fetch('/api/trips', { method: 'GET', signal: AbortSignal.timeout(2500) });
      setIsBackendOnline(res.ok);
    } catch {
      setIsBackendOnline(false);
    }
  }, []);

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 15000);
    return () => clearInterval(interval);
  }, [checkBackendHealth]);

  const setDataMode = (mode) => {
    setDataModeState(mode);
    api.setMode(mode);
    try {
      localStorage.setItem('guzotribe_data_mode', mode);
    } catch {}

    if (mode === 'mock') {
      addToast('Switched to Mock Data Mode (Instant Local Datasets)', 'info');
    } else {
      addToast(
        isBackendOnline
          ? 'Switched to Live NestJS & PostgreSQL Backend'
          : 'Switched to Backend (Server Offline - fallback active)',
        isBackendOnline ? 'success' : 'warning'
      );
    }
  };

  const toggleDataMode = () => {
    setDataMode(dataMode === 'backend' ? 'mock' : 'backend');
  };

  return (
    <DataSourceContext.Provider
      value={{
        dataMode,
        isMock: dataMode === 'mock',
        isBackend: dataMode === 'backend',
        isBackendOnline,
        setDataMode,
        toggleDataMode,
        checkBackendHealth
      }}
    >
      {children}
    </DataSourceContext.Provider>
  );
}

export function useDataSource() {
  const context = useContext(DataSourceContext);
  if (!context) {
    throw new Error('useDataSource must be used within a DataSourceProvider');
  }
  return context;
}

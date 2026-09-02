import React from 'react';
import { Database, Zap, RefreshCw } from 'lucide-react';
import { useDataSource } from '../context/DataSourceContext';

export default function DataSourceToggle({ variant = 'navbar' }) {
  const { dataMode, isMock, isBackendOnline, toggleDataMode } = useDataSource();

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-4 right-4 z-40 animate-fade-in">
        <button
          onClick={toggleDataMode}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full shadow-lg border backdrop-blur-md text-xs font-bold transition-all cursor-pointer hover:scale-105 ${
            isMock
              ? 'bg-amber-500/90 hover:bg-amber-600 text-white border-amber-400'
              : 'bg-emerald-800/90 hover:bg-emerald-900 text-white border-emerald-700'
          }`}
          title={`Click to switch to ${isMock ? 'Live NestJS Backend' : 'Mock Data Mode'}`}
        >
          {isMock ? (
            <>
              <Zap className="w-3.5 h-3.5 text-amber-200" />
              <span>Mock Data</span>
            </>
          ) : (
            <>
              <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
              <Database className="w-3.5 h-3.5 text-emerald-200" />
              <span>NestJS API</span>
            </>
          )}
          <RefreshCw className="w-3 h-3 text-white/70 ml-0.5" />
        </button>
      </div>
    );
  }

  // Default navbar pill variant
  return (
    <button
      type="button"
      onClick={toggleDataMode}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
        isMock
          ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100 shadow-2xs'
          : 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100 shadow-2xs'
      }`}
      title={`Current mode: ${dataMode.toUpperCase()}. Click to switch to ${isMock ? 'NestJS Backend API' : 'Mock Data Mode'}`}
    >
      {isMock ? (
        <>
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="hidden sm:inline">Mock Data</span>
          <span className="sm:hidden">Mock</span>
        </>
      ) : (
        <>
          <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-600 animate-pulse' : 'bg-rose-500'}`} />
          <span className="hidden sm:inline">Backend API</span>
          <span className="sm:hidden">API</span>
        </>
      )}
    </button>
  );
}

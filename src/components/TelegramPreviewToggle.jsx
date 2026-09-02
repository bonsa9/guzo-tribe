import React from 'react';
import { Send, Smartphone, Monitor, ShieldCheck, MoreVertical, X } from 'lucide-react';

export default function TelegramPreviewToggle({ isTelegramMode, setIsTelegramMode, lang }) {
  return (
    <div className="fixed top-24 right-4 z-40 hidden md:block animate-fade-in">
      <div className="bg-stone-900/90 text-white backdrop-blur-md p-2 rounded-2xl border border-stone-700 shadow-xl flex items-center gap-2">
        <button
          onClick={() => setIsTelegramMode(false)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            !isTelegramMode ? 'bg-emerald-700 text-white shadow-sm' : 'text-stone-400 hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Web</span>
        </button>

        <button
          onClick={() => setIsTelegramMode(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isTelegramMode ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30' : 'text-stone-400 hover:text-white'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Telegram TMA</span>
        </button>
      </div>
    </div>
  );
}

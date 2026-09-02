import React from 'react';
import { Terminal } from 'lucide-react';

export default function WebhookTerminal({ webhookLogs }) {
  return (
    <div className="bg-stone-950 text-stone-300 p-5 rounded-3xl border border-stone-800 space-y-3 font-mono text-xs shadow-xl">
      <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <Terminal className="w-4 h-4" />
          <span>Live Payment & Escrow Webhook Stream</span>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {webhookLogs.map((log, idx) => (
          <div key={idx} className="p-2 rounded-xl bg-stone-900/80 border border-stone-800/80 text-[11px] space-y-0.5">
            <div className="flex items-center justify-between text-stone-500">
              <span className="text-amber-400 font-bold">{log.event}</span>
              <span>{log.time}</span>
            </div>
            <pre className="text-stone-300 overflow-x-auto text-[10px] leading-tight">
              {JSON.stringify(log.data, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

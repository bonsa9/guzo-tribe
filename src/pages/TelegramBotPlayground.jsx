import React, { useState } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  Smartphone, 
  ExternalLink, 
  CheckCheck, 
  Paperclip, 
  Smile, 
  ArrowLeft,
  Share2,
  Download,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { processBotCommand, BOT_INFO } from '../bot/botEngine';
import { TelegramWebApp } from '../bot/tmaSdk';
import { useNavigate } from 'react-router-dom';

export default function TelegramBotPlayground({ lang, setIsTelegramMode }) {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      time: '02:24 AM',
      ...processBotCommand('/start')
    }
  ]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Trigger bot response
    setTimeout(() => {
      TelegramWebApp.haptic('impact');
      const botResponse = processBotCommand(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...botResponse
      };
      setMessages(prev => [...prev, botMsg]);
    }, 400);
  };

  const handleButtonClick = (btn) => {
    TelegramWebApp.haptic('impact');
    if (btn.action === 'OPEN_TMA') {
      setIsTelegramMode(true);
      if (btn.url) navigate(btn.url);
    } else if (btn.action === 'COMMAND') {
      handleSendMessage(btn.command);
    } else if (btn.action === 'DOWNLOAD_TICKET') {
      alert('Downloading E-Ticket PDF...');
    } else if (btn.action === 'LINK') {
      window.open(btn.url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1621] text-white flex flex-col items-center justify-center p-2 sm:p-4 md:p-6">
      
      {/* Container simulating Telegram Desktop/Mobile Client */}
      <div className="w-full max-w-2xl bg-[#17212b] rounded-3xl shadow-2xl border border-stone-800 flex flex-col h-[88vh] overflow-hidden">
        
        {/* Telegram Chat Header */}
        <div className="bg-[#242f3d] px-5 py-3.5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-600 to-sky-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-bold text-sm sm:text-base text-white">{BOT_INFO.name}</h2>
                <span className="text-[10px] bg-sky-500/20 text-sky-400 border border-sky-500/40 px-1.5 py-0.2 rounded font-mono">
                  BOT
                </span>
              </div>
              <p className="text-[11px] text-stone-400">bot • {BOT_INFO.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsTelegramMode(true);
                navigate('/trips');
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Launch TMA WebApp</span>
            </button>
          </div>
        </div>

        {/* Telegram Chat Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0e1621] bg-opacity-95">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-[#2b5278] text-white rounded-br-none'
                    : 'bg-[#182533] text-stone-200 border border-stone-800 rounded-bl-none'
                }`}
              >
                {/* Message Text formatted with markdown bold */}
                <div className="whitespace-pre-line space-y-1">
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i}>
                      {line.startsWith('**') ? <strong>{line.replace(/\*\*/g, '')}</strong> : line}
                    </p>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-1 text-[10px] text-stone-400 mt-1">
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-sky-400" />}
                </div>
              </div>

              {/* Telegram Inline Keyboard Buttons */}
              {msg.buttons && msg.buttons.length > 0 && (
                <div className="mt-2 space-y-1.5 w-full max-w-[85%] sm:max-w-[75%]">
                  {msg.buttons.map((btn, bIdx) => (
                    <button
                      key={bIdx}
                      onClick={() => handleButtonClick(btn)}
                      className="w-full py-2.5 px-3 bg-[#242f3d] hover:bg-[#2c394a] text-sky-300 hover:text-white rounded-xl text-xs font-bold border border-sky-500/20 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {btn.action === 'OPEN_TMA' && <ExternalLink className="w-3.5 h-3.5" />}
                      <span>{btn.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Command Shortcuts Toolbar */}
        <div className="bg-[#17212b] px-4 py-2 border-t border-stone-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] text-stone-500 font-bold uppercase shrink-0">Commands:</span>
          {['/start', '/trips', '/my_tickets', '/host', '/help'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleSendMessage(cmd)}
              className="px-2.5 py-1 rounded-lg bg-[#242f3d] hover:bg-sky-500 hover:text-white text-stone-300 font-mono text-[11px] transition-all cursor-pointer shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <div className="bg-[#242f3d] p-3 border-t border-stone-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Write a message or type /start, /trips..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            className="flex-1 bg-[#17212b] border border-stone-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-sky-500"
          />

          <button
            onClick={() => handleSendMessage()}
            className="w-10 h-10 rounded-xl bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}

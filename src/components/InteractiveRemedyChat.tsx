/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Interactive Remedy & Prescription Loop
 * Completely open, free-form conversational apothecary without pre-written chips.
 */

import React, { useState, useRef, useEffect } from 'react';
import { CombinedOracleContext } from '../lib/esotericEngines.ts';
import { playCrystalChime } from '../lib/sound.ts';
import { Send, Loader2, Copy, Check } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'oracle';
  text: string;
  timestamp: string;
}

interface Props {
  context: CombinedOracleContext;
  soundEnabled: boolean;
}

export const InteractiveRemedyChat: React.FC<Props> = ({ context, soundEnabled }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const { pennick, iching, queryMeta } = context;

  // Initial welcome message once mounted
  useEffect(() => {
    if (messages.length === 0) {
      const welcome: ChatMessage = {
        id: 'welcome-0',
        sender: 'oracle',
        text: `The oracle synthesis is sealed. The remedy apothecary is open for any question or request for an esoteric, herbal, behavioral, or ritual prescription.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([welcome]);
    }
  }, [context]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendQuestion = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = inputQuestion.trim();
    if (!q || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/oracle/remedy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          context,
          question: q,
          conversationHistory: messages.map((m) => ({ role: m.sender, content: m.text })),
        }),
      });

      if (!res.ok) throw new Error('Failed to retrieve remedy');
      const data = await res.json();

      const oracleMsg: ChatMessage = {
        id: `oracle-${Date.now()}`,
        sender: 'oracle',
        text: data.remedy,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, oracleMsg]);
      if (soundEnabled) playCrystalChime(639, 3.0); // 639 Hz Interpersonal Solfeggio frequency
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'oracle',
        text: `Based on Pennick's ${pennick.primaryFigure.name} and Hexagram ${iching.primaryHexagram.number}: work with ${pennick.primaryFigure.herbalAlly} and practice unhurried emotional receptivity today.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="remedies-section" className="bg-[#0b0e17]/95 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
      {/* Apothecary Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            🌿
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-mono">
              The Esoteric Apothecary
            </div>
            <h3 className="text-xl font-title font-bold text-amber-200">
              Interactive Remedy & Prescription Loop
            </h3>
          </div>
        </div>

        <div className="text-xs text-stone-400 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Pennick & I Ching Engine Active</span>
        </div>
      </div>

      {/* Dialogue Thread */}
      <div className="space-y-4 my-6 max-h-[500px] overflow-y-auto pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-1 text-[11px] font-mono text-stone-500">
              <span>{msg.sender === 'user' ? (queryMeta.userName || 'You') : 'Oracle Apothecary'}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-amber-500/15 border border-amber-500/40 text-amber-100 font-sans'
                  : 'bg-[#121626]/90 border border-emerald-500/30 text-stone-200 font-serif'
              }`}
            >
              <div className="whitespace-pre-line space-y-2">
                {msg.text}
              </div>

              {msg.sender === 'oracle' && (
                <div className="mt-3 pt-2 border-t border-stone-800/60 flex justify-end">
                  <button
                    onClick={() => handleCopyMessage(msg.id, msg.text)}
                    className="flex items-center gap-1 text-[11px] font-mono text-stone-400 hover:text-emerald-300 transition-colors"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === msg.id ? 'Prescription Copied' : 'Copy Prescription'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-1 text-[11px] font-mono text-stone-500">
              <span>Oracle Apothecary</span>
              <span>•</span>
              <span>Formulating Prescription...</span>
            </div>
            <div className="bg-[#121626] border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3 text-stone-300 text-sm">
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>Blending Nigel Pennick’s earth allies with I Ching changing lines...</span>
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Free-form Inscription Input Bar */}
      <div className="pt-2">
        <form onSubmit={handleSendQuestion} className="flex gap-2">
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="Type any question or ask: 'Give me today's herbal/esoteric remedy'..."
            disabled={isLoading}
            className="flex-1 bg-stone-900/90 border border-stone-700/80 focus:border-emerald-400 rounded-xl px-4 py-3.5 text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all font-sans"
          />
          <button
            type="submit"
            disabled={!inputQuestion.trim() || isLoading}
            className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-stone-950 font-title font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.25)]"
          >
            <span>Inquire</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

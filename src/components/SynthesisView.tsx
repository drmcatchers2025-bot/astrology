/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * The Synthesized Love Reading View
 * Strictly broken down into Past, Present, Future without listing systems separately.
 */

import React, { useState } from 'react';
import { CombinedOracleContext } from '../lib/esotericEngines.ts';
import { Sparkles, History, Compass, ArrowRight, Share2, BookmarkCheck, Check, Clock, ShieldAlert, HeartHandshake } from 'lucide-react';

interface SynthesisData {
  headline: string;
  thematicBridge: string;
  past: string;
  present: string;
  future: string;
  remedyPreview?: string;
}

interface Props {
  context: CombinedOracleContext;
  synthesis: SynthesisData;
  source: string;
  onSaveToJournal: () => void;
  isSaved: boolean;
  onScrollToRemedies: () => void;
}

export const SynthesisView: React.FC<Props> = ({
  context,
  synthesis,
  source,
  onSaveToJournal,
  isSaved,
  onScrollToRemedies,
}) => {
  const [copied, setCopied] = useState(false);
  const { queryMeta, pennick, iching, astrology } = context;

  const handleCopy = () => {
    const textToCopy = `THE SYNCRETIC STAR & HEXAGRAM ORACLE
Daily Love & Relationship Reading for ${queryMeta.userName} & ${queryMeta.partnerName}
Date: ${queryMeta.castDate}
Focus: ${queryMeta.relationshipFocus}

${synthesis.headline}
"${synthesis.thematicBridge}"

═══════════════════════════════════════════════════════
I. PAST — The Root Energetic Cause & Background Transit
═══════════════════════════════════════════════════════
${synthesis.past}

═══════════════════════════════════════════════════════
II. PRESENT — The Active Daily Dynamic & Planetary Alignment
═══════════════════════════════════════════════════════
${synthesis.present}

═══════════════════════════════════════════════════════
III. FUTURE — The Immediate Trajectory (Unmanaged vs Conscious)
═══════════════════════════════════════════════════════
${synthesis.future}

Prescription Preview:
${synthesis.remedyPreview || 'Nigel Pennick earth allies and I Ching line guidance available.'}
`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative">
      {/* Golden halo container */}
      <div className="bg-[#0c0f1a]/95 border-2 border-amber-500/35 rounded-3xl p-6 sm:p-9 shadow-[0_0_50px_rgba(217,180,110,0.12)] relative overflow-hidden backdrop-blur-xl">
        {/* Subtle decorative header seal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-400 font-mono">
                Daily Synthesized Love Oracle
              </div>
              <div className="text-sm text-stone-300">
                Union of <strong className="text-amber-200">{queryMeta.userName}</strong> & <strong className="text-amber-200">{queryMeta.partnerName}</strong>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSaveToJournal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                isSaved
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:border-amber-500/40'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <History className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'In Journal' : 'Save Reading'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-stone-900/60 border border-stone-800 text-stone-300 hover:border-amber-500/40 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Reading'}</span>
            </button>
          </div>
        </div>

        {/* Oracle Headline & Thematic Bridge */}
        <div className="py-7 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] uppercase tracking-widest text-amber-300 font-mono mb-3">
            <Sparkles className="w-3 h-3" />
            Synthesized Across 5 Lineages
          </div>
          <h2 className="text-2xl sm:text-4xl font-title font-bold gold-gradient-text tracking-wide leading-tight">
            {synthesis.headline}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-300 italic font-serif leading-relaxed px-4">
            "{synthesis.thematicBridge}"
          </p>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-3 text-xs text-stone-400 font-mono">
            <span>Focus: <strong className="text-stone-200">{queryMeta.relationshipFocus}</strong></span>
            <span>•</span>
            <span>Cast on: <strong className="text-stone-200">{queryMeta.castDate}</strong></span>
            <span>•</span>
            <span className="text-amber-400/80">Rune: {pennick.activeRune.glyph} {pennick.activeRune.rune}</span>
            <span>•</span>
            <span className="text-emerald-400/80">Hexagram: #{iching.primaryHexagram.number} {iching.primaryHexagram.chinese}</span>
          </div>
        </div>

        {/* STRICT 3-PART SYNTHESIS CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
          {/* I. PAST */}
          <div className="relative bg-[#111422]/80 border border-stone-800 rounded-2xl p-6 transition-all hover:border-amber-500/30 group">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 font-mono mb-3">
              <span className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center text-amber-400 font-bold">I</span>
              <span>PAST</span>
            </div>
            <h3 className="text-lg font-title font-semibold text-stone-200 mb-2">
              The Root Energetic Cause
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed font-serif text-justify">
              {synthesis.past}
            </p>
            <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px] text-stone-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>Ancestral telluric currents & background transits</span>
            </div>
          </div>

          {/* II. PRESENT */}
          <div className="relative bg-[#141829]/95 border-2 border-amber-500/40 rounded-2xl p-6 shadow-[0_0_30px_rgba(245,158,11,0.12)] transition-all hover:border-amber-400 group">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-mono mb-3">
              <span className="w-6 h-6 rounded-full bg-amber-500/30 border border-amber-400/50 flex items-center justify-center text-amber-200 font-bold">II</span>
              <span>PRESENT</span>
              <span className="ml-auto text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300 font-semibold animate-pulse">ACTIVE</span>
            </div>
            <h3 className="text-lg font-title font-semibold text-amber-200 mb-2">
              The Active Daily Dynamic
            </h3>
            <p className="text-amber-50/90 text-sm leading-relaxed font-serif text-justify">
              {synthesis.present}
            </p>
            <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] text-amber-300/80 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Hexagram transformation & synastry transit today</span>
            </div>
          </div>

          {/* III. FUTURE */}
          <div className="relative bg-[#111422]/80 border border-stone-800 rounded-2xl p-6 transition-all hover:border-amber-500/30 group">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 font-mono mb-3">
              <span className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center text-amber-400 font-bold">III</span>
              <span>FUTURE</span>
            </div>
            <h3 className="text-lg font-title font-semibold text-stone-200 mb-2">
              Trajectory & Conscious Elevation
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed font-serif text-justify">
              {synthesis.future}
            </p>
            <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px] text-stone-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-stone-400" />
              <span>Inertia consequence vs. elevated outcome</span>
            </div>
          </div>
        </div>

        {/* Prescription Callout & Immediate Remedy Bridge */}
        <div className="mt-7 bg-gradient-to-r from-amber-950/30 via-[#131726] to-emerald-950/30 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 text-lg">
              🌿
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-300 font-mono">
                Interactive Remedy Loop Ready
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                {synthesis.remedyPreview || 'Specific Nigel Pennick earth magic, botanical allies, and I Ching line prescriptions await your inquiry.'}
              </p>
            </div>
          </div>

          <button
            onClick={onScrollToRemedies}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-title font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Consult The Apothecary & Remedies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

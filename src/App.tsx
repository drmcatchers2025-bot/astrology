/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * The Syncretic Star & Hexagram Oracle
 * Multi-system relationship and love oracle synthesizing Nigel Pennick's geomancy,
 * The I Ching, Modern Western Astrology, Chinese Zodiac, and Lunar Alchemy.
 */

import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground.tsx';
import { SynthesisView } from './components/SynthesisView.tsx';
import { InteractiveRemedyChat } from './components/InteractiveRemedyChat.tsx';
import { JournalModal, SavedJournalEntry } from './components/JournalModal.tsx';
import { CaptchaBox } from './components/CaptchaBox.tsx';
import {
  CombinedOracleContext,
  assembleOracleContext,
  generateLocalSyncreticSynthesis,
} from './lib/esotericEngines.ts';
import {
  calculatePreciseNatalChart,
  calculateExactSynastryAspects,
  PlanetaryPosition,
  ExactSynastryAspect,
} from './lib/ephemeris.ts';
import { playCrystalChime, playDeepGong } from './lib/sound.ts';
import {
  Sparkles,
  Calendar,
  Volume2,
  VolumeX,
  History,
  Info,
  ArrowRight,
  Dices,
} from 'lucide-react';

export default function App() {
  // Minimal, streamlined intake state
  const [userBirthdate, setUserBirthdate] = useState('1994-06-21');
  const [partnerBirthdate, setPartnerBirthdate] = useState('1992-11-08');
  const [userName, setUserName] = useState('You');
  const [partnerName, setPartnerName] = useState('Partner');
  const [relationshipFocus, setRelationshipFocus] = useState('Deepening Intimacy & Sacred Union');

  // App & Casting state
  const [isCasting, setIsCasting] = useState(false);
  const [castingStep, setCastingStep] = useState(0);
  const [activeReading, setActiveReading] = useState<{
    context: CombinedOracleContext;
    synthesis: {
      headline: string;
      thematicBridge: string;
      past: string;
      present: string;
      future: string;
      remedyPreview?: string;
    };
    source: string;
    chart1: Record<string, PlanetaryPosition>;
    chart2: Record<string, PlanetaryPosition>;
    exactAspects: ExactSynastryAspect[];
  } | null>(null);

  // UI features
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showJournal, setShowJournal] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [journalEntries, setJournalEntries] = useState<SavedJournalEntry[]>([]);
  const [isSavedInJournal, setIsSavedInJournal] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Load journal from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('oracle_journal_history');
      if (stored) {
        setJournalEntries(JSON.parse(stored));
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  const saveJournalToStorage = (entries: SavedJournalEntry[]) => {
    setJournalEntries(entries);
    try {
      localStorage.setItem('oracle_journal_history', JSON.stringify(entries));
    } catch (e) {
      // Ignore
    }
  };

  const handleSaveToJournal = () => {
    if (!activeReading || isSavedInJournal) return;

    const newEntry: SavedJournalEntry = {
      id: `entry-${Date.now()}`,
      date: activeReading.context.queryMeta.castDate,
      userName: activeReading.context.queryMeta.userName,
      partnerName: activeReading.context.queryMeta.partnerName,
      focus: activeReading.context.queryMeta.relationshipFocus,
      headline: activeReading.synthesis.headline,
      thematicBridge: activeReading.synthesis.thematicBridge,
      past: activeReading.synthesis.past,
      present: activeReading.synthesis.present,
      future: activeReading.synthesis.future,
      context: activeReading.context,
    };

    const updated = [newEntry, ...journalEntries];
    saveJournalToStorage(updated);
    setIsSavedInJournal(true);
    if (soundEnabled) playCrystalChime(741, 2.0);
  };

  // Date generation and archetypes for spontaneous random readings
  const generateRandomDate = (minYear = 1972, maxYear = 2004): string => {
    const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    const month = Math.floor(Math.random() * 12) + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    const mm = month < 10 ? `0${month}` : `${month}`;
    const dd = day < 10 ? `0${day}` : `${day}`;
    return `${year}-${mm}-${dd}`;
  };

  const RANDOM_ARCHETYPE_PROFILES = [
    { focus: 'Deepening Intimacy & Vulnerability', uN: 'Solar Seeker', pN: 'Lunar Mystic' },
    { focus: 'Navigating Karmic Friction & Elemental Clashes', uN: 'Fire Catalyst', pN: 'Water Anchor' },
    { focus: 'Future Commitment & Sacred Hearth', uN: 'Earth Builder', pN: 'Celestial Dreamer' },
    { focus: 'Soulmate Purpose & Creative Co-Creation', uN: 'Air Visionary', pN: 'Starlight Weaver' },
    { focus: 'Twin Flame Mirroring & Alchemical Union', uN: 'Solar Sovereign', pN: 'Lunar Beloved' },
    { focus: 'Transcending Past Patterns & Rebuilding Trust', uN: 'Wounded Healer', pN: 'Steadfast Guardian' },
    { focus: 'Spontaneous Chemistry & Playful Flirtation', uN: 'Zephyr Flame', pN: 'Ocean Tide' },
    { focus: 'Cosmic Fate & Telluric Earth Currents', uN: 'Forest Wanderer', pN: 'Mountain Sage' },
  ];

  // Core synthesis executor used by both Conquer Compatibility and Random Reading
  const executeSynthesis = async (
    b1: string,
    b2: string,
    uN: string,
    pN: string,
    focus: string,
    isAutoUpdate = false,
    bypassCaptcha = false
  ) => {
    if (!b1 || !b2) return;
    if (!isCaptchaVerified && !bypassCaptcha) {
      setHasAttemptedSubmit(true);
      return;
    }

    setIsCasting(true);
    setCastingStep(1);
    setIsSavedInJournal(false);
    if (soundEnabled && !isAutoUpdate) playDeepGong();

    // High-precision Keplerian ephemeris calculation
    const chart1 = calculatePreciseNatalChart(b1);
    const chart2 = calculatePreciseNatalChart(b2);
    const exactAspects = calculateExactSynastryAspects(chart1, chart2);

    try {
      const response = await fetch('/api/oracle/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userBirthdate: b1,
          partnerBirthdate: b2,
          userName: uN.trim() || 'You',
          partnerName: pN.trim() || 'Partner',
          relationshipFocus: focus,
        }),
      });

      if (!response.ok) {
        throw new Error('Server synthesis error');
      }

      const data = await response.json();
      setActiveReading({
        ...data,
        chart1,
        chart2,
        exactAspects,
      });
      if (soundEnabled && !isAutoUpdate) playCrystalChime(528, 4.0);
    } catch (err) {
      console.warn('API error, falling back to local deterministic synthesis engine:', err);
      const context = assembleOracleContext(
        b1,
        b2,
        uN.trim() || 'You',
        pN.trim() || 'Partner',
        focus
      );
      const localSynth = generateLocalSyncreticSynthesis(context);
      setActiveReading({
        context,
        synthesis: localSynth,
        source: 'local-engine',
        chart1,
        chart2,
        exactAspects,
      });
      if (soundEnabled && !isAutoUpdate) playCrystalChime(528, 4.0);
    } finally {
      setIsCasting(false);
      setCastingStep(0);
      if (!isAutoUpdate) {
        window.scrollTo({ top: 380, behavior: 'smooth' });
      }
    }
  };

  // The Primary Trigger: "Conquer Compatibility"
  const handleConquerCompatibility = async (isAutoUpdate = false, bypassCaptcha = false) => {
    await executeSynthesis(
      userBirthdate,
      partnerBirthdate,
      userName,
      partnerName,
      relationshipFocus,
      isAutoUpdate,
      bypassCaptcha
    );
  };

  // The Spontaneous Trigger: "Random Reading"
  const handleRandomReading = () => {
    const d1 = generateRandomDate();
    let d2 = generateRandomDate();
    while (d2 === d1) {
      d2 = generateRandomDate();
    }
    const profile = RANDOM_ARCHETYPE_PROFILES[Math.floor(Math.random() * RANDOM_ARCHETYPE_PROFILES.length)];

    setUserBirthdate(d1);
    setPartnerBirthdate(d2);
    setUserName(profile.uN);
    setPartnerName(profile.pN);
    setRelationshipFocus(profile.focus);
    setIsCaptchaVerified(true);
    setHasAttemptedSubmit(false);

    if (soundEnabled) playCrystalChime(639, 2.0);

    // Cast immediately with bypassCaptcha = true
    executeSynthesis(d1, d2, profile.uN, profile.pN, profile.focus, false, true);
  };

  // Cast initial reading on app load so user instantly experiences a live reading
  useEffect(() => {
    handleRandomReading();
  }, []);

  // Automatically update reading whenever either birthdate is changed
  useEffect(() => {
    if (!isCaptchaVerified) return;
    if (!userBirthdate || !partnerBirthdate) return;
    if (userBirthdate.length < 10 || partnerBirthdate.length < 10) return;

    const timer = setTimeout(() => {
      handleConquerCompatibility(true);
    }, 450);

    return () => clearTimeout(timer);
  }, [userBirthdate, partnerBirthdate]);

  return (
    <div className="min-h-screen bg-[#07080d] text-[#ded7c6] relative selection:bg-amber-500/30 font-serif">
      <CosmicBackground />

      {/* Navigation & Header */}
      <header className="relative z-10 border-b border-amber-500/20 bg-[#090b12]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-amber-400/40 bg-gradient-to-tr from-amber-600/30 to-purple-600/30 flex items-center justify-center text-amber-300 font-serif text-lg shadow-[0_0_15px_rgba(234,179,8,0.25)]">
              ✦
            </div>
            <div>
              <h1 className="font-title text-base sm:text-lg font-bold tracking-wide gold-gradient-text">
                The Syncretic Star & Hexagram Oracle
              </h1>
              <p className="text-[11px] text-stone-400 font-sans tracking-wide">
                Nigel Pennick Geomancy • The I Ching • Western Synastry • Chinese Zodiac • Lunar Alchemy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomReading}
              disabled={isCasting}
              className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 hover:text-amber-200 hover:border-amber-500/40 transition-all text-xs flex items-center gap-1.5 font-mono cursor-pointer shadow-[0_0_12px_rgba(168,85,247,0.2)]"
              title="Cast a spontaneous random reading"
            >
              <Dices className="w-4 h-4 text-purple-300" />
              <span className="hidden sm:inline">Random Reading</span>
            </button>

            <button
              onClick={() => setShowGuide(true)}
              className="p-2 rounded-xl bg-stone-900/60 border border-stone-800 text-stone-400 hover:text-amber-200 hover:border-amber-500/40 transition-all text-xs flex items-center gap-1.5 font-mono"
              title="About the 5 Esoteric Systems"
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">The 5 Lineages</span>
            </button>

            <button
              onClick={() => setShowJournal(true)}
              className="p-2 rounded-xl bg-stone-900/60 border border-stone-800 text-stone-400 hover:text-amber-200 hover:border-amber-500/40 transition-all text-xs flex items-center gap-1.5 font-mono"
              title="Open Transit Archive Journal"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Journal ({journalEntries.length})</span>
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-stone-900/60 border border-stone-800 text-stone-400 hover:text-amber-200 hover:border-amber-500/40 transition-all"
              title={soundEnabled ? 'Mute Chimes' : 'Enable 528Hz Chimes'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Intro banner */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Precision Keplerian Ephemeris & 5-System Oracle</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-title font-extrabold gold-gradient-text tracking-wide leading-tight">
            The Oracle of Sacred Union
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-serif italic max-w-xl mx-auto">
            Input two solar returns to instantly weave Nigel Pennick’s earth mysteries, the King Wen I Ching, exact planetary synastry, and Chinese branches into a unified Past-Present-Future synthesis.
          </p>
        </div>

        {/* STREAMLINED INTAKE PORTAL */}
        <div className="bg-[#0b0e17]/95 border-2 border-amber-500/35 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-stone-800 mb-6 gap-3">
            <div className="text-center sm:text-left">
              <h3 className="font-title text-lg sm:text-xl font-bold text-amber-200">
                The Solar Inception Gates
              </h3>
              <p className="text-xs text-stone-400 mt-1 font-mono">
                Enter both solar returns or cast a spontaneous cosmic pairing.
              </p>
            </div>
            <button
              onClick={handleRandomReading}
              disabled={isCasting}
              className="px-3.5 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 hover:border-amber-400 text-purple-200 hover:text-amber-200 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.2)]"
              title="Randomize birthdates and generate reading"
            >
              <Dices className="w-3.5 h-3.5 text-purple-300" />
              <span>Randomize Dates</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Input 1: Your Birthdate */}
            <div className="bg-[#101422]/90 border border-amber-500/30 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-amber-400 uppercase tracking-wider">
                <span>Input 1: Your Birthdate</span>
                <span className="text-amber-300 font-serif text-sm">☉ Sun</span>
              </div>

              <div>
                <input
                  type="date"
                  value={userBirthdate}
                  onChange={(e) => setUserBirthdate(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700/80 focus:border-amber-400 rounded-xl px-4 py-3 text-base text-stone-100 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Input 2: Partner's Birthdate */}
            <div className="bg-[#101422]/90 border border-purple-500/30 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-purple-400 uppercase tracking-wider">
                <span>Input 2: Partner's Birthdate</span>
                <span className="text-purple-300 font-serif text-sm">☽ Moon</span>
              </div>

              <div>
                <input
                  type="date"
                  value={partnerBirthdate}
                  onChange={(e) => setPartnerBirthdate(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700/80 focus:border-purple-400 rounded-xl px-4 py-3 text-base text-stone-100 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* CAPTCHA Verification Box */}
          <div className="mt-7">
            <CaptchaBox
              isVerified={isCaptchaVerified}
              onVerify={(verified) => {
                setIsCaptchaVerified(verified);
                if (verified) {
                  if (soundEnabled) playCrystalChime(639, 1.5);
                  // Automatically trigger calculation upon check
                  if (userBirthdate && partnerBirthdate) {
                    handleConquerCompatibility(false, true);
                  }
                }
              }}
              hasAttemptedSubmit={hasAttemptedSubmit}
            />
          </div>

          {/* THE DUAL TRIGGERS: "Conquer Compatibility" and "✦ Random Reading" */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => handleConquerCompatibility(false)}
              disabled={isCasting || !userBirthdate || !partnerBirthdate}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-title font-extrabold text-sm sm:text-base tracking-widest flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(245,158,11,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-stone-950" />
              <span>{isCasting ? 'Synthesizing 5 Lineages...' : 'Conquer Compatibility'}</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </button>

            <button
              onClick={handleRandomReading}
              disabled={isCasting}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-950/80 via-stone-900 to-amber-950/80 border-2 border-purple-400/50 hover:border-amber-400/70 text-purple-100 hover:text-amber-200 font-title font-bold text-sm sm:text-base tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              title="Generate a completely spontaneous random reading with randomized birthdates"
            >
              <Dices className="w-5 h-5 text-purple-300" />
              <span>✦ Random Reading</span>
            </button>
          </div>
          <p className="text-[11px] text-stone-400 font-mono mt-3 text-center">
            Live updates active • Reading automatically updates when either birthdate is changed
          </p>
        </div>

        {/* CASTING PROGRESS ANIMATION */}
        {isCasting && (
          <div className="bg-[#0e111d]/90 border border-amber-500/30 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-pulse">
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400 animate-spin-medium" />
              <div className="absolute inset-2 rounded-full border border-purple-500/40 animate-reverse-spin" />
              <div className="text-4xl text-amber-300">✦</div>
            </div>

            <div className="space-y-2">
              <h4 className="font-title text-xl font-bold text-amber-200">
                Synthesizing The Sacred Confluence...
              </h4>
              <p className="text-sm text-stone-400 font-mono">
                {castingStep === 1 && '1/4 Computing Keplerian planetary longitudes & synastry orbs...'}
                {castingStep === 2 && '2/4 Casting King Wen hexagram yarrow stalks & line transformations...'}
                {castingStep === 3 && '3/4 Aligning Nigel Pennick’s telluric current & Chinese Shengxiao trines...'}
                {castingStep >= 4 && '4/4 Weaving all 5 traditions into unified Past-Present-Future synthesis...'}
              </p>
            </div>
          </div>
        )}

        {/* THE SYNTHESIZED LOVE READING & INTERACTIVE APOTHECARY */}
        {activeReading && !isCasting && (
          <div className="space-y-8 animate-fade-in">
            {/* 1. Strict Past-Present-Future Synthesis */}
            <SynthesisView
              context={activeReading.context}
              synthesis={activeReading.synthesis}
              source={activeReading.source}
              onSaveToJournal={handleSaveToJournal}
              isSaved={isSavedInJournal}
              onScrollToRemedies={() => {
                document.getElementById('remedies-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onRandomReading={handleRandomReading}
            />

            {/* 2. The Interactive Remedy & Apothecary Loop */}
            <InteractiveRemedyChat
              context={activeReading.context}
              soundEnabled={soundEnabled}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-stone-800/80 mt-20 py-8 text-center text-xs text-stone-500 font-mono">
        <p>The Syncretic Star & Hexagram Oracle • Precision Keplerian Synastry & Multi-System Alchemical Union</p>
        <p className="mt-1 text-[11px] text-stone-600">
          Grounded in the works of Nigel Pennick, the Wilhelm/Baynes I Ching, Hellenistic/Modern Synastry, and Chinese Shengxiao.
        </p>
      </footer>

      {/* Journal Modal */}
      <JournalModal
        isOpen={showJournal}
        onClose={() => setShowJournal(false)}
        entries={journalEntries}
        onLoadEntry={(entry) => {
          const chart1 = calculatePreciseNatalChart(entry.context.queryMeta.userBirthdate);
          const chart2 = calculatePreciseNatalChart(entry.context.queryMeta.partnerBirthdate);
          const exactAspects = calculateExactSynastryAspects(chart1, chart2);

          setActiveReading({
            context: entry.context,
            synthesis: {
              headline: entry.headline,
              thematicBridge: entry.thematicBridge,
              past: entry.past,
              present: entry.present,
              future: entry.future,
            },
            source: 'journal-archive',
            chart1,
            chart2,
            exactAspects,
          });
          setIsSavedInJournal(true);
        }}
        onDeleteEntry={(id) => {
          const updated = journalEntries.filter((e) => e.id !== id);
          saveJournalToStorage(updated);
        }}
        onClearAll={() => {
          saveJournalToStorage([]);
        }}
      />

      {/* 5 Lineages Explanatory Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0c0f1a] border border-amber-500/30 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-stone-800 flex items-center justify-between">
              <h3 className="font-title font-bold text-lg text-amber-200">
                How The 5 Esoteric Lineages Synthesize
              </h3>
              <button
                onClick={() => setShowGuide(false)}
                className="text-stone-400 hover:text-stone-200 text-sm font-mono px-2 py-1 cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-sm text-stone-300 font-serif leading-relaxed">
              <div className="border-b border-stone-800 pb-3">
                <h4 className="font-title font-bold text-amber-300">1. Nigel Pennick’s Geomancy & Runic Tradition</h4>
                <p className="text-xs text-stone-400 mt-1">
                  Rooted in traditional European earth mysteries and the 16 geomantic tetragrams. Pennick maps directional telluric lines (North/Earth, East/Air, South/Fire, West/Water) and runic star-craft stations into physical remedies, herbal allies, and boundary talismans.
                </p>
              </div>

              <div className="border-b border-stone-800 pb-3">
                <h4 className="font-title font-bold text-emerald-300">2. The I Ching (Book of Changes)</h4>
                <p className="text-xs text-stone-400 mt-1">
                  The ancient King Wen oracle casts primary hexagrams with changing lines that mutate into resulting hexagrams. It identifies the psychological posture, yielding versus initiating dynamics, and timing of relational dialogue.
                </p>
              </div>

              <div className="border-b border-stone-800 pb-3">
                <h4 className="font-title font-bold text-purple-300">3. Modern Western Astrology</h4>
                <p className="text-xs text-stone-400 mt-1">
                  Calculates Sun, Moon, Venus, and Mars synastric geometry down to the arc-minute, highlights the active partnership house (5th Romance, 7th Sacred Union, 8th Soul Merging, 4th Hearth), and tracks daily cosmic transits affecting relationship patience.
                </p>
              </div>

              <div className="border-b border-stone-800 pb-3">
                <h4 className="font-title font-bold text-orange-300">4. Chinese Shengxiao & Wu Xing</h4>
                <p className="text-xs text-stone-400 mt-1">
                  Evaluates Earthly Branches, Heavenly Stem elements, San He (Three Harmonies Trines), Liu He (Six Secret Allies), and Liu Chong (Oppositional Clashes) alongside the Sheng (generating) and Ke (controlling) five-element cycles.
                </p>
              </div>

              <div>
                <h4 className="font-title font-bold text-cyan-300">5. Lunar Alchemy & Elemental Scale</h4>
                <p className="text-xs text-stone-400 mt-1">
                  Measures the current lunar illumination, planetary day ruler, and the synastric percentage balance of Fire, Earth, Air, Water, and Aether to diagnose the exact element calling for rebalancing.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

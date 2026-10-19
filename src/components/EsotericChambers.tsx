/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * The 5 Esoteric Engine Chambers
 * Visualizing Pennick Geomancy & Runes, I Ching, Western Synastry, Chinese Zodiac, and Lunar Alchemy
 */

import React, { useState } from 'react';
import { CombinedOracleContext, GeomanticFigure } from '../lib/esotericEngines.ts';
import { Compass, Sparkles, Flame, Droplet, Wind, Mountain, Moon, Sun, Shield, Eye, BookOpen, Layers } from 'lucide-react';

interface Props {
  context: CombinedOracleContext;
}

export const EsotericChambers: React.FC<Props> = ({ context }) => {
  const [activeTab, setActiveTab] = useState<'pennick' | 'iching' | 'astrology' | 'chinese' | 'lunar'>('pennick');

  const { pennick, iching, astrology, chinese, lunarElemental, queryMeta } = context;

  // Helper to render Geomantic dots
  const renderGeomanticFigure = (fig: GeomanticFigure, label: string) => {
    return (
      <div className="flex flex-col items-center bg-[#111420]/70 border border-amber-500/20 rounded-xl p-4 min-w-[130px] transition-all hover:border-amber-400/40">
        <span className="text-xs uppercase tracking-widest text-amber-400/70 mb-1">{label}</span>
        <span className="font-title text-base font-semibold text-amber-200">{fig.name}</span>
        <span className="text-xs italic text-stone-400 mb-3">{fig.latinName}</span>

        {/* 4 Lines of dots */}
        <div className="flex flex-col items-center gap-1.5 my-2 py-2 px-3 bg-black/40 rounded-lg border border-amber-900/40">
          {fig.dots.map((count, lineIdx) => (
            <div key={lineIdx} className="flex items-center gap-3 h-4">
              {count === 1 ? (
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              ) : (
                <div className="flex gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-2 text-[11px] text-stone-400 text-center leading-tight">
          <p className="text-amber-300/80">{fig.planet}</p>
          <p>{fig.element} • {fig.direction}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0b0e17]/90 border border-amber-500/20 rounded-2xl p-5 md:p-7 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Subtle corner glyph accents */}
      <div className="absolute top-3 left-4 text-xs tracking-widest text-amber-500/30 uppercase font-mono">
        Esoteric Engine Chambers
      </div>
      <div className="absolute top-3 right-4 text-xs font-mono text-stone-500">
        Live Calculations
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 pt-6 pb-5 border-b border-stone-800/80">
        <button
          onClick={() => setActiveTab('pennick')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm transition-all font-title ${
            activeTab === 'pennick'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-[0_0_15px_rgba(234,179,8,0.15)]'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
          }`}
        >
          <Compass className="w-4 h-4 text-amber-400" />
          <span>1. Pennick Geomancy & Runes</span>
        </button>

        <button
          onClick={() => setActiveTab('iching')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm transition-all font-title ${
            activeTab === 'iching'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-[0_0_15px_rgba(234,179,8,0.15)]'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>2. The I Ching</span>
        </button>

        <button
          onClick={() => setActiveTab('astrology')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm transition-all font-title ${
            activeTab === 'astrology'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-[0_0_15px_rgba(234,179,8,0.15)]'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>3. Modern Synastry</span>
        </button>

        <button
          onClick={() => setActiveTab('chinese')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm transition-all font-title ${
            activeTab === 'chinese'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-[0_0_15px_rgba(234,179,8,0.15)]'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
          }`}
        >
          <Flame className="w-4 h-4 text-orange-400" />
          <span>4. Chinese Shengxiao</span>
        </button>

        <button
          onClick={() => setActiveTab('lunar')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm transition-all font-title ${
            activeTab === 'lunar'
              ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-[0_0_15px_rgba(234,179,8,0.15)]'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
          }`}
        >
          <Moon className="w-4 h-4 text-cyan-400" />
          <span>5. Lunar & Elements</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-6">
        {/* 1. PENNICK GEOMANCY & RUNES */}
        {activeTab === 'pennick' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
              <div>
                <h3 className="text-xl font-title font-semibold text-amber-300">
                  Nigel Pennick’s Geomantic Shield & Runic Starcraft
                </h3>
                <p className="text-stone-400 text-sm mt-1 max-w-2xl leading-relaxed">
                  Based on Nigel Pennick’s research into European earth mysteries, directional telluric currents, and Anglo-Saxon starcraft, the geomantic shield reveals the hidden structure of relationship forces.
                </p>
              </div>

              {/* Active Rune Card */}
              <div className="flex items-center gap-4 bg-[#141828]/90 border border-amber-500/30 rounded-xl p-4 min-w-[240px] shadow-lg">
                <div className="w-14 h-14 rounded-full bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-3xl text-amber-300 font-serif shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                  {pennick.activeRune.glyph}
                </div>
                <div>
                  <div className="text-xs uppercase text-amber-400/80 tracking-wider">Active Star-Craft Rune</div>
                  <div className="text-lg font-title font-bold text-amber-200">{pennick.activeRune.rune}</div>
                  <div className="text-xs text-stone-300">{pennick.activeRune.meaning}</div>
                </div>
              </div>
            </div>

            {/* Geomantic Shield Trio */}
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-400/80 mb-3 font-mono">
                The Geomantic Triad (Right Witness • Left Witness • The Judge)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {renderGeomanticFigure(pennick.primaryFigure, 'Right Witness (Present Action)')}
                {renderGeomanticFigure(pennick.secondaryFigure, 'Left Witness (Subconscious Drive)')}
                {renderGeomanticFigure(pennick.judgeFigure, 'The Judge (Energetic Resolution)')}
              </div>
            </div>

            {/* Earth Current & Herbal Resonance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#121622]/60 border border-stone-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider mb-1.5">
                  <Compass className="w-4 h-4" /> Telluric Earth Current & Tide
                </div>
                <p className="text-stone-200 text-sm leading-relaxed">{pennick.earthPower}</p>
                <div className="mt-2 text-xs text-stone-400">
                  <span className="text-amber-300">Vector:</span> {pennick.directionalTide}
                </div>
              </div>

              <div className="bg-[#121622]/60 border border-stone-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-1.5">
                  <Shield className="w-4 h-4" /> Pennick Herbal & Tree Allies
                </div>
                <p className="text-stone-200 text-sm leading-relaxed">{pennick.herbalResonance}</p>
                <div className="mt-2 text-xs text-stone-400">
                  Prescribed for directional smoke, sachets, or bedside balancing.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. THE I CHING */}
        {activeTab === 'iching' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
              <div>
                <h3 className="text-xl font-title font-semibold text-emerald-300 flex items-center gap-2">
                  <span>The I Ching (Book of Changes)</span>
                  <span className="text-2xl font-serif text-amber-300">{iching.primaryHexagram.chinese}</span>
                </h3>
                <p className="text-stone-400 text-sm mt-1 max-w-2xl leading-relaxed">
                  Hexagram #{iching.primaryHexagram.number} <strong className="text-amber-200">{iching.primaryHexagram.name}</strong> ({iching.primaryHexagram.pinyin}).
                  Upper: {iching.primaryHexagram.upperTrigram} • Lower: {iching.primaryHexagram.lowerTrigram}.
                </p>
              </div>

              {iching.transformedHexagram && (
                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3 px-5 text-right">
                  <div className="text-xs uppercase tracking-wider text-emerald-400">Transformed Result</div>
                  <div className="text-base font-title font-bold text-emerald-200">
                    #{iching.transformedHexagram.number} {iching.transformedHexagram.name} ({iching.transformedHexagram.chinese})
                  </div>
                  <div className="text-xs text-stone-400">Governed by changing line {iching.changingLinePositions.join(', ')}</div>
                </div>
              )}
            </div>

            {/* Visual 6-Line Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="bg-[#0e121d] border border-stone-800 rounded-xl p-5 flex flex-col gap-2.5">
                <div className="text-xs font-mono uppercase text-stone-400 mb-1 flex justify-between">
                  <span>Cast Lines (Top to Bottom)</span>
                  <span className="text-amber-400">6 Lines (Yarrow Stalk Method)</span>
                </div>

                {/* Render lines in reverse (line 6 at top, line 1 at bottom) */}
                {[...iching.lines].reverse().map((line) => {
                  const isYang = line.type.includes('yang');
                  return (
                    <div
                      key={line.position}
                      className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${
                        line.isChanging
                          ? 'bg-amber-500/15 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                          : 'bg-black/30 border-stone-800/80'
                      }`}
                    >
                      <span className="text-xs font-mono text-stone-400 w-6">L{line.position}</span>

                      {/* Visual Line */}
                      <div className="flex-1 flex gap-2 h-3.5 items-center">
                        {isYang ? (
                          // Solid Yang Line
                          <div
                            className={`w-full h-2.5 rounded-sm ${
                              line.isChanging ? 'bg-amber-400' : 'bg-stone-300'
                            }`}
                          />
                        ) : (
                          // Broken Yin Line
                          <div className="w-full flex gap-2">
                            <div
                              className={`flex-1 h-2.5 rounded-sm ${
                                line.isChanging ? 'bg-amber-400' : 'bg-stone-300'
                              }`}
                            />
                            <div
                              className={`flex-1 h-2.5 rounded-sm ${
                                line.isChanging ? 'bg-amber-400' : 'bg-stone-300'
                              }`}
                            />
                          </div>
                        )}
                      </div>

                      {/* Value and indicator */}
                      <div className="text-xs font-mono w-24 text-right">
                        {line.isChanging ? (
                          <span className="text-amber-300 font-bold flex items-center justify-end gap-1">
                            <Sparkles className="w-3 h-3" /> Changing ({line.value})
                          </span>
                        ) : (
                          <span className="text-stone-500">{line.type} ({line.value})</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Judgment and relational dynamic */}
              <div className="space-y-4">
                <div className="bg-[#121622]/70 border border-stone-800 rounded-xl p-4">
                  <div className="text-xs uppercase tracking-wider text-amber-400 font-mono mb-1">
                    The Judgment
                  </div>
                  <p className="text-stone-200 text-sm leading-relaxed italic">
                    "{iching.primaryHexagram.judgment}"
                  </p>
                </div>

                <div className="bg-[#121622]/70 border border-stone-800 rounded-xl p-4">
                  <div className="text-xs uppercase tracking-wider text-emerald-400 font-mono mb-1">
                    Relational Dynamic & Transformative Counsel
                  </div>
                  <p className="text-stone-200 text-sm leading-relaxed">
                    {iching.transformativeGuidance}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. MODERN WESTERN ASTROLOGY */}
        {activeTab === 'astrology' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-title font-semibold text-purple-300">
                Modern Western Synastry & Partnership Angles
              </h3>
              <p className="text-stone-400 text-sm mt-1 max-w-2xl leading-relaxed">
                Examining the energetic geometry between the two souls, their luminary harmony, Venusian romantic language, and active transit houses.
              </p>
            </div>

            {/* Natal Placements Comparison Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User Chart */}
              <div className="bg-[#121622]/80 border border-purple-500/20 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-purple-400 font-mono mb-3">
                  {queryMeta.userName}’s Placements ({queryMeta.userBirthdate})
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-stone-800">
                    <span className="text-stone-400 flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-amber-400" /> Sun</span>
                    <span className="font-semibold text-stone-200">{astrology.userSun.symbol} {astrology.userSun.sign} ({astrology.userSun.element})</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-stone-800">
                    <span className="text-stone-400 flex items-center gap-1.5"><Moon className="w-3.5 h-3.5 text-cyan-400" /> Moon</span>
                    <span className="font-semibold text-stone-200">{astrology.userMoon.symbol} {astrology.userMoon.sign} ({astrology.userMoon.element})</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-stone-800">
                    <span className="text-stone-400 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-pink-400" /> Venus</span>
                    <span className="font-semibold text-stone-200">{astrology.userVenus.sign}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-stone-400 flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-red-400" /> Mars</span>
                    <span className="font-semibold text-stone-200">{astrology.userMars.sign}</span>
                  </div>
                </div>
              </div>

              {/* Partner Chart */}
              <div className="bg-[#121622]/80 border border-purple-500/20 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-purple-400 font-mono mb-3">
                  {queryMeta.partnerName}’s Placements ({queryMeta.partnerBirthdate})
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-stone-800">
                    <span className="text-stone-400 flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-amber-400" /> Sun</span>
                    <span className="font-semibold text-stone-200">{astrology.partnerSun.symbol} {astrology.partnerSun.sign} ({astrology.partnerSun.element})</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-stone-800">
                    <span className="text-stone-400 flex items-center gap-1.5"><Moon className="w-3.5 h-3.5 text-cyan-400" /> Moon</span>
                    <span className="font-semibold text-stone-200">{astrology.partnerMoon.symbol} {astrology.partnerMoon.sign} ({astrology.partnerMoon.element})</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-stone-800">
                    <span className="text-stone-400 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-pink-400" /> Venus</span>
                    <span className="font-semibold text-stone-200">{astrology.partnerVenus.sign}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-stone-400 flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-red-400" /> Mars</span>
                    <span className="font-semibold text-stone-200">{astrology.partnerMars.sign}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Partnership House & Transits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-purple-400 font-mono mb-1">
                  Active Partnership House
                </div>
                <div className="text-base font-title font-bold text-purple-200">
                  {astrology.activePartnershipHouse.house}: {astrology.activePartnershipHouse.name}
                </div>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  {astrology.activePartnershipHouse.focus}
                </p>
              </div>

              <div className="bg-[#121622]/60 border border-stone-800 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-amber-400 font-mono mb-1">
                  Daily Cosmic Transit Highlight
                </div>
                <p className="text-sm text-stone-200 leading-relaxed">
                  {astrology.dailyTransitHighlight}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. CHINESE ZODIAC */}
        {activeTab === 'chinese' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-title font-semibold text-orange-300">
                Chinese Shengxiao & Wu Xing Elemental Interplay
              </h3>
              <p className="text-stone-400 text-sm mt-1 max-w-2xl leading-relaxed">
                Earthly Branches, Heavenly Stems, San He trines, and the ancient Sheng (generating) and Ke (overcoming) cycles governing mutual romantic destiny.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#121622]/80 border border-orange-500/20 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-orange-400 font-mono mb-2">
                  {queryMeta.userName}’s Branch & Stem
                </div>
                <div className="text-2xl font-title font-bold text-orange-200">
                  {chinese.userAnimal}
                </div>
                <div className="text-sm text-stone-300 mt-1">
                  {chinese.userElement} ({chinese.userYinYang}) • Branch: {chinese.userBranch}
                </div>
              </div>

              <div className="bg-[#121622]/80 border border-orange-500/20 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-orange-400 font-mono mb-2">
                  {queryMeta.partnerName}’s Branch & Stem
                </div>
                <div className="text-2xl font-title font-bold text-orange-200">
                  {chinese.partnerAnimal}
                </div>
                <div className="text-sm text-stone-300 mt-1">
                  {chinese.partnerElement} ({chinese.partnerYinYang}) • Branch: {chinese.partnerBranch}
                </div>
              </div>
            </div>

            {/* Compatibility dynamic */}
            <div className="bg-[#151928] border border-orange-500/30 rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-orange-400 mb-1.5">
                <Sparkles className="w-4 h-4 text-orange-400" />
                Relational Alliance Type
              </div>
              <div className="text-lg font-title font-bold text-amber-200">
                {chinese.relationshipType}
              </div>
              <p className="text-stone-200 text-sm mt-2 leading-relaxed">
                {chinese.compatibilitySummary}
              </p>

              <div className="mt-4 pt-3 border-t border-stone-800 text-xs text-stone-400">
                <span className="text-orange-300 font-semibold">Wu Xing Cycle:</span> {chinese.elementalCycle.description}
              </div>
            </div>
          </div>
        )}

        {/* 5. LUNAR & ELEMENTAL LAYER */}
        {activeTab === 'lunar' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-title font-semibold text-cyan-300">
                Lunar Alchemy & Synastric Elemental Scale
              </h3>
              <p className="text-stone-400 text-sm mt-1 max-w-2xl leading-relaxed">
                The current energetic tide of the Moon combined with the elemental constitution of the partnership.
              </p>
            </div>

            {/* Moon Phase Banner */}
            <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-5">
              <div className="w-20 h-20 rounded-full border border-cyan-400/40 bg-gradient-to-tr from-cyan-900/40 to-cyan-500/20 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                🌙
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xs uppercase tracking-wider text-cyan-400 font-mono">Current Lunar Tide</div>
                <div className="text-xl font-title font-bold text-cyan-100">
                  {lunarElemental.moonPhase} ({lunarElemental.illumination}% Illumination)
                </div>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  {lunarElemental.lunarTone}
                </p>
                <div className="text-[11px] text-cyan-300/80 mt-1 font-mono">
                  Mansion: {lunarElemental.lunarMansion}
                </div>
              </div>
            </div>

            {/* Elemental Breakdown Progress Bars */}
            <div className="bg-[#121622]/80 border border-stone-800 rounded-xl p-5">
              <div className="text-xs uppercase tracking-wider text-stone-400 font-mono mb-4">
                Synastric Elemental Equilibrium
              </div>

              <div className="space-y-3">
                {/* Fire */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-red-400 flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> Fire (Passion & Will)</span>
                    <span className="font-mono text-stone-300">{lunarElemental.elementalBreakdown.fire}%</span>
                  </div>
                  <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: `${lunarElemental.elementalBreakdown.fire}%` }} />
                  </div>
                </div>

                {/* Earth */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-amber-400 flex items-center gap-1"><Mountain className="w-3.5 h-3.5" /> Earth (Stability & Trust)</span>
                    <span className="font-mono text-stone-300">{lunarElemental.elementalBreakdown.earth}%</span>
                  </div>
                  <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full rounded-full" style={{ width: `${lunarElemental.elementalBreakdown.earth}%` }} />
                  </div>
                </div>

                {/* Air */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-sky-400 flex items-center gap-1"><Wind className="w-3.5 h-3.5" /> Air (Dialogue & Clarity)</span>
                    <span className="font-mono text-stone-300">{lunarElemental.elementalBreakdown.air}%</span>
                  </div>
                  <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: `${lunarElemental.elementalBreakdown.air}%` }} />
                  </div>
                </div>

                {/* Water */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-blue-400 flex items-center gap-1"><Droplet className="w-3.5 h-3.5" /> Water (Intimacy & Empathy)</span>
                    <span className="font-mono text-stone-300">{lunarElemental.elementalBreakdown.water}%</span>
                  </div>
                  <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${lunarElemental.elementalBreakdown.water}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800 flex justify-between text-xs text-stone-400">
                <div>Dominant Force: <span className="text-amber-300 font-semibold">{lunarElemental.dominantElement}</span></div>
                <div>Element Calling for Balance: <span className="text-cyan-300 font-semibold">{lunarElemental.elementalDeficit}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

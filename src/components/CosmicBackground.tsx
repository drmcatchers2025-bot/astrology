/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const CosmicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep atmospheric gradients */}
      <div className="absolute inset-0 bg-[#07080d]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-950/25 via-purple-950/15 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-950/10 blur-3xl" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-emerald-950/10 blur-3xl" />

      {/* Sacred geometry rotating compass / runic circle */}
      <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[850px] h-[850px] opacity-15 animate-spin-slow">
        <svg viewBox="0 0 800 800" className="w-full h-full stroke-amber-400 fill-none" strokeWidth="0.75">
          <circle cx="400" cy="400" r="380" strokeDasharray="4 8" />
          <circle cx="400" cy="400" r="350" />
          <circle cx="400" cy="400" r="280" strokeDasharray="2 6" />
          <circle cx="400" cy="400" r="210" />
          <circle cx="400" cy="400" r="140" strokeDasharray="6 6" />
          {/* Hexagram and 12-pointed star lines */}
          <polygon points="400,20 729,590 71,590" opacity="0.6" />
          <polygon points="400,780 71,210 729,210" opacity="0.6" />
          <polygon points="400,90 668,610 132,610" opacity="0.4" />
          <polygon points="400,710 132,190 668,190" opacity="0.4" />
        </svg>
      </div>

      {/* Subtle subtle stars grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #fef08a 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};

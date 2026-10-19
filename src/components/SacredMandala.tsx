/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Live Sacred Geometry Mandala Visualizer
 * Procedurally draws the celestial mandala of the two birthdates as a living,
 * evocative work of sacred art—keeping raw technical coordinates completely behind the scenes.
 */

import React, { useRef, useEffect } from 'react';
import { PlanetaryPosition, ExactSynastryAspect } from '../lib/ephemeris.ts';
import { Sparkles } from 'lucide-react';

interface Props {
  chart1: Record<string, PlanetaryPosition>;
  chart2: Record<string, PlanetaryPosition>;
  aspects: ExactSynastryAspect[];
  user1Name: string;
  user2Name: string;
  hexagramPattern: string; // 6 digits, e.g. "101010"
  geomanticDots: [number, number, number, number];
}

export const SacredMandala: React.FC<Props> = ({
  chart1,
  chart2,
  aspects,
  user1Name,
  user2Name,
  hexagramPattern,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotationAngle = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(centerX, centerY) - 25;

      ctx.clearRect(0, 0, width, height);

      // Deep atmospheric nebula background
      const radialGradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
      radialGradient.addColorStop(0, 'rgba(45, 27, 80, 0.45)');
      radialGradient.addColorStop(0.5, 'rgba(18, 16, 36, 0.3)');
      radialGradient.addColorStop(1, 'rgba(8, 10, 16, 0)');
      ctx.fillStyle = radialGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer Rotating Celestial Halo
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((rotationAngle * Math.PI) / 180);

      // Outer concentric circles
      ctx.strokeStyle = 'rgba(217, 180, 110, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(217, 180, 110, 0.15)';
      ctx.beginPath();
      ctx.arc(0, 0, radius - 18, 0, Math.PI * 2);
      ctx.stroke();

      // 12 Sacred Zodiac Rays
      for (let i = 0; i < 12; i++) {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = Math.cos(angle) * (radius - 18);
        const y1 = Math.sin(angle) * (radius - 18);
        const x2 = Math.cos(angle) * radius;
        const y2 = Math.sin(angle) * radius;

        ctx.strokeStyle = 'rgba(217, 180, 110, 0.35)';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Nigel Pennick 4-Direction Cross of Earth Tides
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -(radius - 20));
      ctx.lineTo(0, radius - 20);
      ctx.moveTo(-(radius - 20), 0);
      ctx.lineTo(radius - 20, 0);
      ctx.stroke();

      ctx.restore();

      // Synastry Aspect Chords (Connecting the two souls)
      ctx.save();
      ctx.translate(centerX, centerY);

      aspects.slice(0, 8).forEach((asp) => {
        const p1 = chart1[asp.planet1];
        const p2 = chart2[asp.planet2];
        if (!p1 || !p2) return;

        const rad1 = ((p1.longitude - 90) * Math.PI) / 180;
        const rad2 = ((p2.longitude - 90) * Math.PI) / 180;

        const pRadius = radius - 25;
        const x1 = Math.cos(rad1) * pRadius;
        const y1 = Math.sin(rad1) * pRadius;
        const x2 = Math.cos(rad2) * pRadius;
        const y2 = Math.sin(rad2) * pRadius;

        if (asp.nature === 'Magnetic Passion') {
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)'; // Rose
        } else if (asp.nature === 'Harmonious') {
          ctx.strokeStyle = 'rgba(234, 179, 8, 0.65)'; // Gold
        } else if (asp.nature === 'Karmic Catalyst') {
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.65)'; // Violet
        } else {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)'; // Cyan
        }

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(0, 0, x2, y2);
        ctx.stroke();
      });

      // Soul 1 Radiant Golden Nodes
      Object.values(chart1).forEach((p) => {
        const rad = ((p.longitude - 90) * Math.PI) / 180;
        const pr = radius - 24;
        const x = Math.cos(rad) * pr;
        const y = Math.sin(rad) * pr;

        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(234, 179, 8, 0.9)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(x, y, 6.5, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Soul 2 Luminous Amethyst Nodes
      Object.values(chart2).forEach((p) => {
        const rad = ((p.longitude - 90) * Math.PI) / 180;
        const pr = radius - 24;
        const x = Math.cos(rad) * pr;
        const y = Math.sin(rad) * pr;

        ctx.fillStyle = '#c084fc';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(192, 132, 252, 0.9)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(x, y, 6.5, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Inner King Wen Hexagram Hearth
      const hexRadius = 46;
      ctx.fillStyle = 'rgba(12, 15, 24, 0.95)';
      ctx.strokeStyle = 'rgba(217, 180, 110, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, hexRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 6 Lines of the Hexagram
      const lineSpacing = 7;
      const startY = -((6 * lineSpacing) / 2) + 4;
      const patternDigits = hexagramPattern || '111111';

      for (let i = 0; i < 6; i++) {
        const y = startY + (5 - i) * lineSpacing;
        const isYang = patternDigits[i] === '1';

        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#fef08a';

        if (isYang) {
          ctx.beginPath();
          ctx.moveTo(-18, y);
          ctx.lineTo(18, y);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(-18, y);
          ctx.lineTo(-4, y);
          ctx.moveTo(4, y);
          ctx.lineTo(18, y);
          ctx.stroke();
        }
      }

      ctx.restore();

      rotationAngle = (rotationAngle + 0.07) % 360;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [chart1, chart2, aspects, hexagramPattern]);

  return (
    <div className="bg-[#0c0f1c]/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative text-center">
      <div className="max-w-xl mx-auto space-y-4">
        {/* Title */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Living Celestial Seal</span>
        </div>

        <h3 className="font-title text-xl sm:text-2xl font-bold gold-gradient-text tracking-wide">
          The Sacred Geometry of Your Union
        </h3>

        {/* Centered Grand Canvas */}
        <div className="flex justify-center py-2">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={380}
              height={380}
              className="max-w-full rounded-full border border-amber-500/25 shadow-[0_0_40px_rgba(234,179,8,0.15)]"
            />
          </div>
        </div>

        {/* Subtle breath caption */}
        <p className="text-xs text-stone-400 font-serif italic pt-1">
          A living geometric seal generated by the celestial alignment of your union.
        </p>
      </div>
    </div>
  );
};

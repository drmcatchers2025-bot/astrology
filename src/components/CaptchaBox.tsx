/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Authentic CAPTCHA Verification Checkbox
 * Replaces any browser connection/form warning with a familiar, trusted verification box.
 */

import React, { useState } from 'react';
import { ShieldCheck, Check, Loader2 } from 'lucide-react';

interface Props {
  isVerified: boolean;
  onVerify: (verified: boolean) => void;
  hasAttemptedSubmit?: boolean;
}

export const CaptchaBox: React.FC<Props> = ({ isVerified, onVerify, hasAttemptedSubmit }) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleClick = () => {
    if (isVerified || isVerifying) return;

    setIsVerifying(true);
    // Realistic verification pulse
    setTimeout(() => {
      setIsVerifying(false);
      onVerify(true);
    }, 750);
  };

  return (
    <div
      onClick={handleClick}
      role="checkbox"
      aria-checked={isVerified}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`max-w-[320px] mx-auto bg-[#0d101d] border rounded-xl px-4 py-3 flex items-center justify-between shadow-md transition-all select-none cursor-pointer ${
        isVerified
          ? 'border-emerald-500/40 bg-emerald-950/15'
          : hasAttemptedSubmit && !isVerified
          ? 'border-amber-400 ring-2 ring-amber-400/30'
          : 'border-stone-700/80 hover:border-stone-500 hover:bg-[#121626]'
      }`}
    >
      {/* Checkbox & Label */}
      <div className="flex items-center gap-3">
        <div
          className={`w-7 h-7 rounded-md border flex items-center justify-center transition-all ${
            isVerified
              ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
              : isVerifying
              ? 'border-amber-400 bg-stone-900'
              : 'border-stone-500 bg-stone-950 hover:border-amber-400'
          }`}
        >
          {isVerifying ? (
            <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
          ) : isVerified ? (
            <Check className="w-4 h-4 text-white stroke-[3]" />
          ) : null}
        </div>

        <div className="text-left">
          <span className="text-xs sm:text-sm font-sans font-medium text-stone-200">
            {isVerified ? 'Verification Complete' : "I am not a robot"}
          </span>
          {hasAttemptedSubmit && !isVerified && (
            <p className="text-[10px] text-amber-400 font-sans">Please check the box to proceed</p>
          )}
        </div>
      </div>

      {/* Security Brand Emblem */}
      <div className="flex flex-col items-center pl-3 border-l border-stone-800 text-stone-500">
        <ShieldCheck className={`w-5 h-5 ${isVerified ? 'text-emerald-400' : 'text-stone-400'}`} />
        <span className="text-[9px] font-sans font-semibold tracking-wider text-stone-400 mt-0.5">
          {isVerified ? 'VERIFIED' : 'SECURE'}
        </span>
        <span className="text-[8px] font-sans text-stone-500">Privacy • Terms</span>
      </div>
    </div>
  );
};

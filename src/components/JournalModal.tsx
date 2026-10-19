/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * The Oracle Journal Archive Modal
 * Logs past daily readings to preserve transit history over weeks and months
 */

import React from 'react';
import { CombinedOracleContext } from '../lib/esotericEngines.ts';
import { X, Calendar, BookOpen, Trash2, ArrowRight } from 'lucide-react';

export interface SavedJournalEntry {
  id: string;
  date: string;
  userName: string;
  partnerName: string;
  focus: string;
  headline: string;
  thematicBridge: string;
  past: string;
  present: string;
  future: string;
  context: CombinedOracleContext;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  entries: SavedJournalEntry[];
  onLoadEntry: (entry: SavedJournalEntry) => void;
  onDeleteEntry: (id: string) => void;
  onClearAll: () => void;
}

export const JournalModal: React.FC<Props> = ({
  isOpen,
  onClose,
  entries,
  onLoadEntry,
  onDeleteEntry,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0c0f1a] border border-amber-500/30 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title font-bold text-lg text-amber-200">
                Oracle Reading Journal
              </h3>
              <p className="text-xs text-stone-400">
                Permanent archive of your relationship's transit history ({entries.length} readings)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {entries.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-all font-mono"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800/60 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Entries List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-stone-500 font-serif">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30 text-amber-400" />
              <p className="text-base text-stone-400">No readings archived yet.</p>
              <p className="text-xs text-stone-500 mt-1">
                Cast today’s reading and click "Save Reading" to preserve your daily synastry record.
              </p>
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-[#121624] border border-stone-800 hover:border-amber-500/40 rounded-2xl p-4 transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-2">
                  <span className="text-amber-400">{entry.date}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500">{entry.userName} & {entry.partnerName}</span>
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="font-title font-semibold text-amber-200 text-base mb-1">
                  {entry.headline}
                </h4>
                <p className="text-xs text-stone-300 italic mb-2 line-clamp-2">
                  "{entry.thematicBridge}"
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-stone-800/60">
                  <span className="text-[11px] text-stone-500 font-mono">
                    Focus: {entry.focus}
                  </span>
                  <button
                    onClick={() => {
                      onLoadEntry(entry);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-xs text-amber-300 font-mono hover:text-amber-200"
                  >
                    <span>Reopen Reading</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

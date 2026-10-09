import React, { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';

interface FirstTimeHintProps {
  storageKey: string;
  title: string;
  description: string;
}

export const FirstTimeHint: React.FC<FirstTimeHintProps> = ({
  storageKey,
  title,
  description
}) => {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(`kc_hint_${storageKey}`) === '1';
    } catch {
      return false;
    }
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(`kc_hint_${storageKey}`, '1');
    } catch {
      // Ignore storage errors in private mode
    }
  };

  return (
    <div className="bg-[#EDF4D6] border border-[#B7D84B] rounded-[16px] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-[10px] bg-[#B7D84B] text-[#18212B] flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="font-display text-[15px] font-bold text-[#18212B]">
            {title}
          </div>
          <p className="text-[14px] text-[#18212B] leading-[20px] mt-0.5">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        className="min-h-[48px] px-4 rounded-[12px] bg-[#18212B] text-[#FFFFFF] font-display text-[13px] font-semibold flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap active:opacity-90 transition-opacity"
      >
        <Check className="w-4 h-4 text-[#B7D84B]" />
        <span>Entendido</span>
      </button>
    </div>
  );
};

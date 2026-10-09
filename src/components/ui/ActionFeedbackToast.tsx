import React from 'react';
import { Check } from 'lucide-react';

interface ActionFeedbackToastProps {
  message: string | null;
}

export const ActionFeedbackToast: React.FC<ActionFeedbackToastProps> = ({
  message
}) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-md pointer-events-none"
    >
      <div className="bg-[#18212B] text-[#FFFFFF] border border-[#B7D84B] rounded-[14px] px-4 py-3.5 flex items-center gap-3">
        <span className="w-6 h-6 rounded-full bg-[#B7D84B] text-[#18212B] flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 stroke-[2.5]" />
        </span>
        <span className="font-display text-[14px] font-semibold leading-snug">
          {message}
        </span>
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ScreenHeaderProps {
  title: string;
  subtitle: string;
  onBack: () => void;
}

/**
 * Standardized header for all secondary screens.
 * Ensures the screen title matches the navigation button label that led here
 * and provides a clear, thumb-accessible Back button.
 */
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  onBack
}) => {
  return (
    <div className="pb-5 border-b border-[#E5E7E8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start sm:items-center gap-3.5">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[48px] px-4 rounded-[14px] bg-[#FFFFFF] border border-[#E5E7E8] text-[#18212B] font-display text-[14px] font-semibold flex items-center gap-2 hover:bg-[#F7F7F3] active:scale-[0.99] transition-all whitespace-nowrap shrink-0"
          aria-label="Volver a Programa 21D"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Atrás</span>
        </button>

        <div>
          <h1 className="font-display text-[26px] sm:text-[30px] font-bold text-[#18212B] leading-[34px] tracking-[-0.02em]">
            {title}
          </h1>
          <p className="text-[14px] text-[#6F767D] mt-0.5">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

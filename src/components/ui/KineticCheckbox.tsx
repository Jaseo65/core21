import React from 'react';
import { Check } from 'lucide-react';

interface KineticCheckboxProps {
  checked: boolean;
  className?: string;
}

/**
 * Reusable 22px × 22px Kinetic Clarity checkbox indicator.
 * Unchecked: #FFFFFF background, 1.5px #6F767D border, 6px radius.
 * Checked: #B7D84B background, 1.5px #B7D84B border, #18212B check icon.
 */
export const KineticCheckbox: React.FC<KineticCheckboxProps> = ({
  checked,
  className = ''
}) => {
  return (
    <span
      className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center shrink-0 transition-colors ${
        checked
          ? 'bg-[#B7D84B] border-[1.5px] border-[#B7D84B] text-[#18212B]'
          : 'bg-[#FFFFFF] border-[1.5px] border-[#6F767D]'
      } ${className}`}
      aria-hidden="true"
    >
      {checked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
    </span>
  );
};

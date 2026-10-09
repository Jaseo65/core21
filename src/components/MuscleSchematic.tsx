import React from 'react';
import { MuscleZone } from '../data/fitnessData';

interface MuscleSchematicProps {
  zone: MuscleZone;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Clean Scandinavian sports-science anatomical schematic.
 * Highlights primary kinetic chains in #B7D84B (fresh muted lime)
 * and structural stabilizers in #18212B (deep charcoal navy) over #F7F7F3 / #FFFFFF.
 */
export const MuscleSchematic: React.FC<MuscleSchematicProps> = ({
  zone,
  size = 'md',
  className = ''
}) => {
  const dimensions =
    size === 'sm'
      ? 'w-12 h-14'
      : size === 'lg'
      ? 'w-32 h-40'
      : 'w-20 h-24';

  const isCore = zone === 'core' || zone === 'full_body';
  const isLower = zone === 'lower' || zone === 'mobility' || zone === 'full_body';
  const isUpper = zone === 'upper_push' || zone === 'full_body';
  const isHipMobility = zone === 'mobility';

  return (
    <div
      className={`relative flex items-center justify-center bg-[#F7F7F3] border border-[#E5E7E8] rounded-[12px] shrink-0 overflow-hidden ${dimensions} ${className}`}
      aria-label={`Esquema biomecánico: ${zone}`}
    >
      <svg
        viewBox="0 0 120 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-1.5"
      >
        {/* Subtle technical coordinate grid lines */}
        <line x1="60" y1="8" x2="60" y2="142" stroke="#E5E7E8" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="16" y1="74" x2="104" y2="74" stroke="#E5E7E8" strokeWidth="1" strokeDasharray="2 2" />

        {/* Head & Neck Outline */}
        <circle cx="60" cy="20" r="9" fill="#FFFFFF" stroke="#18212B" strokeWidth="1.5" />
        <rect x="57" y="29" width="6" height="5" rx="2" fill="#18212B" />

        {/* Shoulders & Deltoids */}
        <path
          d="M37 36C37 34.3431 38.3431 33 40 33H80C81.6569 33 83 34.3431 83 36V44C83 45.6569 81.6569 47 80 47H40C38.3431 47 37 45.6569 37 44V36Z"
          fill={isUpper ? '#B7D84B' : '#FFFFFF'}
          stroke="#18212B"
          strokeWidth="1.5"
        />

        {/* Pectorals / Upper Chest */}
        <rect
          x="44"
          y="36"
          width="15"
          height="14"
          rx="3"
          fill={isUpper ? '#B7D84B' : '#EDF4D6'}
          stroke="#18212B"
          strokeWidth="1.4"
        />
        <rect
          x="61"
          y="36"
          width="15"
          height="14"
          rx="3"
          fill={isUpper ? '#B7D84B' : '#EDF4D6'}
          stroke="#18212B"
          strokeWidth="1.4"
        />

        {/* Arms (Left & Right) */}
        <rect
          x="29"
          y="38"
          width="7"
          height="32"
          rx="3.5"
          fill={isUpper ? '#18212B' : '#FFFFFF'}
          stroke="#18212B"
          strokeWidth="1.4"
        />
        <rect
          x="84"
          y="38"
          width="7"
          height="32"
          rx="3.5"
          fill={isUpper ? '#18212B' : '#FFFFFF'}
          stroke="#18212B"
          strokeWidth="1.4"
        />

        {/* Core Cylinder (Rectus Abdominis & Obliques) */}
        <rect
          x="45"
          y="52"
          width="30"
          height="24"
          rx="4"
          fill={isCore ? '#B7D84B' : '#FFFFFF'}
          stroke="#18212B"
          strokeWidth="1.5"
        />
        {/* Core Segmentation Lines */}
        <line x1="60" y1="53" x2="60" y2="75" stroke="#18212B" strokeWidth="1.2" />
        <line x1="46" y1="60" x2="74" y2="60" stroke="#18212B" strokeWidth="1.1" />
        <line x1="46" y1="68" x2="74" y2="68" stroke="#18212B" strokeWidth="1.1" />

        {/* Pelvis / Hip Stabilizer Girdle */}
        <path
          d="M43 78H77L74 89H46L43 78Z"
          fill={isHipMobility ? '#B7D84B' : isCore || isLower ? '#18212B' : '#FFFFFF'}
          stroke="#18212B"
          strokeWidth="1.5"
        />

        {/* Quadriceps / Hamstrings (Upper Legs) */}
        <rect
          x="44"
          y="91"
          width="13"
          height="28"
          rx="5"
          fill={isLower ? '#B7D84B' : '#FFFFFF'}
          stroke="#18212B"
          strokeWidth="1.5"
        />
        <rect
          x="63"
          y="91"
          width="13"
          height="28"
          rx="5"
          fill={isLower ? '#B7D84B' : '#FFFFFF'}
          stroke="#18212B"
          strokeWidth="1.5"
        />

        {/* Calves / Lower Legs */}
        <rect
          x="46"
          y="121"
          width="9"
          height="20"
          rx="4"
          fill={isLower ? '#EDF4D6' : '#FFFFFF'}
          stroke="#18212B"
          strokeWidth="1.4"
        />
        <rect
          x="65"
          y="121"
          width="9"
          height="20"
          rx="4"
          fill={isLower ? '#EDF4D6' : '#FFFFFF'}
          stroke="#18212B"
          strokeWidth="1.4"
        />
      </svg>
    </div>
  );
};

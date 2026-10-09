import React from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { ExerciseItem } from '../../data/fitnessData';
import { MuscleSchematic } from '../MuscleSchematic';
import { ResilientImage } from '../ResilientImage';
import { KineticCheckbox } from '../ui/KineticCheckbox';

interface DailyExerciseModuleCardProps {
  exercise: ExerciseItem;
  isSelected: boolean;
  exerciseSets: boolean[];
  onSelect: () => void;
  onInspect: (exercise: ExerciseItem) => void;
  onToggleSet: (exerciseId: string, setIndex: number) => void;
}

export const DailyExerciseModuleCard: React.FC<DailyExerciseModuleCardProps> = ({
  exercise,
  isSelected,
  exerciseSets,
  onSelect,
  onInspect,
  onToggleSet
}) => {
  const doneCount = exerciseSets.filter(Boolean).length;
  const allSetsDone = doneCount === exercise.sets;

  return (
    <div
      onClick={onSelect}
      className={`rounded-[16px] p-4 sm:p-5 transition-colors cursor-pointer ${
        isSelected
          ? 'bg-[#EDF4D6]/60 border-[1.5px] border-[#B7D84B]'
          : 'bg-[#FFFFFF] border border-[#E5E7E8] hover:border-[#6F767D]'
      }`}
    >
      {/* Top Info Area */}
      <div className="flex items-start sm:items-center gap-3.5">
        <span
          className={`font-display text-[14px] font-bold tabular-nums w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${
            allSetsDone
              ? 'bg-[#18212B] text-[#B7D84B]'
              : isSelected
              ? 'bg-[#B7D84B] text-[#18212B]'
              : 'bg-[#F7F7F3] text-[#18212B]'
          }`}
        >
          {allSetsDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : exercise.index}
        </span>

        <div className="w-16 h-16 rounded-[12px] overflow-hidden shrink-0 bg-[#F7F7F3]">
          <ResilientImage
            src={exercise.imageUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        </div>

        <MuscleSchematic
          zone={exercise.zone}
          size="sm"
          className="hidden sm:flex"
        />

        <div className="flex-1 min-w-0">
          <h3 className="font-display text-[17px] font-bold text-[#18212B] leading-[22px]">
            {exercise.name}
          </h3>
          <div className="text-[13px] text-[#6F767D] mt-1 tabular-nums">
            <span>{exercise.sets} series</span>
            <span className="mx-1.5" aria-hidden="true">·</span>
            <span className="font-semibold text-[#18212B]">{exercise.repsOrTime}</span>
            <span className="mx-1.5" aria-hidden="true">·</span>
            <span>{exercise.equipment}</span>
          </div>
        </div>
      </div>

      {/* Bottom Thumb-Friendly Action & Set Tracking Area */}
      <div
        className="mt-4 pt-4 border-t border-[#E5E7E8] space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-[#18212B] tabular-nums">
            Toca cada serie al terminarla ({doneCount}/{exercise.sets})
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2.5">
            {exerciseSets.map((checked, setIdx) => (
              <button
                key={setIdx}
                type="button"
                onClick={() => onToggleSet(exercise.id, setIdx)}
                className={`min-h-[48px] px-3.5 py-2 rounded-[12px] flex items-center gap-2.5 text-[14px] font-semibold transition-colors tabular-nums ${
                  checked
                    ? 'bg-[#EDF4D6] text-[#18212B]'
                    : 'bg-[#F7F7F3] text-[#18212B] hover:bg-[#E5E7E8]/70'
                }`}
              >
                <KineticCheckbox checked={checked} />
                <span>Serie {setIdx + 1}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onInspect(exercise)}
            className="min-h-[48px] px-4 rounded-[12px] bg-[#F7F7F3] text-[13px] font-semibold text-[#18212B] hover:bg-[#E5E7E8]/70 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Ver Cómo Hacerlo</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

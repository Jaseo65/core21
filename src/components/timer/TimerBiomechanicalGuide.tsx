import React from 'react';
import { ExerciseItem } from '../../data/fitnessData';
import { MuscleSchematic } from '../MuscleSchematic';
import { ResilientImage } from '../ResilientImage';

interface TimerBiomechanicalGuideProps {
  exercise: ExerciseItem;
  dayTitle: string;
}

export const TimerBiomechanicalGuide: React.FC<TimerBiomechanicalGuideProps> = ({
  exercise,
  dayTitle
}) => {
  return (
    <div className="mt-6 pt-6 border-t border-[#E5E7E8] grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      <div className="md:col-span-5">
        <div className="rounded-[12px] overflow-hidden aspect-[4/3] bg-[#F7F7F3]">
          <ResilientImage
            src={exercise.imageUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center gap-3 mt-4">
          <MuscleSchematic zone={exercise.zone} size="sm" />
          <div>
            <div className="text-[12px] text-[#6F767D]">Cadena Cinética Primaria</div>
            <div className="text-[14px] font-semibold text-[#18212B]">
              {exercise.primaryMuscles.join(' · ')}
            </div>
            <div className="text-[12px] text-[#6F767D] mt-0.5">
              Estabilizadores: {exercise.stabilizerMuscles.join(' · ')}
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-7 space-y-4">
        <div>
          <div className="text-[12px] font-semibold text-[#6F767D]">
            Instrucciones Biomecánicas · {dayTitle}
          </div>
          <p className="text-[15px] text-[#18212B] mt-1 leading-[22px]">
            {exercise.subtitle}
          </p>
        </div>

        <div className="space-y-2.5 pt-3 border-t border-[#E5E7E8]">
          {exercise.cues.map((cue, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="font-display font-bold text-[13px] text-[#18212B] bg-[#EDF4D6] rounded-[8px] px-2 py-0.5 tabular-nums shrink-0">
                0{i + 1}
              </span>
              <p className="text-[15px] text-[#18212B] leading-[22px]">{cue}</p>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-[#E5E7E8]">
          <div className="text-[12px] font-semibold text-[#6F767D]">
            Pauta de Respiración y Cadencia
          </div>
          <div className="text-[14px] font-medium text-[#18212B] mt-0.5">
            {exercise.breathingCue}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Play, Plus, Check } from 'lucide-react';
import { ExerciseItem } from '../data/fitnessData';
import { MuscleSchematic } from './MuscleSchematic';
import { ResilientImage } from './ResilientImage';

interface ExerciseDetailModalProps {
  exercise: ExerciseItem | null;
  onClose: () => void;
  onPracticeNow: (exercise: ExerciseItem) => void;
  onToggleInCurrentDay: (exerciseId: string) => void;
  isInCurrentDay: boolean;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  onClose,
  onPracticeNow,
  onToggleInCurrentDay,
  isInCurrentDay
}) => {
  if (!exercise) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18212B]/12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-exercise-title"
    >
      <div
        className="bg-[#FFFFFF] border border-[#E5E7E8] rounded-[16px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5E7E8]">
          <div>
            <div className="text-[13px] text-[#6F767D] tabular-nums">
              Índice {exercise.index} · {exercise.zoneLabel} · {exercise.equipment}
            </div>
            <h2
              id="modal-exercise-title"
              className="text-[24px] font-bold text-[#18212B] leading-[30px] tracking-[-0.015em] mt-1"
            >
              {exercise.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] rounded-full border border-[#E5E7E8] bg-[#FFFFFF] text-[#18212B] flex items-center justify-center hover:bg-[#F7F7F3] transition-colors shrink-0"
            aria-label="Cerrar ficha técnica"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 my-5">
          <div className="sm:col-span-7 rounded-[12px] overflow-hidden aspect-[4/3] bg-[#F7F7F3]">
            <ResilientImage
              src={exercise.imageUrl}
              alt={exercise.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="sm:col-span-5 flex flex-col justify-between bg-[#F7F7F3] rounded-[12px] p-4">
            <div className="flex items-center gap-3">
              <MuscleSchematic zone={exercise.zone} size="md" />
              <div>
                <div className="text-[12px] font-semibold text-[#6F767D]">
                  Foco Muscular
                </div>
                <div className="text-[15px] font-bold text-[#18212B] mt-0.5">
                  {exercise.zoneLabel}
                </div>
                <div className="text-[13px] text-[#6F767D] mt-1 tabular-nums">
                  Tempo {exercise.tempo}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E5E7E8] space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-[#6F767D]">Prescripción:</span>
                <span className="font-semibold text-[#18212B] tabular-nums">
                  {exercise.sets} series × {exercise.repsOrTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6F767D]">Descanso entre series:</span>
                <span className="font-semibold text-[#18212B] tabular-nums">
                  {exercise.restSec} seg
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6F767D]">Equipamiento:</span>
                <span className="font-semibold text-[#18212B]">{exercise.equipment}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Biomechanical Cues */}
        <div className="space-y-3 pt-2 border-t border-[#E5E7E8]">
          <h3 className="text-[16px] font-semibold text-[#18212B] pt-2">
            Protocolo de Ejecución Técnica
          </h3>
          {exercise.cues.map((cue, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="font-display font-bold text-[12px] text-[#18212B] bg-[#EDF4D6] rounded-[8px] px-2 py-0.5 tabular-nums shrink-0 mt-0.5">
                0{idx + 1}
              </span>
              <p className="text-[15px] text-[#18212B] leading-[22px]">{cue}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-[#E5E7E8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px]">
          <div>
            <span className="font-semibold text-[#18212B]">Músculos Primarios: </span>
            <span className="text-[#6F767D]">{exercise.primaryMuscles.join(' · ')}</span>
          </div>
          <div>
            <span className="font-semibold text-[#18212B]">Estabilizadores: </span>
            <span className="text-[#6F767D]">{exercise.stabilizerMuscles.join(' · ')}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E5E7E8] flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => onToggleInCurrentDay(exercise.id)}
            className="w-full sm:w-auto flex-1 h-[54px] px-5 rounded-[14px] border border-[#E5E7E8] bg-[#FFFFFF] text-[#18212B] font-display font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-[#F7F7F3] transition-colors whitespace-nowrap"
          >
            {isInCurrentDay ? (
              <>
                <Check className="w-4 h-4 text-[#516600]" />
                <span>Incluido en la Sesión del Día</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Añadir al Día Seleccionado</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              onPracticeNow(exercise);
              onClose();
            }}
            className="w-full sm:w-auto flex-1 h-[54px] px-5 rounded-[14px] bg-[#B7D84B] text-[#18212B] font-display font-semibold text-[16px] flex items-center justify-center gap-2 active:bg-[#a6c73f] transition-colors whitespace-nowrap"
          >
            <Play className="w-4 h-4 fill-[#18212B]" />
            <span>Practicar con Temporizador</span>
          </button>
        </div>
      </div>
    </div>
  );
};

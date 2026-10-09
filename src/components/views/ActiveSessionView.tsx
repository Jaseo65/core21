import React from 'react';
import { Check } from 'lucide-react';
import { DayProgram, ExerciseItem } from '../../data/fitnessData';
import { RadialWorkoutTimer } from '../RadialWorkoutTimer';
import { ScreenHeader } from '../ui/ScreenHeader';
import { FirstTimeHint } from '../ui/FirstTimeHint';

interface ActiveSessionViewProps {
  selectedDayNumber: number;
  currentDayProgram: DayProgram;
  currentDayExercises: ExerciseItem[];
  currentDaySetsMap: Record<string, boolean[]>;
  activeExerciseIndex: number;
  isSelectedDayDone: boolean;
  onSelectExerciseIndex: (index: number) => void;
  onToggleSet: (exerciseId: string, setIndex: number) => void;
  onCompleteDaySession: () => void;
  onBackToMatrix: () => void;
}

export const ActiveSessionView: React.FC<ActiveSessionViewProps> = ({
  selectedDayNumber,
  currentDayProgram,
  currentDayExercises,
  currentDaySetsMap,
  activeExerciseIndex,
  isSelectedDayDone,
  onSelectExerciseIndex,
  onToggleSet,
  onCompleteDaySession,
  onBackToMatrix
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ScreenHeader
        title="Sesión Activa"
        subtitle={`Día ${selectedDayNumber} de 21 · ${currentDayProgram.title}`}
        onBack={onBackToMatrix}
      />

      <FirstTimeHint
        storageKey="active_session"
        title="Modo diseñado para ver desde el suelo"
        description="Pulsa Iniciar Reloj. Cuando el tiempo de trabajo llegue a cero, tu serie se marcará sola y empezará automáticamente el reloj de descanso."
      />

      {/* Horizontal Sequence Selector */}
      <div>
        <div className="text-[13px] font-semibold text-[#6F767D] mb-2.5">
          Selecciona el ejercicio actual:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {currentDayExercises.map((ex, idx) => {
            const active = idx === activeExerciseIndex;
            const setsArr = currentDaySetsMap[ex.id] || [];
            const isExDone = setsArr.filter(Boolean).length === ex.sets;

            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => onSelectExerciseIndex(idx)}
                className={`min-h-[58px] p-3.5 rounded-[14px] border text-left transition-colors flex flex-col justify-between ${
                  active
                    ? 'bg-[#EDF4D6] border-[1.5px] border-[#B7D84B] text-[#18212B]'
                    : isExDone
                    ? 'bg-[#18212B] border-[#18212B] text-[#FFFFFF]'
                    : 'bg-[#FFFFFF] border-[#E5E7E8] text-[#6F767D] hover:text-[#18212B]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-display text-[12px] font-bold tabular-nums">
                    Paso {ex.index}
                  </span>
                  {isExDone && (
                    <Check
                      className={`w-4 h-4 stroke-[2.5] ${
                        active ? 'text-[#18212B]' : 'text-[#B7D84B]'
                      }`}
                    />
                  )}
                </div>
                <div className="text-[13px] font-semibold truncate w-full mt-1">
                  {ex.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <RadialWorkoutTimer
        exercises={currentDayExercises}
        activeExerciseIndex={activeExerciseIndex}
        onSelectExerciseIndex={onSelectExerciseIndex}
        completedSetsMap={currentDaySetsMap}
        onToggleSet={onToggleSet}
        onCompleteDaySession={onCompleteDaySession}
        isDayCompleted={isSelectedDayDone}
        dayNumber={selectedDayNumber}
        dayTitle={currentDayProgram.title}
        compactMode={false}
      />
    </div>
  );
};

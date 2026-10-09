import React from 'react';
import { Plus } from 'lucide-react';
import { DayProgram, ExerciseItem } from '../../data/fitnessData';
import { ReadinessLevel } from '../../hooks/useFitnessProgram';
import { ProgramHeroSection } from '../program/ProgramHeroSection';
import { TwentyOneDayMatrix } from '../program/TwentyOneDayMatrix';
import { DailyExerciseModuleCard } from '../program/DailyExerciseModuleCard';
import { RadialWorkoutTimer } from '../RadialWorkoutTimer';
import { FirstTimeHint } from '../ui/FirstTimeHint';

interface ProgramDashboardViewProps {
  currentDayProgram: DayProgram;
  selectedDayNumber: number;
  completedDays: number[];
  cyclePercentage: number;
  isSelectedDayDone: boolean;
  dayProgressMetrics: {
    totalSets: number;
    doneSets: number;
    percent: number;
  };
  currentDayExercises: ExerciseItem[];
  currentDaySetsMap: Record<string, boolean[]>;
  activeExerciseIndex: number;
  readinessLevel: ReadinessLevel;
  onSelectDay: (dayNumber: number) => void;
  onSelectExerciseIndex: (index: number) => void;
  onToggleSet: (exerciseId: string, setIndex: number) => void;
  onToggleDayComplete: (dayNum: number) => void;
  onCompleteDaySession: () => void;
  onInspectExercise: (exercise: ExerciseItem) => void;
  onNavigateToTimer: () => void;
  onNavigateToLibrary: () => void;
  onNavigateToSettings: () => void;
}

export const ProgramDashboardView: React.FC<ProgramDashboardViewProps> = ({
  currentDayProgram,
  selectedDayNumber,
  completedDays,
  cyclePercentage,
  isSelectedDayDone,
  dayProgressMetrics,
  currentDayExercises,
  currentDaySetsMap,
  activeExerciseIndex,
  readinessLevel,
  onSelectDay,
  onSelectExerciseIndex,
  onToggleSet,
  onToggleDayComplete,
  onCompleteDaySession,
  onInspectExercise,
  onNavigateToTimer,
  onNavigateToLibrary,
  onNavigateToSettings
}) => {
  return (
    <div className="space-y-8">
      {/* First-Time Visual Onboarding Cue */}
      <FirstTimeHint
        storageKey="program_21d"
        title="Cómo usar tu Programa 21D"
        description="Toca cualquier día del calendario para ver sus ejercicios. Durante tu rutina, toca los botones Serie 1, Serie 2 o Serie 3 para guardar tu avance, o pulsa Iniciar Sesión Guiada para usar el reloj con sonido."
      />

      <ProgramHeroSection
        currentDayProgram={currentDayProgram}
        selectedDayNumber={selectedDayNumber}
        completedDaysCount={completedDays.length}
        cyclePercentage={cyclePercentage}
        isSelectedDayDone={isSelectedDayDone}
        dayProgressMetrics={dayProgressMetrics}
        exercisesCount={currentDayExercises.length}
        readinessLevel={readinessLevel}
        onStartGuidedSession={onNavigateToTimer}
        onToggleDayComplete={onToggleDayComplete}
        onOpenSettings={onNavigateToSettings}
      />

      <TwentyOneDayMatrix
        selectedDayNumber={selectedDayNumber}
        completedDays={completedDays}
        onSelectDay={onSelectDay}
      />

      {/* Main 2-Column Interactive Workspace: Workout Modules + Live Radial Timer */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <h2 className="font-display text-[24px] font-bold text-[#18212B] leading-[30px] tracking-[-0.015em]">
              Ejercicios del Día {selectedDayNumber}
            </h2>
            <p className="text-[14px] text-[#6F767D] mt-0.5">
              Toca un ejercicio para cargarlo en el temporizador o marca cada serie terminada.
            </p>
          </div>

          <div className="space-y-3.5">
            {currentDayExercises.map((exercise, idx) => (
              <DailyExerciseModuleCard
                key={exercise.id}
                exercise={exercise}
                isSelected={idx === activeExerciseIndex}
                exerciseSets={currentDaySetsMap[exercise.id] || []}
                onSelect={() => onSelectExerciseIndex(idx)}
                onInspect={onInspectExercise}
                onToggleSet={onToggleSet}
              />
            ))}
          </div>

          {/* Primary Customization Action placed at the bottom of the list (Thumb Reach Zone) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onNavigateToLibrary}
              className="w-full h-[54px] px-5 rounded-[14px] border border-[#E5E7E8] bg-[#FFFFFF] text-[15px] font-display font-semibold text-[#18212B] hover:bg-[#F7F7F3] flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Cambiar o Añadir Ejercicios desde la Biblioteca</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-[84px]">
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
            compactMode={true}
            onExpandToFullScreen={onNavigateToTimer}
          />
        </div>
      </section>
    </div>
  );
};

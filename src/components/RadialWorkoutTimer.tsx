import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Check,
  Plus,
  Minus,
  Maximize2
} from 'lucide-react';
import { ExerciseItem } from '../data/fitnessData';
import { useWorkoutTimer, formatTimerSeconds } from '../hooks/useWorkoutTimer';
import { KineticCheckbox } from './ui/KineticCheckbox';
import { TimerBiomechanicalGuide } from './timer/TimerBiomechanicalGuide';

interface RadialWorkoutTimerProps {
  exercises: ExerciseItem[];
  activeExerciseIndex: number;
  onSelectExerciseIndex: (index: number) => void;
  completedSetsMap: Record<string, boolean[]>;
  onToggleSet: (exerciseId: string, setIndex: number) => void;
  onCompleteDaySession: () => void;
  isDayCompleted: boolean;
  dayNumber: number;
  dayTitle: string;
  compactMode?: boolean;
  onExpandToFullScreen?: () => void;
}

export const RadialWorkoutTimer: React.FC<RadialWorkoutTimerProps> = ({
  exercises,
  activeExerciseIndex,
  onSelectExerciseIndex,
  completedSetsMap,
  onToggleSet,
  onCompleteDaySession,
  isDayCompleted,
  dayNumber,
  dayTitle,
  compactMode = false,
  onExpandToFullScreen
}) => {
  const currentExercise = exercises[activeExerciseIndex] || exercises[0];

  const {
    phase,
    totalSeconds,
    secondsLeft,
    isRunning,
    soundEnabled,
    setSoundEnabled,
    switchPhase,
    adjustTime,
    resetTimer,
    toggleRunning,
    handleCompleteCurrentSet
  } = useWorkoutTimer({
    currentExercise,
    exercisesCount: exercises.length,
    activeExerciseIndex,
    onSelectExerciseIndex,
    completedSetsMap,
    onToggleSet,
    onCompleteDaySession
  });

  if (!currentExercise) return null;

  const setsState =
    completedSetsMap[currentExercise.id] ||
    Array.from({ length: currentExercise.sets }, () => false);
  const completedSetsCount = setsState.filter(Boolean).length;

  // Radial SVG geometry
  const radius = compactMode ? 96 : 122;
  const strokeWidth = compactMode ? 10 : 12;
  const normalizedRadius = radius - strokeWidth;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progressFraction =
    totalSeconds > 0 ? (totalSeconds - secondsLeft) / totalSeconds : 0;
  const strokeDashoffset = circumference - progressFraction * circumference;

  return (
    <div className="bg-[#FFFFFF] border border-[#E5E7E8] rounded-[16px] p-5 sm:p-6">
      {/* Header Information (Static Info Only in Top Hard-Reach Zone) */}
      <div className="pb-4 border-b border-[#E5E7E8]">
        <div className="text-[12px] font-semibold tracking-wide text-[#6F767D] tabular-nums">
          Día {dayNumber} de 21 · Ejercicio {activeExerciseIndex + 1} de {exercises.length}
        </div>
        <h3 className="text-[19px] font-bold text-[#18212B] tracking-tight mt-0.5">
          {currentExercise.name}
        </h3>
      </div>

      {/* Phase Segmented Switcher (Trabajo vs Descanso) - 48px min height */}
      <div className="flex items-center justify-between gap-2 mt-4 bg-[#F7F7F3] p-1.5 rounded-[14px]">
        <button
          type="button"
          onClick={() => switchPhase('work')}
          className={`flex-1 min-h-[48px] px-3 py-2 rounded-[10px] text-[13px] font-semibold transition-colors whitespace-nowrap ${
            phase === 'work'
              ? 'bg-[#FFFFFF] text-[#18212B]'
              : 'text-[#6F767D] hover:text-[#18212B]'
          }`}
        >
          Trabajo ({currentExercise.durationSec}s)
        </button>
        <button
          type="button"
          onClick={() => switchPhase('rest')}
          className={`flex-1 min-h-[48px] px-3 py-2 rounded-[10px] text-[13px] font-semibold transition-colors whitespace-nowrap ${
            phase === 'rest'
              ? 'bg-[#EDF4D6] text-[#18212B]'
              : 'text-[#6F767D] hover:text-[#18212B]'
          }`}
        >
          Descanso ({currentExercise.restSec}s)
        </button>
      </div>

      {/* Central Radial Progress Ring & Display Timer */}
      <div className="flex flex-col items-center justify-center my-6 relative">
        <div className="relative flex items-center justify-center">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="-rotate-90 transform"
            aria-label="Indicador de progreso del temporizador"
          >
            <circle
              stroke="#E5E7E8"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="#B7D84B"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-300 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="text-[12px] font-semibold text-[#6F767D]">
              {phase === 'work' ? 'Tiempo de Ejercicio' : 'Tiempo de Descanso'}
            </span>
            <div
              className={`font-display font-extrabold text-[#18212B] tabular-nums tracking-[-0.02em] ${
                compactMode
                  ? 'text-[44px] leading-[48px]'
                  : 'text-[56px] sm:text-[64px] leading-[64px]'
              } my-1`}
            >
              {formatTimerSeconds(secondsLeft)}
            </div>
            <span className="text-[13px] font-semibold text-[#18212B] tabular-nums">
              Serie {Math.min(completedSetsCount + 1, currentExercise.sets)} de{' '}
              {currentExercise.sets}
            </span>
          </div>
        </div>

        {/* Fine Time Adjusters (-10s / Reiniciar / +10s) - All 48px touch targets */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
          <button
            type="button"
            onClick={() => adjustTime(-10)}
            className="min-h-[48px] px-4 rounded-[12px] bg-[#F7F7F3] text-[13px] font-semibold text-[#18212B] hover:bg-[#E5E7E8]/70 flex items-center gap-1.5 tabular-nums transition-colors"
          >
            <Minus className="w-4 h-4" />
            <span>10s</span>
          </button>

          <button
            type="button"
            onClick={resetTimer}
            className="min-h-[48px] px-4 rounded-[12px] bg-[#F7F7F3] text-[13px] font-semibold text-[#18212B] hover:bg-[#E5E7E8]/70 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar</span>
          </button>

          <button
            type="button"
            onClick={() => adjustTime(10)}
            className="min-h-[48px] px-4 rounded-[12px] bg-[#F7F7F3] text-[13px] font-semibold text-[#18212B] hover:bg-[#E5E7E8]/70 flex items-center gap-1.5 tabular-nums transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>10s</span>
          </button>
        </div>
      </div>

      {/* Primary Transport Controls in Thumb Zone */}
      <div className="grid grid-cols-4 gap-2.5 mb-5">
        <button
          type="button"
          disabled={activeExerciseIndex === 0}
          onClick={() => onSelectExerciseIndex(Math.max(0, activeExerciseIndex - 1))}
          className="h-[54px] rounded-[14px] bg-[#F7F7F3] text-[#18212B] flex items-center justify-center hover:bg-[#E5E7E8]/60 disabled:opacity-40 transition-colors"
          aria-label="Ejercicio anterior"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={toggleRunning}
          className="col-span-2 h-[54px] rounded-[14px] bg-[#18212B] text-[#FFFFFF] font-display font-semibold text-[16px] flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all whitespace-nowrap"
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5 text-[#B7D84B]" />
              <span>Pausar Reloj</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 text-[#B7D84B] fill-[#B7D84B]" />
              <span>{secondsLeft < totalSeconds ? 'Continuar' : 'Iniciar Reloj'}</span>
            </>
          )}
        </button>

        <button
          type="button"
          disabled={activeExerciseIndex >= exercises.length - 1}
          onClick={() =>
            onSelectExerciseIndex(Math.min(exercises.length - 1, activeExerciseIndex + 1))
          }
          className="h-[54px] rounded-[14px] bg-[#F7F7F3] text-[#18212B] flex items-center justify-center hover:bg-[#E5E7E8]/60 disabled:opacity-40 transition-colors"
          aria-label="Siguiente ejercicio"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Interactive Sets Checkboxes (48px minimum height) */}
      <div className="pt-4 border-t border-[#E5E7E8]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-semibold text-[#18212B]">
            Registro de Series ({currentExercise.repsOrTime})
          </span>
          <span className="text-[13px] text-[#6F767D] tabular-nums">
            {completedSetsCount}/{currentExercise.sets} completadas
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
          {setsState.map((isChecked, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onToggleSet(currentExercise.id, idx)}
              className={`min-h-[48px] px-3.5 py-2 rounded-[12px] flex items-center justify-between transition-colors ${
                isChecked
                  ? 'bg-[#EDF4D6] text-[#18212B]'
                  : 'bg-[#F7F7F3] text-[#6F767D] hover:text-[#18212B]'
              }`}
            >
              <span className="text-[13px] font-semibold tabular-nums">Serie {idx + 1}</span>
              <KineticCheckbox checked={isChecked} />
            </button>
          ))}
        </div>

        {/* High-Kinetic Primary Action Button (#B7D84B, height 54px, radius 14px) */}
        <button
          type="button"
          onClick={handleCompleteCurrentSet}
          className="w-full h-[54px] rounded-[14px] bg-[#B7D84B] text-[#18212B] font-display font-semibold text-[16px] flex items-center justify-center gap-2 active:bg-[#a6c73f] transition-colors whitespace-nowrap"
        >
          <Check className="w-5 h-5 stroke-[2.5]" />
          <span>
            {completedSetsCount < currentExercise.sets
              ? `Completar Serie ${completedSetsCount + 1}`
              : activeExerciseIndex + 1 < exercises.length
              ? 'Avanzar al Siguiente Ejercicio'
              : isDayCompleted
              ? `Día ${dayNumber} Completado`
              : `Finalizar Protocolo Día ${dayNumber}`}
          </span>
        </button>

        {/* Bottom Thumb-Zone Utility Controls (Sound + Full-Screen Mode) */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mt-3 pt-3 border-t border-[#E5E7E8]">
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="flex-1 min-h-[48px] px-3.5 flex items-center justify-center gap-2 rounded-[12px] bg-[#F7F7F3] text-[13px] font-semibold text-[#18212B] hover:bg-[#E5E7E8]/70 transition-colors whitespace-nowrap"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-[#18212B]" />
                <span>Sonido Activado</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#6F767D]" />
                <span>Sonido Silenciado</span>
              </>
            )}
          </button>

          {compactMode && onExpandToFullScreen && (
            <button
              type="button"
              onClick={onExpandToFullScreen}
              className="flex-1 min-h-[48px] px-3.5 flex items-center justify-center gap-2 rounded-[12px] bg-[#F7F7F3] text-[13px] font-semibold text-[#18212B] hover:bg-[#E5E7E8]/70 transition-colors whitespace-nowrap"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Abrir en Sesión Activa</span>
            </button>
          )}
        </div>
      </div>

      {/* Expanded Mode Visual Demonstration & Biomechanical Cues */}
      {!compactMode && (
        <TimerBiomechanicalGuide exercise={currentExercise} dayTitle={dayTitle} />
      )}
    </div>
  );
};

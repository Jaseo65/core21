import React from 'react';
import { Play, Check } from 'lucide-react';
import { DayProgram, HERO_STUDIO_IMAGE } from '../../data/fitnessData';
import { ReadinessLevel } from '../../hooks/useFitnessProgram';
import { ResilientImage } from '../ResilientImage';

interface ProgramHeroSectionProps {
  currentDayProgram: DayProgram;
  selectedDayNumber: number;
  completedDaysCount: number;
  cyclePercentage: number;
  isSelectedDayDone: boolean;
  dayProgressMetrics: {
    totalSets: number;
    doneSets: number;
    percent: number;
  };
  exercisesCount: number;
  readinessLevel: ReadinessLevel;
  onStartGuidedSession: () => void;
  onToggleDayComplete: (dayNum: number) => void;
  onOpenSettings: () => void;
}

export const ProgramHeroSection: React.FC<ProgramHeroSectionProps> = ({
  currentDayProgram,
  selectedDayNumber,
  completedDaysCount,
  cyclePercentage,
  isSelectedDayDone,
  dayProgressMetrics,
  exercisesCount,
  readinessLevel,
  onStartGuidedSession,
  onToggleDayComplete,
  onOpenSettings
}) => {
  const circleCircumference = 2 * Math.PI * 26;

  return (
    <div className="space-y-8">
      {/* Hero 2-Column Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Day Protocol Overview */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E5E7E8] rounded-[16px] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-[#6F767D] tabular-nums mb-3">
              <span className="text-[#18212B]">Día {currentDayProgram.day} de 21</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#516600]">{currentDayProgram.focusTag}</span>
              <span aria-hidden="true">·</span>
              <span>{currentDayProgram.durationMin} min</span>
              <span aria-hidden="true">·</span>
              <span>{currentDayProgram.calories} kcal</span>
              <span aria-hidden="true">·</span>
              <span>{currentDayProgram.intensity}</span>
            </div>

            <h1 className="font-display text-[32px] sm:text-[40px] font-bold text-[#18212B] leading-[1.12] tracking-[-0.025em] text-balance">
              {currentDayProgram.title}
            </h1>

            <p className="text-[16px] sm:text-[18px] text-[#6F767D] leading-[26px] mt-3 max-w-2xl">
              {currentDayProgram.summary}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E5E7E8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onStartGuidedSession}
                className="h-[54px] px-6 rounded-[14px] bg-[#B7D84B] text-[#18212B] font-display font-semibold text-[16px] flex items-center justify-center gap-2 active:bg-[#a6c73f] transition-colors whitespace-nowrap shrink-0"
              >
                <Play className="w-4 h-4 fill-[#18212B]" />
                <span>Iniciar Sesión Guiada</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleDayComplete(selectedDayNumber)}
                className={`h-[54px] px-5 rounded-[14px] font-display font-semibold text-[15px] flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                  isSelectedDayDone
                    ? 'bg-[#18212B] text-[#FFFFFF]'
                    : 'bg-[#F7F7F3] text-[#18212B] hover:bg-[#E5E7E8]/60'
                }`}
              >
                <Check
                  className={`w-4 h-4 ${
                    isSelectedDayDone ? 'text-[#B7D84B]' : 'text-[#6F767D]'
                  }`}
                />
                <span>{isSelectedDayDone ? 'Día Completado' : 'Marcar Completado'}</span>
              </button>
            </div>

            <div className="text-[13px] text-[#6F767D] tabular-nums">
              Series hoy:{' '}
              <strong className="text-[#18212B]">
                {dayProgressMetrics.doneSets}/{dayProgressMetrics.totalSets}
              </strong>{' '}
              ({dayProgressMetrics.percent}%)
            </div>
          </div>
        </div>

        {/* Right Column: Scandinavian Home Studio Visual + Cycle Progress Ring */}
        <div className="lg:col-span-5 relative rounded-[16px] overflow-hidden border border-[#E5E7E8] min-h-[280px] lg:h-full bg-[#18212B]">
          <ResilientImage
            src={HERO_STUDIO_IMAGE}
            alt="Espacio minimalista de entrenamiento funcional en casa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18212B]/90 via-[#18212B]/35 to-transparent flex flex-col justify-end p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-[12px] font-semibold text-[#B7D84B] tracking-wide">
                  Ciclo Funcional en Casa
                </div>
                <div className="font-display text-[22px] font-bold text-[#FFFFFF] leading-[28px] mt-0.5 tabular-nums">
                  {completedDaysCount} de 21 Días Superados
                </div>
                <p className="text-[13px] text-[#E5E7E8] mt-1">
                  Equipamiento activo: Esterilla y Kettlebell 16 kg
                </p>
              </div>

              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="#6F767D"
                    strokeOpacity="0.4"
                    strokeWidth="5"
                    fill="transparent"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="#B7D84B"
                    strokeWidth="5"
                    strokeDasharray={`${circleCircumference} ${circleCircumference}`}
                    strokeDashoffset={
                      circleCircumference * (1 - completedDaysCount / 21)
                    }
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute font-display text-[13px] font-bold text-[#FFFFFF] tabular-nums">
                  {cyclePercentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width 4-Column Tabular KPI Strip Below Hero */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FFFFFF] border border-[#E5E7E8] rounded-[16px] p-5">
          <div className="text-[13px] text-[#6F767D]">Progreso del Plan</div>
          <div className="font-display text-[24px] font-bold text-[#18212B] tabular-nums mt-1">
            {completedDaysCount} / 21 Días
          </div>
          <div className="text-[12px] text-[#6F767D] mt-1 tabular-nums">
            Restan {21 - completedDaysCount} sesiones del bloque
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5E7E8] rounded-[16px] p-5">
          <div className="text-[13px] text-[#6F767D]">Volumen del Día {selectedDayNumber}</div>
          <div className="font-display text-[24px] font-bold text-[#18212B] tabular-nums mt-1">
            {dayProgressMetrics.totalSets} Series
          </div>
          <div className="text-[12px] text-[#6F767D] mt-1 tabular-nums">
            {exercisesCount} módulos · {dayProgressMetrics.doneSets} completadas
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5E7E8] rounded-[16px] p-5">
          <div className="text-[13px] text-[#6F767D]">Tiempo y Gasto Energético</div>
          <div className="font-display text-[24px] font-bold text-[#18212B] tabular-nums mt-1">
            {currentDayProgram.durationMin} min · {currentDayProgram.calories} kcal
          </div>
          <div className="text-[12px] text-[#6F767D] mt-1">
            Densidad: {currentDayProgram.intensity}
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5E7E8] rounded-[16px] p-5 flex flex-col justify-between">
          <div className="text-[13px] text-[#6F767D]">Disposición Biométrica</div>
          <div className="font-display text-[20px] font-bold text-[#18212B] mt-1">
            {readinessLevel === 'optimo'
              ? '100% Capacidad Óptima'
              : readinessLevel === 'moderado'
              ? 'Volumen Estándar'
              : 'Ajuste de Recuperación'}
          </div>
          <button
            type="button"
            onClick={onOpenSettings}
            className="text-[12px] font-semibold text-[#18212B] underline decoration-[#B7D84B] decoration-2 underline-offset-4 text-left mt-1 w-fit"
          >
            Calibrar fatiga y equipo
          </button>
        </div>
      </section>
    </div>
  );
};

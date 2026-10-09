import React from 'react';
import { Search, RotateCcw, ChevronRight, Check, Plus, Play } from 'lucide-react';
import { ExerciseItem, MuscleZone } from '../../data/fitnessData';
import { useExerciseLibrary } from '../../hooks/useExerciseLibrary';
import { MuscleSchematic } from '../MuscleSchematic';
import { ResilientImage } from '../ResilientImage';
import { ScreenHeader } from '../ui/ScreenHeader';
import { FirstTimeHint } from '../ui/FirstTimeHint';

interface ExerciseLibraryViewProps {
  selectedDayNumber: number;
  isExerciseInCurrentDay: (exerciseId: string) => boolean;
  onInspectExercise: (exercise: ExerciseItem) => void;
  onToggleExerciseInDay: (exerciseId: string) => void;
  onPracticeNow: (exercise: ExerciseItem) => void;
  onBackToMatrix: () => void;
}

const ZONE_TABS: { id: 'all' | MuscleZone; label: string }[] = [
  { id: 'all', label: 'Todos los Ejercicios' },
  { id: 'core', label: 'Core y Abdomen' },
  { id: 'lower', label: 'Piernas y Glúteos' },
  { id: 'upper_push', label: 'Pecho y Brazos' },
  { id: 'mobility', label: 'Movilidad y Cadera' }
];

export const ExerciseLibraryView: React.FC<ExerciseLibraryViewProps> = ({
  selectedDayNumber,
  isExerciseInCurrentDay,
  onInspectExercise,
  onToggleExerciseInDay,
  onPracticeNow,
  onBackToMatrix
}) => {
  const {
    zoneFilter,
    setZoneFilter,
    searchQuery,
    setSearchQuery,
    filteredCatalog,
    resetFilters
  } = useExerciseLibrary();

  return (
    <div className="space-y-6">
      <ScreenHeader
        title="Biblioteca"
        subtitle={`Catálogo visual de ejercicios · Personalizando Día ${selectedDayNumber}`}
        onBack={onBackToMatrix}
      />

      <FirstTimeHint
        storageKey="exercise_library"
        title="Personaliza tu rutina en un toque"
        description="Puedes tocar Practicar para iniciar el cronómetro con cualquier ejercicio de inmediato, o tocar Añadir al Día para incluirlo en tu rutina actual."
      />

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        <div className="relative w-full">
          <Search className="w-5 h-5 text-[#6F767D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            inputMode="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ej: Sentadilla, abdomen, glúteo o esterilla..."
            aria-label="Buscar ejercicio por nombre, músculo o equipo"
            className="w-full h-[54px] pl-12 pr-4 bg-[#FFFFFF] border border-[#E5E7E8] focus:border-[1.5px] focus:border-[#18212B] rounded-[14px] text-[15px] text-[#18212B] placeholder:text-[#6F767D] outline-none transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {ZONE_TABS.map((tab) => {
            const isActive = zoneFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setZoneFilter(tab.id)}
                className={`min-h-[48px] px-4 rounded-[14px] font-display text-[13px] font-semibold transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-[#EDF4D6] border-[1.5px] border-[#B7D84B] text-[#18212B]'
                    : 'bg-[#FFFFFF] border border-[#E5E7E8] text-[#6F767D] hover:text-[#18212B]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Grid or Explanatory Empty State */}
      {filteredCatalog.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E5E7E8] rounded-[16px] p-10 text-center max-w-xl mx-auto">
          <h2 className="font-display text-[18px] font-bold text-[#18212B]">
            No encontramos ejercicios para "{searchQuery || zoneFilter}"
          </h2>
          <p className="text-[14px] text-[#6F767D] mt-1.5 leading-[20px]">
            Aquí aparecerán las guías paso a paso y esquemas musculares. Borra tu búsqueda o muestra todas las zonas para volver a ver el catálogo completo.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 h-[52px] px-6 rounded-[14px] bg-[#B7D84B] text-[#18212B] font-display font-semibold text-[15px] inline-flex items-center gap-2 active:bg-[#a6c73f] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ver Todos los Ejercicios</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCatalog.map((exercise) => {
            const isIncluded = isExerciseInCurrentDay(exercise.id);

            return (
              <div
                key={exercise.id}
                className="bg-[#FFFFFF] border border-[#E5E7E8] rounded-[16px] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5E7E8]">
                    <div>
                      <div className="text-[12px] text-[#6F767D] tabular-nums">
                        Ejercicio {exercise.index} · {exercise.zoneLabel} · {exercise.equipment}
                      </div>
                      <h2 className="font-display text-[20px] font-bold text-[#18212B] leading-[26px] mt-0.5">
                        {exercise.name}
                      </h2>
                    </div>
                    <MuscleSchematic zone={exercise.zone} size="sm" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 my-4 items-center">
                    <div className="sm:col-span-5 rounded-[12px] overflow-hidden aspect-[4/3] bg-[#F7F7F3]">
                      <ResilientImage
                        src={exercise.imageUrl}
                        alt={exercise.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:col-span-7 space-y-2">
                      <p className="text-[14px] text-[#18212B] leading-[20px]">
                        {exercise.subtitle}
                      </p>
                      <div className="text-[13px] text-[#6F767D] tabular-nums">
                        <span>{exercise.sets} series × {exercise.repsOrTime}</span>
                        <span className="mx-1.5">·</span>
                        <span>Descanso {exercise.restSec}s</span>
                      </div>
                      <div className="text-[12px] text-[#6F767D]">
                        <strong className="text-[#18212B]">Músculos:</strong>{' '}
                        {exercise.primaryMuscles.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Thumb-Friendly Action Row (All >= 48px height) */}
                <div className="pt-4 border-t border-[#E5E7E8] flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={() => onInspectExercise(exercise)}
                    className="min-h-[48px] px-3.5 rounded-[12px] bg-[#F7F7F3] text-[13px] font-semibold text-[#18212B] hover:bg-[#E5E7E8]/70 flex items-center gap-1 transition-colors whitespace-nowrap"
                  >
                    <span>Ver Paso a Paso</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => onToggleExerciseInDay(exercise.id)}
                      className={`min-h-[48px] px-4 rounded-[12px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                        isIncluded
                          ? 'bg-[#EDF4D6] text-[#18212B]'
                          : 'bg-[#F7F7F3] text-[#18212B] hover:bg-[#E5E7E8]/70'
                      }`}
                    >
                      {isIncluded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>En Día {selectedDayNumber}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Añadir al Día {selectedDayNumber}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onPracticeNow(exercise)}
                      className="min-h-[48px] px-4 rounded-[12px] bg-[#B7D84B] text-[#18212B] font-display text-[13px] font-semibold flex items-center gap-1.5 active:bg-[#a6c73f] transition-colors whitespace-nowrap"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#18212B]" />
                      <span>Practicar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

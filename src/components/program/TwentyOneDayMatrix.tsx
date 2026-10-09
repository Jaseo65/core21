import React from 'react';
import { Check } from 'lucide-react';
import { TWENTY_ONE_DAY_MATRIX } from '../../data/fitnessData';

interface TwentyOneDayMatrixProps {
  selectedDayNumber: number;
  completedDays: number[];
  onSelectDay: (dayNumber: number) => void;
}

export const TwentyOneDayMatrix: React.FC<TwentyOneDayMatrixProps> = ({
  selectedDayNumber,
  completedDays,
  onSelectDay
}) => {
  return (
    <section className="pt-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7E8]">
        <div>
          <h2 className="font-display text-[22px] font-bold text-[#18212B] tracking-[-0.015em]">
            Matriz de Progresión de 21 Días
          </h2>
          <p className="text-[14px] text-[#6F767D] mt-0.5">
            Selecciona cualquier día para inspeccionar su bloque biomecánico o registrar su finalización.
          </p>
        </div>

        {/* Legend with explicit text & icon states */}
        <div className="flex flex-wrap items-center gap-4 text-[12px] font-semibold text-[#6F767D]">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-[4px] bg-[#18212B] inline-flex items-center justify-center">
              <Check className="w-3 h-3 text-[#B7D84B] stroke-[2.5]" />
            </span>
            <span>Completado</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-[4px] bg-[#EDF4D6] border-[1.5px] border-[#B7D84B] inline-block" />
            <span className="text-[#18212B]">Día Activo</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-[4px] bg-[#FFFFFF] border border-[#E5E7E8] inline-block" />
            <span>Pendiente</span>
          </span>
        </div>
      </div>

      {/* 21-Day Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2.5 mt-4">
        {TWENTY_ONE_DAY_MATRIX.map((dayItem) => {
          const isCurrent = dayItem.day === selectedDayNumber;
          const isCompleted = completedDays.includes(dayItem.day);

          let chipStyle =
            'bg-[#FFFFFF] border border-[#E5E7E8] text-[#6F767D] hover:text-[#18212B]';
          if (isCurrent) {
            chipStyle =
              'bg-[#EDF4D6] border-[1.5px] border-[#B7D84B] text-[#18212B] font-bold';
          } else if (isCompleted) {
            chipStyle =
              'bg-[#18212B] border border-[#18212B] text-[#FFFFFF] hover:opacity-95';
          }

          return (
            <button
              key={dayItem.day}
              type="button"
              onClick={() => onSelectDay(dayItem.day)}
              className={`min-h-[68px] p-3 rounded-[14px] flex flex-col justify-between text-left transition-colors ${chipStyle}`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-display text-[13px] tabular-nums">
                  Día {String(dayItem.day).padStart(2, '0')}
                </span>
                {isCompleted && (
                  <Check
                    className={`w-4 h-4 stroke-[2.5] ${
                      isCurrent ? 'text-[#18212B]' : 'text-[#B7D84B]'
                    }`}
                  />
                )}
              </div>
              <div
                className={`text-[11px] truncate w-full mt-1 ${
                  isCurrent
                    ? 'text-[#18212B] font-semibold'
                    : isCompleted
                    ? 'text-[#E5E7E8]'
                    : 'text-[#6F767D]'
                }`}
              >
                {dayItem.focusTag}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Check, AlertCircle, Calendar, Play } from 'lucide-react';
import {
  DayProgram,
  INITIAL_EQUIPMENT,
  SessionHistoryEntry
} from '../../data/fitnessData';
import { ReadinessLevel } from '../../hooks/useFitnessProgram';
import { KineticCheckbox } from '../ui/KineticCheckbox';
import { ScreenHeader } from '../ui/ScreenHeader';
import { FirstTimeHint } from '../ui/FirstTimeHint';

interface BiometricsSettingsViewProps {
  selectedDayNumber: number;
  currentDayProgram: DayProgram;
  readinessLevel: ReadinessLevel;
  targetDurationPref: number;
  enabledEquipment: Record<string, boolean>;
  sessionHistory: SessionHistoryEntry[];
  onChangeReadiness: (level: ReadinessLevel) => void;
  onChangeDurationPref: (mins: number) => void;
  onToggleEquipment: (equipmentId: string) => void;
  onAddManualLog: (durationMin: number) => void;
  onClearHistory: () => void;
  onBackToMatrix: () => void;
  onStartSession: () => void;
}

const READINESS_OPTIONS: {
  id: ReadinessLevel;
  title: string;
  desc: string;
}[] = [
  {
    id: 'optimo',
    title: 'Con Buena Energía (Rutina Completa)',
    desc: 'Te sientes descansado hoy. Se mantienen todas las series del día.'
  },
  {
    id: 'moderado',
    title: 'Energía Normal (Ritmo Tranquilo)',
    desc: 'Sensación habitual. Haz cada repetición a tu propio ritmo sin prisa.'
  },
  {
    id: 'recuperacion',
    title: 'Día Cansado (1 Serie Menos por Ejercicio)',
    desc: 'Reduce el esfuerzo un 25% automáticamente para que cumplas sin agotarte.'
  }
];

export const BiometricsSettingsView: React.FC<BiometricsSettingsViewProps> = ({
  selectedDayNumber,
  currentDayProgram,
  readinessLevel,
  targetDurationPref,
  enabledEquipment,
  sessionHistory,
  onChangeReadiness,
  onChangeDurationPref,
  onToggleEquipment,
  onAddManualLog,
  onClearHistory,
  onBackToMatrix,
  onStartSession
}) => {
  // Single-field minimal form state
  const [durationInput, setDurationInput] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = durationInput.trim();

    if (!trimmed) {
      setFormError(
        'El campo de minutos está vacío. Escribe cuántos minutos entrenaste (por ejemplo: 25) y vuelve a pulsar Guardar.'
      );
      return;
    }

    const parsed = Number(trimmed);
    if (Number.isNaN(parsed) || !Number.isInteger(parsed)) {
      setFormError(
        'Escribe únicamente números enteros sin letras ni símbolos (por ejemplo: 30).'
      );
      return;
    }

    if (parsed < 5 || parsed > 120) {
      setFormError(
        `Escribiste ${parsed} minutos. Ingresa un número entre 5 y 120 minutos para registrar una sesión válida.`
      );
      return;
    }

    setFormError(null);
    setIsSaving(true);
    window.setTimeout(() => {
      onAddManualLog(parsed);
      setDurationInput('');
      setIsSaving(false);
    }, 220);
  };

  return (
    <div className="space-y-6">
      <ScreenHeader
        title="Biometría"
        subtitle="Adapta el esfuerzo a tu energía de hoy y revisa tu historial"
        onBack={onBackToMatrix}
      />

      <FirstTimeHint
        storageKey="biometrics_settings"
        title="Tu entrenamiento se adapta a cómo te sientes"
        description="Si hoy dormiste poco o tienes cansancio muscular, elige la opción Día Cansado: la app restará automáticamente 1 serie a cada ejercicio para cuidar tu cuerpo."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 Cols: Readiness Adjuster & Home Equipment Matrix */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#FFFFFF] border border-[#E5E7E8] rounded-[16px] p-6">
            <div className="pb-4 border-b border-[#E5E7E8]">
              <h2 className="font-display text-[22px] font-bold text-[#18212B] tracking-[-0.015em]">
                ¿Cómo te sientes de energía hoy?
              </h2>
              <p className="text-[14px] text-[#6F767D] mt-1">
                Toca una opción para ajustar el número de series de tu Día {selectedDayNumber}.
              </p>
            </div>

            <div className="divide-y divide-[#E5E7E8] mt-2">
              {READINESS_OPTIONS.map((option) => {
                const checked = readinessLevel === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onChangeReadiness(option.id)}
                    className="w-full min-h-[64px] py-4 text-left flex items-start justify-between gap-4 hover:opacity-90 transition-opacity"
                  >
                    <div>
                      <div className="font-display text-[15px] font-semibold text-[#18212B]">
                        {option.title}
                      </div>
                      <div className="text-[13px] text-[#6F767D] mt-0.5">
                        {option.desc}
                      </div>
                    </div>

                    <KineticCheckbox checked={checked} className="mt-1" />
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-5 border-t border-[#E5E7E8]">
              <label className="block text-[13px] font-semibold text-[#18212B] mb-2.5">
                Tiempo disponible para entrenar hoy
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[20, 28, 40].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => onChangeDurationPref(mins)}
                    className={`h-[52px] rounded-[14px] font-display text-[15px] font-semibold tabular-nums transition-colors ${
                      targetDurationPref === mins
                        ? 'bg-[#EDF4D6] text-[#18212B]'
                        : 'bg-[#F7F7F3] text-[#6F767D] hover:text-[#18212B]'
                    }`}
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Equipment Checklist Card */}
          <div className="bg-[#FFFFFF] border border-[#E5E7E8] rounded-[16px] p-6">
            <div className="pb-4 border-b border-[#E5E7E8]">
              <h2 className="font-display text-[20px] font-bold text-[#18212B]">
                Equipo Disponible en Casa
              </h2>
              <p className="text-[14px] text-[#6F767D] mt-0.5">
                Marca las herramientas que tienes a mano hoy.
              </p>
            </div>

            <div className="divide-y divide-[#E5E7E8] mt-2">
              {INITIAL_EQUIPMENT.map((item) => {
                const isChecked = Boolean(enabledEquipment[item.id]);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onToggleEquipment(item.id)}
                    className="w-full min-h-[60px] py-4 flex items-center justify-between gap-4 text-left hover:opacity-90 transition-opacity"
                  >
                    <div>
                      <div className="font-display text-[15px] font-semibold text-[#18212B]">
                        {item.label}
                      </div>
                      <div className="text-[13px] text-[#6F767D] mt-0.5">
                        {item.detail}
                      </div>
                    </div>

                    <KineticCheckbox checked={isChecked} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Minimal 1-Field Session Logger & History with Empty State */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#FFFFFF] border border-[#E5E7E8] rounded-[16px] p-6">
            <div className="pb-4 border-b border-[#E5E7E8]">
              <h2 className="font-display text-[20px] font-bold text-[#18212B]">
                Registro Rápido de Entrenamiento
              </h2>
              <p className="text-[14px] text-[#6F767D] mt-0.5">
                Guarda los minutos que entrenaste hoy en el Día {selectedDayNumber} ({currentDayProgram.title}).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
              <div>
                <label
                  htmlFor="session-duration-input"
                  className="block text-[14px] font-semibold text-[#18212B] mb-2"
                >
                  Duración del entrenamiento (en minutos)
                </label>
                <input
                  id="session-duration-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={durationInput}
                  onChange={(e) => {
                    setDurationInput(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  placeholder="Ej: 28 (escribe un número entre 5 y 120)"
                  className="w-full h-[54px] px-4 bg-[#FFFFFF] border border-[#E5E7E8] focus:border-[1.5px] focus:border-[#18212B] rounded-[14px] text-[16px] text-[#18212B] placeholder:text-[#6F767D] tabular-nums outline-none transition-colors"
                />
              </div>

              {/* Actionable, Specific Error Message */}
              {formError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-[12px] bg-[#ffdad6] text-[#93000a] flex items-start gap-2.5 text-[13px] leading-[19px]"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="w-full h-[54px] rounded-[14px] bg-[#B7D84B] text-[#18212B] font-display font-semibold text-[16px] flex items-center justify-center gap-2 active:bg-[#a6c73f] disabled:opacity-70 transition-colors"
              >
                <Check className="w-5 h-5 stroke-[2.5]" />
                <span>
                  {isSaving
                    ? 'Guardando tu sesión...'
                    : 'Guardar Minutos en mi Historial'}
                </span>
              </button>
            </form>
          </div>

          {/* Tabular Session History Log with Complete Empty State */}
          <div className="bg-[#FFFFFF] border border-[#E5E7E8] rounded-[16px] p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7E8]">
              <div>
                <h2 className="font-display text-[20px] font-bold text-[#18212B]">
                  Tu Historial de Sesiones
                </h2>
                <p className="text-[13px] text-[#6F767D] mt-0.5 tabular-nums">
                  {sessionHistory.length === 0
                    ? 'Aún no tienes entrenamientos guardados'
                    : `${sessionHistory.length} sesiones completadas`}
                </p>
              </div>
            </div>

            {sessionHistory.length === 0 ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#EDF4D6] text-[#18212B] flex items-center justify-center mx-auto">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="max-w-sm mx-auto">
                  <h3 className="font-display text-[16px] font-bold text-[#18212B]">
                    Aquí verás cada día que entrenes
                  </h3>
                  <p className="text-[14px] text-[#6F767D] mt-1 leading-[20px]">
                    Cuando termines una rutina con el temporizador o escribas tus minutos en el cuadro de arriba, aparecerán aquí tus días, minutos y calorías.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onStartSession}
                  className="h-[50px] px-5 rounded-[14px] bg-[#B7D84B] text-[#18212B] font-display font-semibold text-[14px] inline-flex items-center gap-2 active:bg-[#a6c73f] transition-colors"
                >
                  <Play className="w-4 h-4 fill-[#18212B]" />
                  <span>Empezar mi Primera Sesión</span>
                </button>
              </div>
            ) : (
              <>
                <div className="divide-y divide-[#E5E7E8] mt-2">
                  {sessionHistory.map((entry) => (
                    <div
                      key={entry.id}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="text-[12px] text-[#6F767D] tabular-nums">
                          Día {entry.dayNumber} de 21 · {entry.dateLabel}
                        </div>
                        <div className="font-display text-[15px] font-semibold text-[#18212B] mt-0.5">
                          {entry.sessionTitle}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-[13px] text-[#6F767D] tabular-nums shrink-0">
                        <span className="font-semibold text-[#18212B]">
                          {entry.durationMin} min
                        </span>
                        <span>·</span>
                        <span>{entry.kcal} kcal</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 mt-2 border-t border-[#E5E7E8]">
                  <button
                    type="button"
                    onClick={onClearHistory}
                    className="min-h-[48px] px-4 rounded-[12px] text-[13px] font-semibold text-[#6F767D] hover:text-[#18212B] hover:bg-[#F7F7F3] transition-colors"
                  >
                    Vaciar historial de prueba
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState, useMemo, useCallback, useRef } from 'react';
import {
  EXERCISES_CATALOG,
  TWENTY_ONE_DAY_MATRIX,
  INITIAL_EQUIPMENT,
  INITIAL_HISTORY,
  ExerciseItem,
  SessionHistoryEntry
} from '../data/fitnessData';
import { soundCues } from '../utils/soundCues';

export type ActiveTab = 'program' | 'timer' | 'library' | 'settings';
export type ReadinessLevel = 'optimo' | 'moderado' | 'recuperacion';

export function useFitnessProgram() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('program');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(12);

  // Completed Days in the 21-Day Matrix (Days 1..11 completed by default)
  const [completedDays, setCompletedDays] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  ]);

  // Custom exercise overrides per day
  const [customDayExerciseIds, setCustomDayExerciseIds] = useState<Record<number, string[]>>({});

  // Active exercise index within the selected day
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);

  // Set completion tracking map: key = `${dayNumber}-${exerciseId}`, value = boolean[]
  const [completedSetsByDay, setCompletedSetsByDay] = useState<Record<string, boolean[]>>({
    '12-ex-plank-hollow': [true, true, false],
    '12-ex-goblet-squat': [true, false, false, false]
  });

  // Exercise Detail Modal state
  const [inspectedExercise, setInspectedExercise] = useState<ExerciseItem | null>(null);

  // Biometrics, Readiness & Equipment State
  const [readinessLevel, setReadinessLevel] = useState<ReadinessLevel>('optimo');
  const [targetDurationPref, setTargetDurationPref] = useState<number>(28);
  const [enabledEquipment, setEnabledEquipment] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    INITIAL_EQUIPMENT.forEach((item) => {
      map[item.id] = item.enabledByDefault;
    });
    return map;
  });

  // Session History Log State
  const [sessionHistory, setSessionHistory] = useState<SessionHistoryEntry[]>(INITIAL_HISTORY);

  // Visual Feedback Toast State
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const feedbackTimeoutRef = useRef<number | null>(null);

  const triggerFeedback = useCallback((msg: string) => {
    setFeedbackMessage(msg);
    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current);
    }
    feedbackTimeoutRef.current = window.setTimeout(() => {
      setFeedbackMessage(null);
    }, 2600);
  }, []);

  // Current Day Program Object
  const currentDayProgram = useMemo(() => {
    return (
      TWENTY_ONE_DAY_MATRIX.find((d) => d.day === selectedDayNumber) ||
      TWENTY_ONE_DAY_MATRIX[11]
    );
  }, [selectedDayNumber]);

  // Exercises for the Selected Day (adjusted by readiness modifier if needed)
  const currentDayExercises = useMemo(() => {
    const ids = customDayExerciseIds[selectedDayNumber] || currentDayProgram.exerciseIds;
    const baseList = ids
      .map((id) => EXERCISES_CATALOG.find((ex) => ex.id === id))
      .filter((ex): ex is ExerciseItem => Boolean(ex));

    const setsDelta = readinessLevel === 'recuperacion' ? -1 : 0;

    return baseList.map((ex, idx) => ({
      ...ex,
      index: String(idx + 1).padStart(2, '0'),
      sets: Math.max(2, ex.sets + setsDelta)
    }));
  }, [selectedDayNumber, customDayExerciseIds, currentDayProgram, readinessLevel]);

  // Normalized completedSetsMap for the active day
  const currentDaySetsMap = useMemo(() => {
    const result: Record<string, boolean[]> = {};
    currentDayExercises.forEach((ex) => {
      const key = `${selectedDayNumber}-${ex.id}`;
      const existing = completedSetsByDay[key];
      result[ex.id] = Array.from({ length: ex.sets }, (_, i) =>
        existing && existing[i] !== undefined ? existing[i] : false
      );
    });
    return result;
  }, [currentDayExercises, completedSetsByDay, selectedDayNumber]);

  // Calculate Day Progress Metrics
  const dayProgressMetrics = useMemo(() => {
    let totalSets = 0;
    let doneSets = 0;
    currentDayExercises.forEach((ex) => {
      const arr = currentDaySetsMap[ex.id] || [];
      totalSets += ex.sets;
      doneSets += arr.filter(Boolean).length;
    });
    const percent = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0;
    return { totalSets, doneSets, percent };
  }, [currentDayExercises, currentDaySetsMap]);

  const handleSelectDay = useCallback(
    (dayNum: number) => {
      setSelectedDayNumber(dayNum);
      setActiveExerciseIndex(0);
      triggerFeedback(`Día ${dayNum} seleccionado`);
    },
    [triggerFeedback]
  );

  const handleToggleSet = useCallback(
    (exerciseId: string, setIndex: number) => {
      const key = `${selectedDayNumber}-${exerciseId}`;
      const exerciseObj = currentDayExercises.find((e) => e.id === exerciseId);
      const totalSets = exerciseObj ? exerciseObj.sets : 3;

      setCompletedSetsByDay((prev) => {
        const currentArr = prev[key] || Array.from({ length: totalSets }, () => false);
        const nextArr = [...currentArr];
        const nextVal = !nextArr[setIndex];
        nextArr[setIndex] = nextVal;
        triggerFeedback(
          nextVal
            ? `Serie ${setIndex + 1} guardada como completada`
            : `Serie ${setIndex + 1} desmarcada`
        );
        return {
          ...prev,
          [key]: nextArr
        };
      });
    },
    [selectedDayNumber, currentDayExercises, triggerFeedback]
  );

  const handleToggleDayComplete = useCallback(
    (dayNum: number) => {
      soundCues.playCompleteChord();
      setCompletedDays((prev) => {
        const exists = prev.includes(dayNum);
        triggerFeedback(
          exists
            ? `Día ${dayNum} marcado como pendiente`
            : `¡Día ${dayNum} registrado como completado!`
        );
        return exists ? prev.filter((d) => d !== dayNum) : [...prev, dayNum];
      });
    },
    [triggerFeedback]
  );

  const handleCompleteCurrentDaySession = useCallback(() => {
    soundCues.playCompleteChord();
    setCompletedDays((prev) =>
      prev.includes(selectedDayNumber) ? prev : [...prev, selectedDayNumber]
    );

    const updates: Record<string, boolean[]> = {};
    currentDayExercises.forEach((ex) => {
      updates[`${selectedDayNumber}-${ex.id}`] = Array.from(
        { length: ex.sets },
        () => true
      );
    });
    setCompletedSetsByDay((prev) => ({ ...prev, ...updates }));

    const newEntry: SessionHistoryEntry = {
      id: `hist-${Date.now()}`,
      dayNumber: selectedDayNumber,
      dateLabel: 'Hoy · Completado',
      sessionTitle: currentDayProgram.title,
      durationMin: currentDayProgram.durationMin,
      kcal: currentDayProgram.calories,
      rpe: 7,
      completedSets: dayProgressMetrics.totalSets,
      totalSets: dayProgressMetrics.totalSets
    };
    setSessionHistory((prev) => [newEntry, ...prev]);
    triggerFeedback(`¡Sesión del Día ${selectedDayNumber} finalizada y guardada!`);
  }, [
    selectedDayNumber,
    currentDayExercises,
    currentDayProgram,
    dayProgressMetrics.totalSets,
    triggerFeedback
  ]);

  const handleToggleExerciseInCurrentDay = useCallback(
    (exerciseId: string) => {
      const currentIds =
        customDayExerciseIds[selectedDayNumber] || currentDayProgram.exerciseIds;
      const exists = currentIds.includes(exerciseId);

      if (exists && currentIds.length <= 1) {
        triggerFeedback('Cada día debe conservar al menos 1 ejercicio activo');
        return;
      }

      const nextIds = exists
        ? currentIds.filter((id) => id !== exerciseId)
        : [...currentIds, exerciseId];

      setCustomDayExerciseIds((prev) => ({
        ...prev,
        [selectedDayNumber]: nextIds
      }));
      triggerFeedback(
        exists
          ? `Ejercicio retirado del Día ${selectedDayNumber}`
          : `Ejercicio añadido al Día ${selectedDayNumber}`
      );
    },
    [customDayExerciseIds, selectedDayNumber, currentDayProgram.exerciseIds, triggerFeedback]
  );

  const handlePracticeExerciseNow = useCallback(
    (exercise: ExerciseItem) => {
      const currentIds =
        customDayExerciseIds[selectedDayNumber] || currentDayProgram.exerciseIds;
      let idx = currentIds.indexOf(exercise.id);
      if (idx === -1) {
        const updated = [...currentIds, exercise.id];
        setCustomDayExerciseIds((prev) => ({
          ...prev,
          [selectedDayNumber]: updated
        }));
        idx = updated.length - 1;
      }
      setActiveExerciseIndex(idx);
      setActiveTab('timer');
      triggerFeedback(`Listo para practicar: ${exercise.name}`);
    },
    [customDayExerciseIds, selectedDayNumber, currentDayProgram.exerciseIds, triggerFeedback]
  );

  const handleChangeReadiness = useCallback(
    (level: ReadinessLevel) => {
      setReadinessLevel(level);
      const label =
        level === 'optimo'
          ? 'Volumen al 100% activado'
          : level === 'moderado'
          ? 'Ritmo estándar activado'
          : 'Modo recuperación activado (-1 serie por ejercicio)';
      triggerFeedback(label);
    },
    [triggerFeedback]
  );

  const handleChangeDurationPref = useCallback(
    (mins: number) => {
      setTargetDurationPref(mins);
      triggerFeedback(`Meta de tiempo ajustada a ${mins} minutos`);
    },
    [triggerFeedback]
  );

  const handleToggleEquipment = useCallback(
    (equipmentId: string) => {
      setEnabledEquipment((prev) => {
        const nextVal = !prev[equipmentId];
        triggerFeedback(nextVal ? 'Equipo activado en tu inventario' : 'Equipo desactivado');
        return {
          ...prev,
          [equipmentId]: nextVal
        };
      });
    },
    [triggerFeedback]
  );

  const handleAddManualLog = useCallback(
    (durationMinutes: number) => {
      const dur = Math.max(5, Math.min(120, durationMinutes));
      const entry: SessionHistoryEntry = {
        id: `hist-${Date.now()}`,
        dayNumber: selectedDayNumber,
        dateLabel: 'Registro Manual · Hoy',
        sessionTitle: currentDayProgram.title,
        durationMin: dur,
        kcal: Math.round(dur * 11.5),
        rpe: 7,
        completedSets: dayProgressMetrics.doneSets || dayProgressMetrics.totalSets,
        totalSets: dayProgressMetrics.totalSets
      };
      setSessionHistory((prev) => [entry, ...prev]);
      triggerFeedback(`Sesión de ${dur} min guardada en tu historial`);
    },
    [selectedDayNumber, currentDayProgram.title, dayProgressMetrics, triggerFeedback]
  );

  const handleClearHistory = useCallback(() => {
    setSessionHistory([]);
    triggerFeedback('Historial de sesiones vaciado');
  }, [triggerFeedback]);

  const isExerciseInCurrentDay = useCallback(
    (exerciseId: string) => {
      const currentIds =
        customDayExerciseIds[selectedDayNumber] || currentDayProgram.exerciseIds;
      return currentIds.includes(exerciseId);
    },
    [customDayExerciseIds, selectedDayNumber, currentDayProgram.exerciseIds]
  );

  const isSelectedDayDone = completedDays.includes(selectedDayNumber);
  const cyclePercentage = Math.round((completedDays.length / 21) * 100);

  return {
    activeTab,
    setActiveTab,
    selectedDayNumber,
    completedDays,
    activeExerciseIndex,
    setActiveExerciseIndex,
    inspectedExercise,
    setInspectedExercise,
    readinessLevel,
    handleChangeReadiness,
    targetDurationPref,
    handleChangeDurationPref,
    enabledEquipment,
    sessionHistory,
    feedbackMessage,
    currentDayProgram,
    currentDayExercises,
    currentDaySetsMap,
    dayProgressMetrics,
    isSelectedDayDone,
    cyclePercentage,
    handleSelectDay,
    handleToggleSet,
    handleToggleDayComplete,
    handleCompleteCurrentDaySession,
    handleToggleExerciseInCurrentDay,
    handlePracticeExerciseNow,
    handleToggleEquipment,
    handleAddManualLog,
    handleClearHistory,
    isExerciseInCurrentDay
  };
}

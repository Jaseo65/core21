import { useState, useEffect, useCallback } from 'react';
import { ExerciseItem } from '../data/fitnessData';
import { soundCues } from '../utils/soundCues';

interface UseWorkoutTimerParams {
  currentExercise: ExerciseItem | undefined;
  exercisesCount: number;
  activeExerciseIndex: number;
  onSelectExerciseIndex: (index: number) => void;
  completedSetsMap: Record<string, boolean[]>;
  onToggleSet: (exerciseId: string, setIndex: number) => void;
  onCompleteDaySession: () => void;
}

export function useWorkoutTimer({
  currentExercise,
  exercisesCount,
  activeExerciseIndex,
  onSelectExerciseIndex,
  completedSetsMap,
  onToggleSet,
  onCompleteDaySession
}: UseWorkoutTimerParams) {
  const [phase, setPhase] = useState<'work' | 'rest'>('work');
  const [totalSeconds, setTotalSeconds] = useState<number>(currentExercise?.durationSec || 45);
  const [secondsLeft, setSecondsLeft] = useState<number>(currentExercise?.durationSec || 45);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync timer state whenever the active exercise changes
  useEffect(() => {
    if (!currentExercise) return;
    setIsRunning(false);
    setPhase('work');
    setTotalSeconds(currentExercise.durationSec);
    setSecondsLeft(currentExercise.durationSec);
  }, [currentExercise]);

  const switchPhase = useCallback(
    (targetPhase: 'work' | 'rest') => {
      if (!currentExercise) return;
      setIsRunning(false);
      setPhase(targetPhase);
      const nextDuration =
        targetPhase === 'work' ? currentExercise.durationSec : currentExercise.restSec;
      setTotalSeconds(nextDuration);
      setSecondsLeft(nextDuration);
    },
    [currentExercise]
  );

  // Interval countdown effect
  useEffect(() => {
    if (!isRunning || !currentExercise) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (soundEnabled) {
            soundCues.playCompleteChord();
          }
          if (phase === 'work') {
            const currentSets = completedSetsMap[currentExercise.id] || [];
            const nextUnchecked = currentSets.findIndex((s) => !s);
            if (nextUnchecked !== -1) {
              onToggleSet(currentExercise.id, nextUnchecked);
            }
            setPhase('rest');
            setTotalSeconds(currentExercise.restSec);
            return currentExercise.restSec;
          } else {
            setIsRunning(false);
            setPhase('work');
            setTotalSeconds(currentExercise.durationSec);
            return currentExercise.durationSec;
          }
        }

        if (prev <= 4 && soundEnabled) {
          soundCues.playTick(660, 55);
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, phase, currentExercise, soundEnabled, completedSetsMap, onToggleSet]);

  const adjustTime = useCallback(
    (delta: number) => {
      setSecondsLeft((prev) => {
        const updated = Math.max(5, Math.min(300, prev + delta));
        if (updated > totalSeconds) {
          setTotalSeconds(updated);
        }
        return updated;
      });
    },
    [totalSeconds]
  );

  const resetTimer = useCallback(() => {
    if (!currentExercise) return;
    setIsRunning(false);
    const resetVal =
      phase === 'work' ? currentExercise.durationSec : currentExercise.restSec;
    setTotalSeconds(resetVal);
    setSecondsLeft(resetVal);
  }, [currentExercise, phase]);

  const toggleRunning = useCallback(() => {
    if (!isRunning && soundEnabled) {
      soundCues.playTick(520, 50);
    }
    setIsRunning((prev) => !prev);
  }, [isRunning, soundEnabled]);

  const handleCompleteCurrentSet = useCallback(() => {
    if (!currentExercise) return;
    if (soundEnabled) {
      soundCues.playCompleteChord();
    }
    const setsState =
      completedSetsMap[currentExercise.id] ||
      Array.from({ length: currentExercise.sets }, () => false);
    const nextUnchecked = setsState.findIndex((s) => !s);

    if (nextUnchecked !== -1) {
      onToggleSet(currentExercise.id, nextUnchecked);
      if (nextUnchecked + 1 < setsState.length) {
        setPhase('rest');
        setTotalSeconds(currentExercise.restSec);
        setSecondsLeft(currentExercise.restSec);
        setIsRunning(true);
      } else if (activeExerciseIndex + 1 < exercisesCount) {
        onSelectExerciseIndex(activeExerciseIndex + 1);
      }
    } else if (activeExerciseIndex + 1 < exercisesCount) {
      onSelectExerciseIndex(activeExerciseIndex + 1);
    } else {
      onCompleteDaySession();
    }
  }, [
    currentExercise,
    soundEnabled,
    completedSetsMap,
    onToggleSet,
    activeExerciseIndex,
    exercisesCount,
    onSelectExerciseIndex,
    onCompleteDaySession
  ]);

  return {
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
  };
}

export function formatTimerSeconds(secs: number): string {
  const mins = Math.floor(secs / 60);
  const rem = secs % 60;
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

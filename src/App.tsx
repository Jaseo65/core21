/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useFitnessProgram } from './hooks/useFitnessProgram';
import { TopNavBar } from './components/layout/TopNavBar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { ProgramDashboardView } from './components/views/ProgramDashboardView';
import { ActiveSessionView } from './components/views/ActiveSessionView';
import { ExerciseLibraryView } from './components/views/ExerciseLibraryView';
import { BiometricsSettingsView } from './components/views/BiometricsSettingsView';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { OfflineNotice } from './components/ui/OfflineNotice';
import { ActionFeedbackToast } from './components/ui/ActionFeedbackToast';

export default function App() {
  const {
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
  } = useFitnessProgram();

  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#18212B] pb-24 md:pb-16">
      <OfflineNotice />

      <TopNavBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        selectedDayNumber={selectedDayNumber}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {activeTab === 'program' && (
          <ProgramDashboardView
            currentDayProgram={currentDayProgram}
            selectedDayNumber={selectedDayNumber}
            completedDays={completedDays}
            cyclePercentage={cyclePercentage}
            isSelectedDayDone={isSelectedDayDone}
            dayProgressMetrics={dayProgressMetrics}
            currentDayExercises={currentDayExercises}
            currentDaySetsMap={currentDaySetsMap}
            activeExerciseIndex={activeExerciseIndex}
            readinessLevel={readinessLevel}
            onSelectDay={handleSelectDay}
            onSelectExerciseIndex={setActiveExerciseIndex}
            onToggleSet={handleToggleSet}
            onToggleDayComplete={handleToggleDayComplete}
            onCompleteDaySession={handleCompleteCurrentDaySession}
            onInspectExercise={setInspectedExercise}
            onNavigateToTimer={() => setActiveTab('timer')}
            onNavigateToLibrary={() => setActiveTab('library')}
            onNavigateToSettings={() => setActiveTab('settings')}
          />
        )}

        {activeTab === 'timer' && (
          <ActiveSessionView
            selectedDayNumber={selectedDayNumber}
            currentDayProgram={currentDayProgram}
            currentDayExercises={currentDayExercises}
            currentDaySetsMap={currentDaySetsMap}
            activeExerciseIndex={activeExerciseIndex}
            isSelectedDayDone={isSelectedDayDone}
            onSelectExerciseIndex={setActiveExerciseIndex}
            onToggleSet={handleToggleSet}
            onCompleteDaySession={handleCompleteCurrentDaySession}
            onBackToMatrix={() => setActiveTab('program')}
          />
        )}

        {activeTab === 'library' && (
          <ExerciseLibraryView
            selectedDayNumber={selectedDayNumber}
            isExerciseInCurrentDay={isExerciseInCurrentDay}
            onInspectExercise={setInspectedExercise}
            onToggleExerciseInDay={handleToggleExerciseInCurrentDay}
            onPracticeNow={handlePracticeExerciseNow}
            onBackToMatrix={() => setActiveTab('program')}
          />
        )}

        {activeTab === 'settings' && (
          <BiometricsSettingsView
            selectedDayNumber={selectedDayNumber}
            currentDayProgram={currentDayProgram}
            readinessLevel={readinessLevel}
            targetDurationPref={targetDurationPref}
            enabledEquipment={enabledEquipment}
            sessionHistory={sessionHistory}
            onChangeReadiness={handleChangeReadiness}
            onChangeDurationPref={handleChangeDurationPref}
            onToggleEquipment={handleToggleEquipment}
            onAddManualLog={handleAddManualLog}
            onClearHistory={handleClearHistory}
            onBackToMatrix={() => setActiveTab('program')}
            onStartSession={() => setActiveTab('timer')}
          />
        )}
      </main>

      <MobileBottomNav activeTab={activeTab} onSelectTab={setActiveTab} />

      <ActionFeedbackToast message={feedbackMessage} />

      <ExerciseDetailModal
        exercise={inspectedExercise}
        onClose={() => setInspectedExercise(null)}
        onPracticeNow={handlePracticeExerciseNow}
        onToggleInCurrentDay={handleToggleExerciseInCurrentDay}
        isInCurrentDay={
          inspectedExercise ? isExerciseInCurrentDay(inspectedExercise.id) : false
        }
      />
    </div>
  );
}

import React from 'react';
import { Calendar, Timer, BookOpen, SlidersHorizontal } from 'lucide-react';
import { ActiveTab } from '../../hooks/useFitnessProgram';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

const MOBILE_TABS: {
  id: ActiveTab;
  label: string;
  Icon: React.FC<{ className?: string }>;
}[] = [
  { id: 'program', label: 'Programa 21D', Icon: Calendar },
  { id: 'timer', label: 'Sesión Activa', Icon: Timer },
  { id: 'library', label: 'Biblioteca', Icon: BookOpen },
  { id: 'settings', label: 'Biometría', Icon: SlidersHorizontal }
];

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab
}) => {
  return (
    <nav
      aria-label="Navegación principal móvil"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF] border-t border-[#E5E7E8] grid grid-cols-4 items-center h-16 px-1.5"
    >
      {MOBILE_TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelectTab(id)}
            className={`min-h-[48px] flex flex-col items-center justify-center rounded-[10px] transition-colors ${
              isActive
                ? 'bg-[#EDF4D6] text-[#18212B] font-bold'
                : 'text-[#6F767D]'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[11px] mt-0.5 truncate max-w-full px-1">
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

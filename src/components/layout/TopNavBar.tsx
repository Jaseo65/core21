import React from 'react';
import { Play } from 'lucide-react';
import { ActiveTab } from '../../hooks/useFitnessProgram';

interface TopNavBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  selectedDayNumber: number;
}

const NAV_ITEMS: { id: ActiveTab; label: string }[] = [
  { id: 'program', label: 'Programa 21D' },
  { id: 'timer', label: 'Sesión Activa' },
  { id: 'library', label: 'Biblioteca' },
  { id: 'settings', label: 'Biometría' }
];

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activeTab,
  onSelectTab,
  selectedDayNumber
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FFFFFF] border-b border-[#E5E7E8]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 h-[64px]">
        {/* Zone 1: Brand Title */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('program');
          }}
          className="font-display text-[20px] font-bold tracking-[-0.02em] text-[#18212B] whitespace-nowrap shrink-0"
        >
          Kinetic Clarity
        </a>

        {/* Zone 2: 4 Concise Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-[#6F767D]">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === item.id
                  ? 'text-[#18212B] font-semibold underline decoration-[#B7D84B] decoration-2 underline-offset-8'
                  : 'hover:text-[#18212B]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 Primary High-Kinetic Action Button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onSelectTab(activeTab === 'timer' ? 'program' : 'timer')}
            className="h-[44px] px-4 rounded-[14px] bg-[#B7D84B] text-[#18212B] font-display font-semibold text-[14px] flex items-center gap-2 active:bg-[#a6c73f] transition-colors whitespace-nowrap shrink-0"
          >
            <Play className="w-4 h-4 fill-[#18212B]" />
            <span>
              {activeTab === 'timer'
                ? `Ver Matriz Día ${selectedDayNumber}`
                : `Entrenar Día ${selectedDayNumber}`}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

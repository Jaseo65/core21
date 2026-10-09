import { useState, useMemo, useCallback } from 'react';
import { EXERCISES_CATALOG, MuscleZone } from '../data/fitnessData';

export function useExerciseLibrary() {
  const [zoneFilter, setZoneFilter] = useState<'all' | MuscleZone>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCatalog = useMemo(() => {
    return EXERCISES_CATALOG.filter((ex) => {
      const matchesZone = zoneFilter === 'all' || ex.zone === zoneFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        ex.name.toLowerCase().includes(q) ||
        ex.subtitle.toLowerCase().includes(q) ||
        ex.primaryMuscles.some((m) => m.toLowerCase().includes(q)) ||
        ex.equipment.toLowerCase().includes(q);
      return matchesZone && matchesQuery;
    });
  }, [zoneFilter, searchQuery]);

  const resetFilters = useCallback(() => {
    setZoneFilter('all');
    setSearchQuery('');
  }, []);

  return {
    zoneFilter,
    setZoneFilter,
    searchQuery,
    setSearchQuery,
    filteredCatalog,
    resetFilters
  };
}

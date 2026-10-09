import React from 'react';
import { WifiOff } from 'lucide-react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

export const OfflineNotice: React.FC = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-[#EDF4D6] border-b border-[#B7D84B] px-4 py-3 text-[#18212B]"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-3 text-[14px]">
        <WifiOff className="w-5 h-5 text-[#18212B] shrink-0" />
        <p className="font-medium">
          <strong>Modo sin conexión activo:</strong> No tienes internet en este momento, pero puedes seguir usando el temporizador, consultar tus ejercicios y guardar tus series con normalidad.
        </p>
      </div>
    </div>
  );
};

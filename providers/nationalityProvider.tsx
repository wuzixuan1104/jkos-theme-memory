import { useCallback, useState, useMemo } from 'react'
import { NationalityContext, INationalityData } from '@/data/storage'

interface INationalityProviderProps {
  children: React.ReactNode;
}

export function NationalityProvider({ children }: INationalityProviderProps) {
  const [data, setData] = useState<INationalityData[]>([]);

  const updateData = useCallback((newData: INationalityData[]) => {
    setData(newData);
  }, []);

  const contextData = useMemo(() => {
    return {
      updateData,
      data,
    };
  }, [updateData, data]);

  return (
    <NationalityContext.Provider value={contextData}>
      {children}
    </NationalityContext.Provider>
  );
}
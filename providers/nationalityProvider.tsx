import { useCallback, useState, useMemo } from 'react'
import { NationalityContext } from '@/data/storage'

interface INationalityProviderProps {
  children: React.ReactNode;
}

export function NationalityProvider({ children }: INationalityProviderProps) {
  const [keyword, setKeyword] = useState('');

  const updateKeyword = useCallback((newKeyword: string) => {
    setKeyword(newKeyword);
  }, []);
  
  const contextData = useMemo(() => {
    return {
      updateKeyword,
      keyword,
    };
  }, [updateKeyword, keyword]);

  return (
    <NationalityContext.Provider value={contextData}>
      {children}
    </NationalityContext.Provider>
  );
}
import { Context, useContext } from 'react'

export function useStorage<T>(assignContext: Context<T>) {
  const contextData = useContext(assignContext);

  if (contextData === undefined) {
    throw new Error('contextData is empty');
  }

  return contextData;
}
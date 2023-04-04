import React from 'react'

export interface INationalityContextData {
  updateKeyword: (keyword: string) => void,
  keyword: string,
}

export const NationalityContext = React.createContext<INationalityContextData | undefined>(undefined);

import React from 'react'

export interface INationalityData {
  ID: number;
  Name: string;
  NationalCode: string;
}

export interface INationalityContextData {
  updateData: (data: INationalityData[]) => void,
  data: INationalityData[]
}

export const NationalityContext = React.createContext<INationalityContextData | undefined>(undefined);

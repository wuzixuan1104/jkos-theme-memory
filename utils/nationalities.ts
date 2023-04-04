import nationalitiesJson from '@/public/nationality.json'
import { INationalityPageProps, INationalityData } from '@/data/typing'
import { chunks } from '@/utils/chunks'

export const nationalitiesOfKeyword = (words: string): INationalityData[] => {
  return nationalitiesJson.filter((v) => 
      Object.values(v).join('/').toLowerCase().includes(words.toString().toLowerCase()))
}

export const nationalitiesOfPage = (data: INationalityData[], config?: INationalityPageProps) => {
  if (!config) return data
  const { current, limit } = config

  const chkData = chunks<INationalityData>(data, limit)
  
  let result = null;
  for (let i = 0; i < (current || 1); i++) {
    result = chkData.next();
  }

  return result && result.value || data;
}
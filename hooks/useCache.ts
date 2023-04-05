import { INationalityData, INationalityPageProps } from '@/data/typing'

interface CacheParamsProps {
  page: INationalityPageProps,
  keyword: string
}


interface CacheSetParamsProps extends CacheParamsProps{
  data: INationalityData[],
}

/**
 * {
 *    {keyword}:{current}:{limit}: {
 *      next: '',
 *      prev: '',
 *    } 
 * } 
 */

let memorySearch = new Map()
let garbage = [];

export function useCache() {
  const set = ({ keyword, page, data }: CacheSetParamsProps) => {
    const { current, limit } = page
    const key = `${keyword}:${current}:${limit}`
    memorySearch.set(key, data)
    garbage.push(new Array(1000000).fill("garbabe"));
  }

  const get = ({ keyword, page }: CacheParamsProps) => {
    const { current, limit } = page
    const key = `${keyword}:${current}:${limit}`
    return memorySearch.get(key)
  }
  const deleteAll = () => {
    console.log('Cache delete');
    memorySearch.clear()
    garbage = []
  }

  return { set, get, deleteAll };
}
import Card from '@/components/Card'
import { NationalityContext } from '@/data/storage'
import { useStorage } from '@/hooks/useStorage'
import { useEffect, useState, useRef, useReducer } from 'react'
import { INationalityPageProps, INationalityData } from '@/data/typing'
import { useObserver } from '@/hooks/useObserver'
import { uniqObjectArray } from '@/utils/uniques'
import { getNationalitiesApi } from '@/api/getNationalitiesApi'
import { v4 as uuidv4 } from 'uuid';
import { useCache } from '@/hooks/useCache'

const INITIAL_PAGE = {
  current: 0,
  limit: 30
}

let requestId: string = ''
let prevKeyword: string = ''
let timer: any = null

export default function NationalList() {
  const { keyword } = useStorage(NationalityContext)
  const canseemeRef = useRef<HTMLDivElement | null>(null)
  
  const [loading, setLoading] = useState(false)
  const [forceCheck, setForceCheck] = useReducer(() => new Date().getTime(), 0)
  const [page, setPage] = useState<INationalityPageProps>(INITIAL_PAGE)
  const [list, setList] = useState<INationalityData[]>([])

  const cache = useCache()

  const handleNextPage = () => !loading && setPage(prev => ({ ...prev, current: prev.current + 1}))

  const { createObserver } = useObserver({
    onView: handleNextPage
  })

  useEffect(() => {
    // 每秒檢查 keyword 是否改變, 被動檢查 keyword
    timer = setInterval(() => {
      setForceCheck() // react 18 fixed
      let a = garbageClosure()
      
      setTimeout(() => {
        a()
      }, 3000)

      console.log('[Interval check]');
    }, 500)

    return () => {
      console.log('Component is unmounted');
      cache.deleteAll()
      timer && clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (prevKeyword !== keyword) resetPageList()
    prevKeyword = keyword
  }, [forceCheck])


  useEffect(() => {
    setLoading(true)
    handleOnUpdate()
  }, [page])


  useEffect(() => {
    if (canseemeRef.current) 
      createObserver(canseemeRef.current);
  }, [canseemeRef])

  const garbageClosure = () => {
    return function () {
    const a = new Array(1000000).fill("garbabe");

      console.log('garbageClosure', a);
    }
  }

  const handleOnUpdate = async (): Promise<void> => {
    requestId = uuidv4()
    const cacheData = cache.get({ page, keyword })

    if (!cacheData) {
      const { requestId: originalReqId , response } = await getNationalitiesApi({ page, keyword, requestId })
      cache.set({ page, keyword, data: response })
      if (originalReqId !== requestId) return
    }
    
    setList(prev => uniqObjectArray<INationalityData>([ ...prev, ...cache.get({ page, keyword })], 'ID'))
    setLoading(false)
  }

  const resetPageList = () => {
    setPage(INITIAL_PAGE)
    setList([])

    if (page.current === INITIAL_PAGE.current) 
      handleOnUpdate()
  }

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-5 py-14">
      {list && list.map((val: INationalityData, key: number) => 
        <Card 
          key={key} 
          num={key + 1}
          nationalityId={val.ID} 
          nationalName={val.Name} 
          nationalCode={val.NationalCode} 
        />
      )}
      <div ref={canseemeRef}>-- you can not see me 👀 --</div>
    </div>
  )
}

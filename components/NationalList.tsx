import Card from '@/components/Card'
import { NationalityContext } from '@/data/storage'
import { useStorage } from '@/hooks/useStorage'
import { useEffect, useState, useRef, useReducer } from 'react'
import { INationalityPageProps, INationalityData } from '@/data/typing'
import { nationalitiesOfKeyword, nationalitiesOfPage } from '@/utils/nationalities' 
import { useObserver } from '@/hooks/useObserver'
import { uniqObjectArray } from '@/utils/uniques'

const INITIAL_PAGE = {
  current: 0,
  limit: 30
}

export default function NationalList() {
  const { keyword } = useStorage(NationalityContext)
  const canseemeRef = useRef<HTMLDivElement | null>(null)
  
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState<INationalityPageProps>(INITIAL_PAGE)
  const [list, setList] = useState<INationalityData[]>([])

  const handleNextPage = () => !loading && setPage(prev => ({ ...prev, current: prev.current + 1}))

  const { createObserver } = useObserver({
    onView: handleNextPage
  })

  useEffect(() => {
    setLoading(true)
    handleOnUpdate(keyword)
  }, [page])


  useEffect(() => {
    if (canseemeRef.current) 
      createObserver(canseemeRef.current);
  }, [canseemeRef])


  useEffect(() => {
    resetPageList()
  }, [keyword])

  const handleOnUpdate = (words: string) => {
    const dataInPage = (source: INationalityData[]) => nationalitiesOfPage(source, page)
    setList(prev => uniqObjectArray<INationalityData>([ ...prev, ...dataInPage(nationalitiesOfKeyword(words))], 'ID'))
    setLoading(false)
  }

  const resetPageList = () => {
    setPage(INITIAL_PAGE)
    setList([])
    if (page.current === INITIAL_PAGE.current) 
      handleOnUpdate(keyword)
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

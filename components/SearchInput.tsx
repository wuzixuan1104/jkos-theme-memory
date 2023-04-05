import { useStorage } from '@/hooks/useStorage'
import { NationalityContext } from '@/data/storage'
import { useEffect } from 'react'


export default function SearchInput() {
  const { updateKeyword } = useStorage(NationalityContext)

  useEffect(() => {
    return () => {
      updateKeyword('')
    }
  }, [])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateKeyword(e.target.value)
  }


  return (
    <form id="searchForm" action="#">
      <input 
        type="text"  
        placeholder="Search ..." 
        autoComplete="off"
        onChange={handleOnChange}
      />
    </form>
  )
}

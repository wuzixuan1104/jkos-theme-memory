import nationalitiesJson from '@/public/nationality.json'
import { useEffect, useState } from 'react'
import { useStorage } from '@/hooks/useStorage'
import { NationalityContext } from '@/data/storage'

export default function SearchInput() {
  const [keyword, setKeyword] = useState<String>('')
  const { updateData } = useStorage(NationalityContext)

  useEffect(() => {
    handleOnUpdate()
  }, [keyword])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleOnUpdate = () => {
    const filterNationalities = nationalitiesJson.filter((v) => 
      Object.values(v).join('/').toLowerCase().includes(keyword.toString().toLowerCase()))
    updateData(filterNationalities)
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

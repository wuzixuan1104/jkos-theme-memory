import Card from '@/components/Card'
import { NationalityContext } from '@/data/storage'
import { useStorage } from '@/hooks/useStorage'

export default function NationalList() {
  const { data } = useStorage(NationalityContext)
  
  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-5 py-14">
      {data && data.map((v, k) => 
        <Card 
          key={k} 
          num={k + 1}
          nationalityId={v.ID} 
          nationalName={v.Name} 
          nationalCode={v.NationalCode} 
        />
      )}
    </div>
  )
}

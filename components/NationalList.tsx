import Card from '@/components/Card'

const nums = Array(5).fill(1)

export default function NationalList() {
  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-5">
      {nums && nums.map((v) => <Card key={v} />)}
    </div>
  )
}

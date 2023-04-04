
import SearchInput from '@/components/SearchInput'

export default function NavigationBar() {
  return (
    <div className="flex items-center justify-center w-full h-28 gap-20 border-b border-[var(--border1)]">
      <h1 className="text-3xl">National Search</h1>
      <SearchInput />
    </div>
  )
}

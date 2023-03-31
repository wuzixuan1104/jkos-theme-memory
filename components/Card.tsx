
export default function Card() {
  return (
    <div className="flex">
      <div className="flex items-center justify-center min-w-[50px] h-[50px] rounded-full bg-[#FFA159] mr-10 text-white text-2xl">1</div>
      <label className="w-[500px] border border-[var(--border1)] rounded-md overflow-hidden">
        <div className="flex justify-between bg-[var(--btnEnabled)] py-3 px-5 text-white">
          <span className="block">臺灣 TAIWAN </span>
          <span className="block">6002</span>
        </div>

        <div className="flex justify-start pl-5 pb-5 pt-2">
          <span className="block mt-2 text-[var(--btnEnabled)]">TWN</span>
        </div>
      </label>
    </div>
  )
}

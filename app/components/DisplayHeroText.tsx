'use client'

export default function DisplayHeroText({ title }: { title: string }) {
  return (
    <div className="w-1/2">
      <div className="border-l border-gray-900 px-3 mb-5">
        <p className="text-xs font-semibold leading-tight tracking-tight">PokemonGO</p>
        <p className="text-xs font-light leading-tight tracking-tight">2023</p>
      </div>
      <p className="text-4xl font-bold leading-none tracking-widest mb-5">{title.toUpperCase()}</p>
      <button
        onClick={() => console.log('link to detail')}
        className="border-2 border-black bg-transparent px-12 py-4 text-sm font-semibold tracking-wider text-black hover:border-transparent hover:bg-black hover:text-white"
      >
        Detail
      </button>
    </div>
  )
}

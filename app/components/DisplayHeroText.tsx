import Link from 'next/link'

export default function DisplayHeroText({ title, link }: { title: string; link: string }) {
  return (
    <div className="w-1/2">
      <div className="mb-5 border-l border-gray-900 px-3">
        <p className="text-xs font-semibold leading-tight tracking-tight">PokemonGO</p>
        <p className="text-xs font-light leading-tight tracking-tight">2023</p>
      </div>
      <p className="mb-5 text-4xl font-bold leading-none tracking-widest">{title.toUpperCase()}</p>
      <Link href={link}>
        <button className="border-2 border-black bg-transparent px-12 py-4 text-sm font-semibold tracking-wider text-black hover:border-transparent hover:bg-black hover:text-white">
          Detail
        </button>
      </Link>
    </div>
  )
}

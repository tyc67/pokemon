import Image from 'next/image'
import { typeColor } from '../utils/typeColorIndex'

interface PokemonCharacterProps {
  imageSrc: string
  abilities: string[]
  types: string[]
  weakness: string[]
  catchRate: number
}

export default function PokemonCharacter(props: PokemonCharacterProps) {
  const { imageSrc, abilities, types, weakness, catchRate } = props
  return (
    <div className="flex flex-col gap-2 rounded-md bg-gray-400 p-2 md:flex-row">
      <div className="flex h-60 w-60  items-center justify-center bg-gray-300">
        <Image src={imageSrc} width={200} height={200} alt="list-item" />
      </div>
      <div className="w-60">
        <p className="flex justify-center bg-white font-medium">Abilities</p>
        <span className="flex flex-row justify-center gap-2 py-1">
          {abilities.map((ability, idx) => (
            <p className="text-xs text-slate-100" key={idx}>
              {ability}
            </p>
          ))}
        </span>
        <p className="flex justify-center bg-white font-medium">Type</p>
        <span className="flex flex-row items-center gap-3">
          <span className="inline-flex gap-1 py-1">
            {types.map((type, idx) => {
              const typeBgColor = typeColor(type)
              return (
                <p
                  key={idx}
                  className="h-fit rounded-md px-4 py-0.5 text-xs"
                  style={{ backgroundColor: typeBgColor }}
                >
                  {type}
                </p>
              )
            })}
          </span>
        </span>
        <p className="flex justify-center bg-white font-medium">Weakness</p>
        <span className="flex flex-row flex-wrap gap-1 p-1">
          {weakness.map((weakto, idx) => {
            const typeBgColor = typeColor(weakto)
            return (
              <p
                key={idx}
                className="h-fit rounded-md px-4 py-0.5 text-xs"
                style={{ backgroundColor: typeBgColor }}
              >
                {weakto}
              </p>
            )
          })}
        </span>
        <p className="flex justify-center bg-white font-medium">Catch Rate</p>
        <div className="flex flex-row items-center justify-center">
          <p className="m-1 flex h-8 w-8 flex-row items-center justify-center rounded-full bg-gray-50 p-1 text-xs">
            {catchRate}
          </p>
        </div>
      </div>
    </div>
  )
}

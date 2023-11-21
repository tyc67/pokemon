import Link from 'next/link'
import Image from 'next/image'
import { typeColor } from '../utils/typeColorIndex'

interface EvolutionChainProps {
  evolution: {
    id: number
    name: string
    imageSrc: string
    type: string | string[]
  }[]
}

export default function EvolutionChain({ evolution }: EvolutionChainProps) {
  const nameTag = evolution.map(({ name }) => name.charAt(0).toUpperCase() + name.slice(1))
  return (
    <div>
      <p>Evolution</p>
      <div className="mb-5 flex flex-col gap-5 lg:flex-row lg:gap-10">
        {evolution.map((data, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center">
            <Link href={`/pokedex/${data.name}`}>
              <Image key={idx} src={data.imageSrc} width={80} height={80} alt="evo" />
            </Link>
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm font-semibold">{nameTag[idx]}</p>
              <span className="inline-flex gap-2">
                {Array.isArray(data.type) ? (
                  data.type.map((type, idx) => {
                    const typeBgColor = typeColor(type)
                    return (
                      <p
                        key={idx}
                        className="rounded-md px-4 py-0.5 text-xs"
                        style={{ backgroundColor: typeBgColor }}
                      >
                        {type}
                      </p>
                    )
                  })
                ) : (
                  <p className="rounded-md bg-gray-200 px-4 py-0.5 text-xs">{data.type}</p>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { typeColor } from '../utils/typeColorIndex'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

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
  const len = evolution.length
  return (
    <div id="evolution-chain-container" className="my-5 flex flex-col gap-5 md:flex-row lg:gap-10">
      {evolution.map((data, idx) => (
        <div id={`evo-${idx}`} key={idx} className="flex flex-col items-center justify-center">
          <div id="wrapper" className="flex flex-col items-center justify-center md:flex-row">
            <div className="flex flex-col items-center justify-center">
              <Link href={`/pokedex/${data.name}`}>
                <div className=" flex h-[120px] w-[120px] items-center justify-center rounded-full border-4 border-gray-500">
                  <Image key={idx} src={data.imageSrc} width={100} height={100} alt="evo" />
                </div>
              </Link>
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm font-semibold">{nameTag[idx]}</p>
                <span className="inline-flex gap-2 pt-1">
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
                    <p
                      className="rounded-md bg-gray-200 px-4 py-0.5 text-xs"
                      style={{ backgroundColor: typeColor(data.type) }}
                    >
                      {data.type}
                    </p>
                  )}
                </span>
              </div>
            </div>
            <div>
              {idx === len - 1 ? (
                <ChevronDownIcon className="invisible mt-4 h-6 w-6 stroke-[3px] md:mb-12 md:ml-[28px] md:-rotate-90" />
              ) : (
                <ChevronDownIcon className="mt-4 h-6 w-6 stroke-[3px] md:mb-12 md:ml-[28px] md:-rotate-90" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { typeColor } from '../utils/typeColorIndex'

interface ListItemProps {
  id: number
  imageSrc: string
  name: string
  types: string[]
}

export default function ListItem({ id, imageSrc, name, types }: ListItemProps) {
  const numberTag = Math.abs(id).toString().padStart(4, '0')
  const capitalizeName = name.charAt(0).toUpperCase() + name.slice(1)

  return (
    <div className="p-2 md:w-1/2 lg:w-1/4">
      <div className="rounded border p-2 shadow">
        <Link href={`/pokedex/${name}`}>
          <div className="flex h-64 flex-col items-center justify-center bg-slate-100 hover:bg-slate-200">
            <Image src={imageSrc} width={200} height={200} alt="list-item" />
          </div>
          <p className="text-sm font-medium text-gray-600">{`#${numberTag}`}</p>
          <p className="pt-1 text-2xl font-semibold">{capitalizeName}</p>
          <span className="flex flex-row gap-2">
            {types.map((type, idx) => {
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
            })}
          </span>
        </Link>
      </div>
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { DisplayProps } from '../types/display'

export default function DisplayMedium({ imageSrc, title, subtitle, link }: DisplayProps) {
  return (
    <div className="lg:w-flex-half mb-4 bg-slate-100 p-8 hover:bg-slate-200 ">
      <Link href={link}>
        <div className="flex h-56 flex-1 items-center justify-center">
          <Image src={imageSrc} width={200} height={200} alt="titleImage" />
        </div>
        <div>
          <p className="mb-1 text-3xl font-semibold">{title}</p>
          <p className="text-xs text-gray-700">{subtitle}</p>
        </div>
      </Link>
    </div>
  )
}

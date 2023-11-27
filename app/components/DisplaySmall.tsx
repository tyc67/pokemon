import Link from "next/link"
import Image from "next/image"
import { DisplayProps } from "../types/display"

export default function DisplaySamll({ imageSrc, title, subtitle, link }: DisplayProps){
    return(
        <div className="lg:w-flex-fourth mb-4 bg-slate-100 p-6 hover:bg-slate-200">
        <Link href={link}>
          <div className="flex h-32 flex-1 items-center justify-center">
            <Image src={imageSrc} width={120} height={120} alt="titleImage" />
          </div>
          <div>
            <p className="mb-1 text-xl font-semibold">{title}</p>
            <p className="text-xs text-gray-700">{subtitle}</p>
          </div>
        </Link>
      </div>
    )
}
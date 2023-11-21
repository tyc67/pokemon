'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'

interface PaginateButtonProps {
    prevAndNext: {
        id: number;
        name: string;
        url: string;
      }[];
}

export default function PaginateButton({ prevAndNext }: PaginateButtonProps) {
  const router = useRouter()
  const previousIdTag = Math.abs(prevAndNext[0].id).toString().padStart(4, '0')
  const nextIdTag = Math.abs(prevAndNext[2].id).toString().padStart(4, '0')
  const previousName = prevAndNext[0].name
  const nextName = prevAndNext[2].name
  return (
    <div className="inline-flex justify-center gap-5">
      <button className="inline-flex items-center " onClick={() => router.push(`${previousName}`)}>
        <ArrowLeftCircleIcon className="h-6 w-6" />
        <p className="leading-none tracking-wider">{`#${previousIdTag}`}</p>
      </button>
      <button className="inline-flex items-center" onClick={() => router.push(`${nextName}`)}>
        <p className="leading-none tracking-wider">{`#${nextIdTag}`}</p>
        <ArrowRightCircleIcon className="h-6 w-6" />
      </button>
    </div>
  )
}

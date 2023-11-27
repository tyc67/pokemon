'use client'

import { useEffect, useState } from 'react'
import { useFetchNextList } from '../hooks/useFetchNextList'
import { type PokemonItem } from '../types/display'
import ListItem from './ListItem'
import Spinner from './Spinner'
import { useElementInview } from '../hooks/useElementInView'

export default function MorePokeList() {
  const [pageKey, setPageKey] = useState<string>('0')
  const [pokeList, setPokeList] = useState<PokemonItem[]>([])
  const { data, isLoading, error } = useFetchNextList(pageKey)

  const [attachRef, setAttachRef] = useState(false)
  const { containerRef, inView } = useElementInview({ attach: attachRef })

  useEffect(() => {
    if (inView && !isLoading) {
      const nextPage = parseInt(pageKey) + 12
      setPageKey(nextPage.toString())
    }
  }, [inView])

  useEffect(() => {
    if (data) {
      setPokeList([...pokeList, ...data])
    }
  }, [data])

  const handleLoadMoreClick = () => {
    setAttachRef(true)
    const nextPage = parseInt(pageKey) + 12
    setPageKey(nextPage.toString())
  }

  return (
    <>
      <div className="flex flex-1 flex-row flex-wrap justify-center">
        {pokeList.map((data) => (
          <ListItem
            key={data.id}
            id={data.id}
            imageSrc={data.sprite}
            name={data.name}
            types={data.types}
          />
        ))}
      </div>
      <div className="flex items-center justify-center p-3">
        {isLoading ? (
          <Spinner />
        ) : !attachRef ? (
          <button onClick={handleLoadMoreClick}>
            <p className="rounded bg-blue-500 px-3 py-0.5 text-sm text-slate-50">
              Load More Button
            </p>
          </button>
        ) : null}
      </div>
      <div id="end-observer" ref={containerRef} className="w-1px h-1px invisible" />
    </>
  )
}

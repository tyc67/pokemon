'use client'

import ListItem from '../components/ListItem'
import MorePokeList from '../components/MorePokeList'
import PokemonListBox from '../components/PokemonListBox'
import SearchInput from '../components/SearchInput'
import { useEffect, useState } from 'react'
import { type PokemonItem } from '../types/display'
import { useSearchParams } from 'next/navigation'
import { sorting } from '../utils/converter'

interface PokeListProps {
  PokemonData: PokemonItem[]
}

export default function PokeList({ PokemonData }: PokeListProps) {
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort') || ''
  const initialView = sorting(PokemonData, 'default', [0, 12])
  const [viewData, setViewData] = useState<PokemonItem[]>(initialView)
  const [isSearching, setIsSearching] = useState<boolean>(false)

  useEffect(() => {
    const sortedPokeList = sorting(PokemonData, sort, [0, 12])
    setViewData(sortedPokeList)
  }, [PokemonData, sort])

  const handleSearchData = (data: PokemonItem[]) => {
    setViewData(data)
    setIsSearching(true)
  }

  const resetViewData = () => {
    setViewData(initialView)
    setIsSearching(false)
  }

  return (
    <div className="flex w-full flex-col">
      <div className="ml-9 flex flex-col justify-center gap-2 md:mx-2 md:flex-row md:justify-between">
        <div className="w-56">
          <SearchInput handleSearchData={handleSearchData} resetViewData={resetViewData} />
        </div>
        <div className="w-56">{isSearching ? null : <PokemonListBox />}</div>
      </div>

      <div className="flex flex-1 flex-row flex-wrap justify-center">
        {viewData?.map((data) => (
          <ListItem
            key={data.id}
            id={data.id}
            imageSrc={data.sprite}
            name={data.name}
            types={data.types}
          />
        ))}
      </div>
      {isSearching ? null : <MorePokeList sortOrder={sort} />}
    </div>
  )
}

'use client'

import ListItem from '../components/ListItem'
import MorePokeList from '../components/MorePokeList'
import PokemonListBox from '../components/PokemonListBox'
import SearchInput from '../components/SearchInput'
import { useEffect, useState } from 'react'
import { type PokemonItem } from '../types/display'

interface PokeListProps {
  sortedPokeList: PokemonItem[]
  sort: string
}

export default function PokeList({ sortedPokeList, sort }: PokeListProps) {
  const [viewData, setViewData] = useState<PokemonItem[]>(sortedPokeList)
  const [isSearching, setIsSearching] = useState<boolean>(false)

  useEffect(() => {
    setViewData(sortedPokeList)
  }, [sortedPokeList])

  const handleSearchData = (data: PokemonItem[]) => {
    setViewData(data)
    setIsSearching(true)
  }

  const resetViewData = () => {
    setViewData(sortedPokeList)
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

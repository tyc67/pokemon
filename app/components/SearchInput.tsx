'use client'

import supabase from '../utils/supabase'
import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, XMarkIcon, CloudIcon } from '@heroicons/react/24/outline'
import { type PokemonItem } from '../types/display'

interface SearchInputProps {
  handleSearchData: (data: PokemonItem[]) => void
  resetViewData: () => void
}

const checkInputType = (inputValue: string) => {
  const typeList = [
    'bug',
    'dragon',
    'dark',
    'electric',
    'flying',
    'fighting',
    'fire',
    'fairy',
    'grass',
    'ghost',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water',
  ]
  if (isNaN(Number(inputValue))) {
    if (typeList.includes(inputValue)) {
      return 'pokemon_type'
    } else {
      return 'pokemon_name'
    }
  } else {
    return 'pokemon_id'
  }
}

const fetchDataByQueryType = async (queryType: string, query: string) => {
  switch (queryType) {
    case 'pokemon_id':
      return supabase.from('pokemon').select().eq('pokemon_id', query)
    case 'pokemon_name':
      return supabase.from('pokemon').select().ilike('pokemon_name', `${query}%`)
    case 'pokemon_type':
      return supabase.from('pokemon').select().contains('pokemon_type', [query])
    default:
      return null
  }
}

export default function SearchInput({ handleSearchData, resetViewData }: SearchInputProps) {
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    const getPokemons = async () => {
      if (query !== '') {
        const queryType = checkInputType(query)
        const response = await fetchDataByQueryType(queryType, query)

        if (response && response.data) {
          const data = response.data
          const SearchedList = data.map((item) => {
            return {
              id: item.pokemon_id,
              name: item.pokemon_name,
              sprite: item.pokemon_sprite,
              types: item.pokemon_type,
            }
          })
          handleSearchData(SearchedList)
        }
      } else {
        resetViewData()
      }
    }
    getPokemons()
  }, [query])

  const handleSearch = (e: any) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <div className="flex items-center rounded-md border border-gray-300 bg-white p-1 ring-inset ring-blue-500  focus-within:border-blue-500 focus-within:ring-1">
        <input
          className="mx-2 w-full focus:outline-none"
          type="text"
          placeholder=""
          value={query}
          onChange={handleSearch}
        />
        {query === '' ? (
          <MagnifyingGlassIcon className="mr-1 h-5 w-5" />
        ) : (
          <XMarkIcon className="mr-1 h-5 w-5" onClick={() => setQuery('')} />
        )}
      </div>
    </>
  )
}

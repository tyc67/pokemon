import { useState, useEffect } from 'react'
import { getPokemonList, getPokemonByURL } from '../utils/fetch'
import { type PokemonItem } from '../types/display'

export const useFetchNextList = (fetchPage: string) => {
  const [data, setData] = useState<PokemonItem[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (fetchPage === '0') return
      setIsLoading(true)
      try {
        const pokemonListData = await getPokemonList('12', fetchPage)
        const urls = pokemonListData.results.map((data: any) => data.url) as string[]
        const extractedPokemonData: PokemonItem[] = await Promise.all(
          urls.map(async (url) => {
            const item = await getPokemonByURL(url)
            return {
              id: item.id,
              name: item.name,
              sprite: item.sprites.other.home.front_default,
              types: item.types.map((data: any) => data.type.name),
            }
          })
        )
        setData(extractedPokemonData)
        setError(null)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [fetchPage])

  return { data, isLoading, error }
}

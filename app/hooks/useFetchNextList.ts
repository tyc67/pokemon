import { useState, useEffect } from 'react'
import { type PokemonItem } from '../types/display'
import { sortViewData } from '../utils/converter'

export const useFetchNextList = (sort: string, start: number, end: number) => {
  const [data, setData] = useState<PokemonItem[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (start === 0) return
      setIsLoading(true)
      try {
        const temp = await sortViewData(sort, [start, end])
        setData(temp)
        setError(null)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [end, sort, start])

  return { data, isLoading, error }
}

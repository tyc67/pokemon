import { sortViewData } from '../utils/converter'
import PokeList from '../components/PokeList'

export default async function Pokedex({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { sort } = searchParams as { [key: string]: string }
  const pokemonSortedList = await sortViewData(sort, [0, 12])
  
  return (
    <PokeList sortedPokeList={pokemonSortedList} sort={sort}/>
  )
}

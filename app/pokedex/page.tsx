import { sortViewData } from '../utils/converter'
import ListItem from '../components/ListItem'
import MorePokeList from '../components/MorePokeList'
import PokemonListBox from '../components/PokemonListBox'

export default async function Pokedex({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { sort } = searchParams as { [key: string]: string }
  const pokemonListViewData = await sortViewData(sort, [0, 12])

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-end">
        <span className="flex flex-row items-center">
          <p className="p-2 text-sm font-light">Sort By</p>
          <PokemonListBox />
        </span>
      </div>
      <div className="flex flex-1 flex-row flex-wrap justify-center">
        {pokemonListViewData.map((data) => (
          <ListItem
            key={data.id}
            id={data.id}
            imageSrc={data.sprite}
            name={data.name}
            types={data.types}
          />
        ))}
      </div>
      <MorePokeList sortOrder={sort} />
    </div>
  )
}

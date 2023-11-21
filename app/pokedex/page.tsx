import ListItem from '../components/ListItem'
import { PokemonItem } from '../types/display'
import { getPokemonList, getPokemonByURL } from '../utils/fetch'
import MorePokeList from '../components/MorePokeList'

export default async function Pokedex() {
  const pokemonListData = await getPokemonList('12', '0')
  const url = pokemonListData.results.map((data: any) => data.url) as string[]
  const pokemonData = await Promise.all(url.map((url) => getPokemonByURL(url)))
  const extractedPokemonData: PokemonItem[] = pokemonData.map((item) => ({
    id: item.id,
    name: item.name,
    sprite: item.sprites.other.home.front_default,
    types: item.types.map((data: any) => data.type.name),
  }))

  //TODO: SortByDropDown

  return (
    <div className="flex w-full flex-col">
      <p className="p-2 text-4xl font-light">Sort By</p>
      <div className="flex flex-1 flex-row flex-wrap">
        {extractedPokemonData.map((data) => (
          <ListItem
            key={data.id}
            id={data.id}
            imageSrc={data.sprite}
            name={data.name}
            types={data.types}
          />
        ))}
      </div>
      <MorePokeList />
    </div>
  )
}

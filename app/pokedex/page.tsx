import ListItem from '../components/ListItem'
import { PokemonItem } from '../types/display'
import { getPokemonList, getPokemonByURL } from '../utils/fetch'
import MorePokeList from '../components/MorePokeList'
import PokemonListBox from '../components/PokemonListBox'

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

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-end">
        <span className="flex flex-row items-center">
          <p className="p-2 text-sm font-light">Sort By</p>
          <PokemonListBox />
        </span>
      </div>
      <div className="flex flex-1 flex-row flex-wrap justify-center">
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

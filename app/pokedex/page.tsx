import PokeList from '../components/PokeList'
import supabase from '../utils/supabase'

interface SupabaseData {
  pokemon_id: number
  pokemon_name: string
  pokemon_sprite: string
  pokemon_type: string[]
}

export default async function Pokedex() {
  const { data, error } = await supabase.from('pokemon').select()
  const converted =
    data?.map((item: SupabaseData) => {
      return {
        id: item.pokemon_id,
        name: item.pokemon_name,
        sprite: item.pokemon_sprite,
        types: item.pokemon_type,
      }
    }) ?? []

  return <PokeList PokemonData={converted} />
}

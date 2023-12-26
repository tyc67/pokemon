import supabase from '../utils/supabase'
import { getPokemonList, getPokemonByURL } from '../utils/fetch'

const checkTypesArray = (newTypes: string[], existTypes: string[]) => {
  if (!existTypes || newTypes.length !== existTypes.length) return false
  return newTypes.every((val) => existTypes.includes(val))
}

export const revalidate = 0

export default function Admin() {
  const updateSupabasePokemonList = async () => {
    const source = await getPokemonList('1010', '0')
    const urls = source.results.map((item: any) => item.url)

    const fetchPokemon = async () => {
      try {
        const promises = urls.map((url: string) => getPokemonByURL(url))
        const results = await Promise.all(promises)
        return results
      } catch (error: any) {
        throw new Error(error)
      }
    }
    const latestPokemons = await fetchPokemon()

    const { data: existingRecords } = await supabase.from('pokemon').select()
    const map: { [key: string]: string } = {}
    existingRecords?.forEach((data) => {
      map[data.pokemon_id] = data.pokemon_name
    })

    for (const lp of latestPokemons) {
      const { id, name, sprites, types } = lp
      const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
      const sprite =
        sprites.other.home.front_default ?? sprites.other['official-artwork'].front_default
      const type = types.map((data: any) => data.type.name)

      const isDataExist = map.hasOwnProperty(id)

      if (isDataExist) {
        let isMatchExistingRecord = false
        const { data } = await supabase.from('pokemon').select().eq('pokemon_id', id)

        data?.forEach((element) => {
          const isTypesMatch = checkTypesArray(type, element.pokemon_type)
          if (
            element.pokemon_id === id.toString() &&
            element.pokemon_name === name &&
            element.pokemon_url === url &&
            element.pokemon_sprite === sprite &&
            isTypesMatch
          ) {
            isMatchExistingRecord = true
          }
        })

        if (!isMatchExistingRecord) {
          console.log('update', id)
          const { error } = await supabase
            .from('pokemon')
            .update({
              pokemon_name: name,
              pokemon_url: url,
              pokemon_sprite: sprite,
              pokemon_type: type,
            })
            .eq('pokemon_id', id)
        }
        console.log(id, 'update checked')
      } else {
        console.log('add', id)
        const { error } = await supabase.from('pokemon').insert({
          pokemon_id: id,
          pokemon_name: name,
          pokemon_url: url,
          pokemon_sprite: sprite,
          pokemon_type: type,
        })
        if (error) {
          console.error('Supabase insert failed:', error)
        }
      }
    }
  }

  updateSupabasePokemonList()

  return (
    <div className="flex h-[75vh] w-full items-center justify-center">
      <p>working in progress</p>
    </div>
  )
}

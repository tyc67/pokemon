import PaginateButton from '@/app/components/PaginateButton'
import EvolutionChain from '@/app/components/EvolutionChain'
import {
  getPokemonList,
  getPokemonByNameOrId,
  getPokemonType,
  getPokemonSpecies,
  getPokemonEvolution,
} from '@/app/utils/fetch'
import PokemonCharacter from '@/app/components/PokemonCharacter'
import RadarChart from '@/app/components/RadarChart'

function findPreviousAndNextUrls(name: string, pokemonList: { name: string; url: string }[]) {
  const index = pokemonList.findIndex((item) => item.name === name)
  if (index === -1) return []
  const len = pokemonList.length
  const prevIndex = index === 0 ? len - 1 : index - 1
  const nextIndex = index === len - 1 ? 0 : index + 1
  const temp = [pokemonList[prevIndex], pokemonList[index], pokemonList[nextIndex]]
  const prevAndNext = temp.map((data) => {
    const match = data.url.match(/\/(\d+)\/$/)
    const id = match ? parseInt(match[1]) : 9999
    return {
      id: id,
      ...data,
    }
  })
  return prevAndNext
}

function extractEvolutionChain(chain: any) {
  let results: any[] = []
  if (chain.evolves_to && chain.evolves_to.length > 0) {
    results = results.concat(chain.evolves_to)
    for (const n of chain.evolves_to) {
      results = results.concat(extractEvolutionChain(n))
    }
  }
  return results
}

export default async function PokemonDeatil({ params: { name } }: { params: { name: string } }) {
  const pokemonList = await getPokemonList('10000', '0')
  //TODO: how to cache List data, reduce fetch frequency
  const pokemonData = await getPokemonByNameOrId(name)
  const pokemonSpeciesData = await getPokemonSpecies(pokemonData.species.url)
  //TODO: handle if imageSrc is null which may cause render error
  const imageSrc = pokemonData.sprites.other.home.front_default
    ? pokemonData.sprites.other.home.front_default
    : pokemonData.sprites.front_default
  const types = pokemonData.types.map((data: any) => data.type.name) as string[]
  const damageData = await getPokemonType(pokemonData.types[0].type.url)
  const weakness = damageData.damage_relations.double_damage_from.map(
    (data: any) => data.name
  ) as string[]
  const abilities = pokemonData.abilities.map((data: any) => data.ability.name) as string[]
  const stats = pokemonData.stats.map((data: any) => ({
    name: data.stat.name,
    baseStat: data.base_stat,
  })) as { name: string; baseStat: number }[]
  const evolutionData = await getPokemonEvolution(pokemonSpeciesData.evolution_chain.url)
  const catchRate: number = pokemonSpeciesData.capture_rate
  const pokemonIdTag = Math.abs(pokemonData.id).toString().padStart(4, '0')
  const prevAndNextPokemon = findPreviousAndNextUrls(name, pokemonList.results)

  const evolutionChain = [evolutionData.chain, ...extractEvolutionChain(evolutionData.chain)]
  const evolutionChainDetail = await Promise.all(
    evolutionChain.map((evolve) => getPokemonByNameOrId(evolve.species.name))
  )
  const evolutionTypes = evolutionChainDetail.map((pokemon) => {
    const id = pokemon.id
    const name = pokemon.name
    const imageSrc = pokemon.sprites.other.home.front_default || pokemon.sprites.front_default
    const type =
      pokemon.types.length === 1
        ? pokemon.types[0].type.name
        : pokemon.types.map((data: any) => data.type.name)
    return { id, name, imageSrc, type }
  })

  const capitalizeName = pokemonData.name.charAt(0).toUpperCase() + name.slice(1)

  return (
    <div className="flex flex-col items-center">
      <PaginateButton prevAndNext={prevAndNextPokemon} />
      <span className="flex flex-row justify-center gap-4 py-3 text-3xl">
        <p>{capitalizeName}</p>
        <p className="text-gray-600">{`#${pokemonIdTag}`}</p>
      </span>
      <div className="flex flex-col items-center justify-center md:flex-row">
        <PokemonCharacter
          imageSrc={imageSrc}
          abilities={abilities}
          catchRate={catchRate}
          types={types}
          weakness={weakness}
        />
        <div className="mt-2 rounded-md bg-gray-200 p-2 md:ml-2 md:mt-0 ">
          <div className="flex h-60 w-60 items-center justify-center">
            <RadarChart
              data={[
                { key: `${pokemonData.name}-stats-0`, label: 'HP', value: stats[0].baseStat },
                { key: `${pokemonData.name}-stats-1`, label: 'Attack', value: stats[1].baseStat },
                { key: `${pokemonData.name}-stats-2`, label: 'Defense', value: stats[2].baseStat },
                { key: `${pokemonData.name}-stats-3`, label: 'Sp.Atk', value: stats[3].baseStat },
                { key: `${pokemonData.name}-stats-4`, label: 'Sp.Def', value: stats[4].baseStat },
                { key: `${pokemonData.name}-stats-5`, label: 'Speed', value: stats[5].baseStat },
              ]}
              domainMax={150}
              width={230}
              height={230}
              padding={30}
            />
          </div>
        </div>
      </div>
      <EvolutionChain evolution={evolutionTypes} />
    </div>
  )
}

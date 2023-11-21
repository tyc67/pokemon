import Image from 'next/image'
import PaginateButton from '@/app/components/PaginateButton'
import EvolutionChain from '@/app/components/EvolutionChain'
import {
  getPokemonList,
  getPokemonByNameOrId,
  getPokemonType,
  getPokemonSpecies,
  getPokemonEvolution,
} from '@/app/utils/fetch'
import { typeColor } from '@/app/utils/typeColorIndex'

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

export default async function PokeDeatil({ params: { name } }: { params: { name: string } }) {
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

  return (
    <div className="flex flex-col items-center">
      <PaginateButton prevAndNext={prevAndNextPokemon} />
      <span className="flex flex-row justify-center gap-4 py-3">
        <p>{pokemonData.name}</p>
        <p>{`#${pokemonIdTag}`}</p>
      </span>
      <div className="flex flex-col justify-center md:flex-row">
        <div className="flex h-60 w-60  items-center justify-center bg-slate-100">
          <Image src={imageSrc} width={200} height={200} alt="list-item" />
        </div>
        <div className="w-60">
          <span className="flex flex-row gap-3">
            <p className="font-medium">Abilities: </p>
            {abilities.map((ability, idx) => (
              <p key={idx}>{ability}</p>
            ))}
          </span>
          <span className="flex flex-row items-center gap-3">
            <p className="font-medium">Types: </p>
            <span className="inline-flex gap-2">
              {types.map((type, idx) => {
                const typeBgColor = typeColor(type)
                return (
                  <p
                    key={idx}
                    className="h-fit rounded-md px-4 py-0.5 text-xs"
                    style={{ backgroundColor: typeBgColor }}
                  >
                    {type}
                  </p>
                )
              })}
            </span>
          </span>
          <span className="flex flex-row gap-3">
            <p className="font-medium">Weakness: </p>
            {weakness.map((weakto, idx) => {
              const typeBgColor = typeColor(weakto)
              return (
                <p
                  key={idx}
                  className="h-fit rounded-md px-4 py-0.5 text-xs"
                  style={{ backgroundColor: typeBgColor }}
                >
                  {weakto}
                </p>
              )
            })}
          </span>
          <div>
            {stats.map((data, idx) => (
              <span key={idx} className="flex flex-row">
                <p className="w-[9rem]">{data.name}</p>
                <p>{data.baseStat}</p>
              </span>
            ))}
          </div>
          <div>
            <span className="flex flex-row gap-3">
              <p>catch rate</p>
              <p>{catchRate}</p>
            </span>
          </div>
        </div>
      </div>
      <EvolutionChain evolution={evolutionTypes} />
    </div>
  )
}

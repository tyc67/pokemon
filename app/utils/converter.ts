import { getPokemonList, getPokemonByURL } from './fetch'

const convertData = async (resource: any) => {
  const extractDataPromises = resource.map(async (data: { name: string; url: string }) => {
    const item = await getPokemonByURL(data.url)
    const sprite =
      item.sprites.other.home.front_default ?? item.sprites.other['official-artwork'].front_default

    return {
      id: item.id,
      name: item.name,
      sprite: sprite,
      types: item.types.map((data: any) => data.type.name),
    }
  })
  return Promise.all(extractDataPromises)
}

export const sortViewData = async (sort: string, range: [number, number]) => {
  const pokemonResource = await getPokemonList('1010', '0')
  switch (sort) {
    case 'num-asc':
      const ascData = pokemonResource.results.slice(range[0], range[1])
      return await convertData(ascData)
    case 'num-desc':
      const descData = pokemonResource.results.reverse().slice(range[0], range[1])
      return await convertData(descData)
    case 'a-z':
      const atoz = pokemonResource.results
        .sort((a: { name: string }, b: { name: any }) => a.name.localeCompare(b.name))
        .slice(range[0], range[1])
      return await convertData(atoz)
    case 'z-a':
      const ztoa = pokemonResource.results
        .sort((a: { name: any }, b: { name: string }) => b.name.localeCompare(a.name))
        .slice(range[0], range[1])
      return await convertData(ztoa)

    default:
      const defaultData = pokemonResource.results.slice(range[0], range[1])
      return await convertData(defaultData)
  }
}

export async function getPokemonList(limit: string, offset: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function getPokemonByNameOrId(endpoint: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${endpoint}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function getPokemonByURL(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function getPokemonSpecies(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function getPokemonType(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function getPokemonTypeByNameOrId(endpoint: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${endpoint}/`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function getPokemonEvolution(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
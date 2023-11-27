import Image from 'next/image'
import DisplayMedium from './components/DisplayMedium'
import DisplaySamll from './components/DisplaySmall'
import DisplayHeroText from './components/DisplayHeroText'
import { getPokemonByURL, getPokemonList } from './utils/fetch'

export default async function Home() {
  const pokemonListData = await getPokemonList('30', '0')
  const pokemonDataId1 = await getPokemonByURL(pokemonListData.results[0].url)
  const pokemonDataId2 = await getPokemonByURL(pokemonListData.results[1].url)
  const pokemonDataId3 = await getPokemonByURL(pokemonListData.results[2].url)
  const pokemonDataId4 = await getPokemonByURL(pokemonListData.results[3].url)
  const pokemonDataId5 = await getPokemonByURL(pokemonListData.results[4].url)
  const pokemonDataId6 = await getPokemonByURL(pokemonListData.results[5].url)
  const pokemonDataId9 = await getPokemonByURL(pokemonListData.results[24].url)

  return (
    <>
      <div className="w-full">
        <div className="flex h-[600px] flex-col bg-green-200 p-6 pb-6 lg:flex-row">
          <DisplayHeroText title={pokemonDataId9.name} link={`/items/${pokemonDataId9.name}`} />
          <div className="relative flex flex-1 items-center justify-center">
            <Image
              src={pokemonDataId9.sprites.other.home.front_default}
              width={480}
              height={480}
              alt="mainDisplay"
            />
          </div>
        </div>
        <div className="my-4 flex flex-col justify-between lg:flex-row">
          <DisplayMedium
            imageSrc={pokemonDataId1.sprites.other.home.front_default}
            title={pokemonDataId1.name}
            subtitle="pokemonGo"
            link={`/items/${pokemonDataId1.name}`}
          />
          <DisplayMedium
            imageSrc={pokemonDataId2.sprites.other.home.front_default}
            title={pokemonDataId2.name}
            subtitle="pokemonGo"
            link={`/items/${pokemonDataId2.name}`}
          />
        </div>
        <div className="flex flex-col items-center py-10">
          <p className="mb-3 text-4xl font-bold">Trending Now</p>
          <p className="text-sm text-gray-600">SloganSloganSloganSloganSloganSlogan</p>
        </div>
        <div className="my-4 flex flex-col justify-between lg:flex-row">
          <DisplaySamll
            imageSrc={pokemonDataId3.sprites.other.home.front_default}
            title={pokemonDataId3.name}
            subtitle="pokemonGo"
            link={`/items/${pokemonDataId3.name}`}
          />
          <DisplaySamll
            imageSrc={pokemonDataId4.sprites.other.home.front_default}
            title={pokemonDataId4.name}
            subtitle="pokemonGo"
            link={`/items/${pokemonDataId4.name}`}
          />
          <DisplaySamll
            imageSrc={pokemonDataId5.sprites.other.home.front_default}
            title={pokemonDataId5.name}
            subtitle="pokemonGo"
            link={`/items/${pokemonDataId5.name}`}
          />
          <DisplaySamll
            imageSrc={pokemonDataId6.sprites.other.home.front_default}
            title={pokemonDataId6.name}
            subtitle="pokemonGo"
            link={`/items/${pokemonDataId6.name}`}
          />
        </div>
      </div>
    </>
  )
}

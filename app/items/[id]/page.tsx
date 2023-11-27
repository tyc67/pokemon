import Image from 'next/image'
import { getPokemonByNameOrId } from '@/app/utils/fetch'

export default async function ItemView({ params: { id } }: { params: { id: string } }) {
  const pokemonData = await getPokemonByNameOrId(id)
  const imageSrc = pokemonData.sprites.other.home.front_default
    ? pokemonData.sprites.other.home.front_default
    : pokemonData.sprites.front_default

  const name = 'Product'
  const price = '1000'
  const description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

  return (
    <div
      className="mx-auto my-0 flex w-full
        flex-1
        flex-col
        py-12 md:flex-row"
    >
      <div className="h-112 flex w-full flex-1 bg-slate-100 hover:bg-slate-200 md:w-1/2">
        <div className="flex flex-1 items-center justify-center py-16">
          <Image src={imageSrc} width={300} height={300} alt="Inventory item" />
        </div>
      </div>
      <div className="w-full px-0 pb-8 pt-2 md:w-1/2 md:px-10">
        <h1 className="text-5xl font-light mb-4">{name}</h1>
        <h2 className="text-2xl tracking-tighter mb-4">${price}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        {/* <div className="mb-6">
          <QuantityPicker
            increment={increment}
            decrement={decrement}
            numberOfitems={numberOfitems}
          />
        </div>
        <Button full title="Add to Cart" onClick={() => addItemToCart(item)} /> */}
      </div>
    </div>
  )
}

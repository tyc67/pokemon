export interface DisplayProps {
    imageSrc: string
    title: string
    subtitle: string
    link: string
  }

export interface PokemonItem {
  id: number
  name: string
  sprite: string
  types: string[]
}
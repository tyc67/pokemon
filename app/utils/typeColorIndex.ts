export const typeColor = (type: string) => {
  switch (type) {
    case 'grass':
      return '#22c55e'
    case 'poison':
      return '#a855f7'
    case 'fire':
      return '#D83F31'
    case 'water':
      return '#3b82f6'
    case 'bug':
      return '#059669'
    case 'flying':
      return '#c4b5fd'
    case 'normal':
      return '#d4d4d4'
    case 'electric':
      return '#fde047'
    case 'ground':
      return '#DADDB1'
    case 'fairy':
      return '#FFC5C5'
    case 'fighting':
      return '#FFA33C'
    case 'psychic':
      return '#F78CA2'
    case 'rock':
      return '#B0A695'
    case 'steel':
      return '#ADC4CE'
    case 'ice':
      return '#749BC2'
    case 'ghost':
      return '#655DBB'
    case 'dark':
      return '#994D1C'
    case 'dragon':
      return '#5D3587'
  }
}

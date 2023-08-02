
const getFavorites = (): number[] => {

  return JSON.parse(localStorage.getItem('favorites') ?? '[]')
}

const toggleFavorite = (id: number) => {
  console.log('toggleFavorite Called')

  let favorites: number[] = getFavorites()

  if(favorites.includes(id)) {
    favorites = favorites.filter(pokeId => pokeId !== id)
  } else {
    favorites.push(id)
  }

  localStorage.setItem('favorites', JSON.stringify(favorites))
}

const existInFavorites = (id: number): boolean => {

  if(typeof window === 'undefined') return false

  const favorites: number[] = getFavorites()

  return favorites.includes(id)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  toggleFavorite,
  existInFavorites,
  getFavorites
}
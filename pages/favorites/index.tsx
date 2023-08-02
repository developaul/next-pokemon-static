import { useEffect, useState } from 'react'

import { Layout } from '@/components/layouts'
import { NoFavorites } from '@/components/ui/NoFavorites'
import { FavoritePokemons } from '@/components/pokemon'

import { localFavorites } from '@/utils'

const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(localFavorites.getFavorites())
  }, [])

  return (
    <Layout title='Pokemons - Favoritos'>
      {
        !favoritePokemons.length ?
          <NoFavorites /> :
          <FavoritePokemons favoritePokemons={favoritePokemons} />
      }
    </Layout>
  )
}

export default FavoritesPage

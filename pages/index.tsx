import { GetStaticProps, NextPage } from "next"
import { Grid } from "@nextui-org/react"

import { pokeApi } from "@/api"
import { Layout } from "@/components/layouts"
import { PokemonCard } from "@/components/pokemon"
import { PokemonListResponse, SmallPokemon } from "@/interfaces"

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  console.log("🚀 ~ pokemons:", pokemons)

  return (
    <Layout title="Listado de pokemons" >
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemon[] = data.results
    .map(({ name, url }) => {

      const urlSplitted = url.split('/')
      const id = urlSplitted[urlSplitted.length - 2]

      return {
        name,
        url,
        id,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
      }
    })

  return {
    props: {
      pokemons
    }
  };
};


export default HomePage
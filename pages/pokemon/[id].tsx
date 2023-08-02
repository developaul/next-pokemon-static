import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti'

import { Pokemon } from '@/interfaces';
import { getPokemonInfo, localFavorites } from '@/utils';
import { Layout } from '@/components/layouts'

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))

  const onToogleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id)
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id))

    if (!localFavorites.existInFavorites(pokemon.id)) return

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    });
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default ?? '/no-image.png'}
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Grid.Container gap={1}>
                <Grid css={{ display: 'contents' }} xs={12} sm={6}>
                  <Text h1 transform='capitalize'>{pokemon.name}</Text>
                </Grid>
                <Grid css={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} xs={12} sm={6}>
                  <Button
                    color='gradient'
                    onClick={onToogleFavorite}
                    ghost={!isInFavorites}
                  >
                    {isInFavorites ? 'Quitar de Favoritos' : 'Guardar en favoritos'}
                  </Button>
                </Grid>
              </Grid.Container>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display='flex' gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  const paths = [...Array(151)].map((_, index) => ({ params: { id: `${index + 1}` } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }

  const pokemon = await getPokemonInfo(id)

  return {
    props: {
      pokemon
    }
  };
};


export default PokemonPage
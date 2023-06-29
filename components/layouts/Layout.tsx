import { FC, ReactElement } from "react"

import Head from "next/head"

import { Navbar } from "../ui"

interface LayoutProps {
  children: ReactElement | ReactElement[]
  title?: string
}

export const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title ?? 'Pokemon App'}</title>
        <meta name="author" content="Paul Chavez" />
        <meta name="description" content='Informacion sobre el pokemon XXXXX' />
        <meta name="keywords" content="XXXXX, pokemon, pokedex" />
      </Head>

      <Navbar />

      <main style={{ padding: '0px 20px' }} >
        {children}
      </main>
    </>
  )
}

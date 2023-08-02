import { FC, ReactElement } from "react"
import Head from "next/head"

import { Navbar } from "../ui"

interface LayoutProps {
  children: ReactElement | ReactElement[]
  title?: string
}

const origin = typeof window === 'undefined' ? '' : window.location.origin

export const Layout: FC<LayoutProps> = ({ children, title }) => {

  return (
    <>
      <Head>
        <title>{title ?? 'Pokemon App'}</title>
        <meta name="author" content="Paul Chavez" />
        <meta name="description" content='Informacion sobre el pokemon XXXXX' />
        <meta name="keywords" content="XXXXX, pokemon, pokedex" />

        <meta property="og:title" content={`Informacion sobre ${title}`} />
        <meta property="og:description" content={`Esta es la pgina sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar />

      <main style={{ padding: '0px 20px' }} >
        {children}
      </main>
    </>
  )
}

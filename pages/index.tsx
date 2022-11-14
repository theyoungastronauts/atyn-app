import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import AppContainer from '../components/AppContainer'

import { NextSeo } from 'next-seo';

const Home: NextPage = (props) => {

  const title = "A Theater Near You";
  const description = "The mischievous staff at Sprocket Cinema finds more entertainment in tormenting each other than in the films they screen. Heists, initiations, awkward dates, and unconventional customer interactions all lead up to a midnight film premier – the closest to Hollywood these friends will ever be.";
  const url = "https://atny.movie/";

  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="https://theyoungastronauts.com/favicon.ico" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url: url,
          title: title,
          description: description,
          images: [
            {
              url: 'https://atny.movie/og.jpg',
              width: 1200,
              height: 627,
              alt: title,
              type: 'image/jpeg',
            },

          ],
          site_name: title,
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <AppContainer />
    </>
  )
}

export default Home

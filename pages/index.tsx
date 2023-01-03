import { useEffect, useState } from "react"
import Head from "next/head"

import { LocaleProps, WebSectionProps } from "../types/navigation"
import { PodcastProps } from "../types/podcast"

import { getPodcastsList } from "../utils/getPodcastsList"

import Container from "../components/Container"

import { PodcastCard } from "../components/podcast/PodcastCard"

export default function IndexApp(props: WebSectionProps) {
  const { section, pageContent, locale } = props

  const maintexts = pageContent.maintexts

  const [podcastList, setPodcastList] = useState<PodcastProps[]>([] as PodcastProps[])

  useEffect(() => {
    getPodcastsList().then(data => {
      setPodcastList(data || [])
    })
  }, [])

  return (
    <Container>
      <Head>
        <title>{maintexts.mainSeoTitle}</title>
        <meta name="description" content={maintexts.mainSeoDescription} />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={maintexts.mainSeoTitle} />
        <meta name="og:description" property="og:description" content={maintexts.mainSeoDescription} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_HOST} />
        <meta name="twitter:title" content={maintexts.mainSeoTitle} />
        <meta name="twitter:description" content={maintexts.mainSeoDescription} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_HOST} />
      </Head>
      <div className="grid grid-cols-1 place-items-center">
        <div className="w-full max-w-screen-2xl px-4 py-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
            {podcastList?.length > 0 && podcastList.map((podcast: PodcastProps) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export async function getStaticProps({ locale }: LocaleProps) {
  const maintexts = await import(`../language/${locale}.json`)

  return {
    props: {
      section: "home",
      pageContent: {
        maintexts: maintexts.default,
        data: {}
      },
      locale,
    },
    revalidate: 5,
  }
}

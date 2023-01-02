import { useEffect, useState } from "react"
import Head from "next/head"
import Image from "next/image"

import { LocaleProps, WebSectionProps } from "../types/navigation"

import Container from "../components/Container"
import { getData } from "../services/getData"
import { getFromLocalStorage } from '../utils/localStorage/getFromLocalStorage'
import { saveToLocalStorage } from '../utils/localStorage/saveToLocalStorage'
import { mapPodcasts } from "../mappers/mapPodcasts"
import { PodcastProps } from "../types/podcast"

export default function IndexApp(props: WebSectionProps) {
  const { section, pageContent, locale } = props

  const maintexts = pageContent.maintexts

  const [podcastList, setPodcastList] = useState<PodcastProps[]>([])

  useEffect(() => {
    const podcastLocalList = getFromLocalStorage('podcastList')
    if (podcastLocalList) {
      setPodcastList(podcastLocalList)
      saveToLocalStorage('podcastList', podcastLocalList)
    } else {
      getData({ url: "us/rss/toppodcasts/limit=100/genre=1310/json" }).then(data => {
        if (data?.feed?.entry) {
          const mappedPodcastList = mapPodcasts(data.feed.entry)
          console.log(mappedPodcastList)
          setPodcastList(mappedPodcastList)
          saveToLocalStorage('podcastList', mappedPodcastList)
        }
      })
    }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
            {podcastList.map((podcast: PodcastProps) => (
              <div key={podcast.id} className="grid grid-cols-1 place-items-center rounded-lg shadow-lg overflow-hidden">
                <div className="leading-7 w-full aspect-1">
                  <Image src={podcast.image} alt={podcast.title} width={300} height={300} />
                </div>
                <div className="text-xs">{podcast.title}</div>
                <div>{podcast.author}</div>
              </div>
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

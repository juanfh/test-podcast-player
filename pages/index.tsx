import { useEffect, useState } from "react"
import Head from "next/head"

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
      CONTAINER
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

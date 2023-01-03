import { useEffect, useState } from "react"
import Head from "next/head"
import { GetStaticPaths } from "next"

import { LocaleProps, WebSectionProps } from "../../../types/navigation"
import { PodcastWithEpisodesProps } from "../../../types/podcast"

import { deleteHtmlTags } from "../../../utils/deleteHtmlTags"
import { getShortenedString } from "../../../utils/getShortenedString"
import { getPodcastsDetail } from "../../../utils/getPodcastsDetail"

import Container from "../../../components/Container"
import { PodcastDetailCard } from "../../../components/podcast/PodcastDetailCard"
import { PodcastEpisodesList } from "../../../components/podcast/PodcastEpisodesList"

export default function PodcastDetail(props: WebSectionProps) {
  const { section, pageContent, locale } = props

  const maintexts = pageContent.maintexts
  const podcastId = pageContent.data.podcastId
  const [podcastDetail, setPodcastDetail] = useState<PodcastWithEpisodesProps | undefined>(undefined)

  const [seoTitle, setSeoTitle] = useState<string>("")
  const [seoDescription, setSeoDescription] = useState<string>("")

  useEffect(() => {
    getPodcastsDetail(podcastId).then(data => {
      console.log(data)
      setPodcastDetail(data || undefined)
      setSeoTitle(`${data?.author} - ${data?.title}`)
      data?.summary && setSeoDescription(getShortenedString(deleteHtmlTags(data.summary), 150))
    })
  }, [podcastId])

  return (
    <Container>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={seoTitle} />
        <meta name="og:description" property="og:description" content={seoDescription} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_HOST} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_HOST} />
      </Head>
      <div className="grid grid-cols-1 place-items-center">
        <div className="w-full max-w-screen-xl px-4 py-16">
          {podcastDetail && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              <PodcastDetailCard podcastDetail={podcastDetail} />
              <PodcastEpisodesList podcastDetail={podcastDetail} locale={locale} />
            </div>
          )}
        </div>
      </div>

    </Container>
  )
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}

export async function getStaticProps({ params, locale }: LocaleProps) {
  const maintexts = await import(`../../../language/${locale}.json`)
  const podcastId = params?.id || ""

  return {
    props: {
      section: "podcastdetail",
      pageContent: {
        maintexts: maintexts.default,
        data: {
          podcastId,
        }
      },
      locale,
    },
    revalidate: 5,
  }
}

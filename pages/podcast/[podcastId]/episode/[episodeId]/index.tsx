import { useEffect, useState } from "react"
import Head from "next/head"
import { GetStaticPaths } from "next"

import { LocaleProps, WebSectionProps } from "../../../../../types/navigation"
import { PodcastEpisodeProps, PodcastWithEpisodesProps } from "../../../../../types/podcast"

import { getPodcastsDetail } from "../../../../../utils/getPodcastsDetail"
import { getShortenedString } from "../../../../../utils/getShortenedString"
import { deleteHtmlTags } from "../../../../../utils/deleteHtmlTags"

import Container from "../../../../../components/Container"
import { PodcastDetailCard } from "../../../../../components/podcast/PodcastDetailCard"
import { PodcastEpisodeDetailCard } from "../../../../../components/podcast/PodcastEpisodeDetailCard"
import { Loader } from "../../../../../components/common/Loader"

export default function EpisodeDetail(props: WebSectionProps) {
  const { section, pageContent, locale } = props

  const maintexts = pageContent.maintexts
  const podcastId = pageContent.data.podcastId
  const episodeId = pageContent.data.episodeId

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [podcastDetail, setPodcastDetail] = useState<PodcastWithEpisodesProps | undefined>(undefined)
  const [episodeDetail, setEpisodeDetail] = useState<PodcastEpisodeProps | undefined>(undefined)

  const [seoTitle, setSeoTitle] = useState<string>("")
  const [seoDescription, setSeoDescription] = useState<string>("")

  useEffect(() => {
    getPodcastsDetail(podcastId).then(data => {
      setIsLoading(false)
      setPodcastDetail(data || undefined)

      const episode = data?.episodes?.find((episode: PodcastEpisodeProps) => episode.id === episodeId)
      setEpisodeDetail(episode || undefined)

      setSeoTitle(`${data?.author} - ${data?.title} - ${episode?.title}`)
      episode?.content && setSeoDescription(getShortenedString(deleteHtmlTags(episode.content), 150))
    })
  }, [podcastId, episodeId])

  return (
    <Container>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={seoTitle} />
        <meta name="og:description" property="og:description" content={seoDescription} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_HOST}/podcast/${podcastId}/episode/${episodeId}`} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_HOST}/podcast/${podcastId}/episode/${episodeId}`} />
      </Head>
      <div className="grid grid-cols-1 place-items-center">
        <div className="w-full max-w-screen-xl px-4 py-16">
          {isLoading && (
            <div className="grid grid-cols-1 place-items-center">
              <Loader />
            </div>
          )}
          {!isLoading && (!podcastDetail || !episodeDetail) && (
            <div>ERROR</div>
          )}
          {!isLoading && podcastDetail && episodeDetail && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              <PodcastDetailCard podcastDetail={podcastDetail} section={section} />
              <PodcastEpisodeDetailCard episodeDetail={episodeDetail} />
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths<{ episodeId: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}

export async function getStaticProps({ params, locale }: LocaleProps) {
  const maintexts = await import(`../../../../../language/${locale}.json`)
  const podcastId = params?.podcastId || ""
  const episodeId = params?.episodeId || ""

  return {
    props: {
      section: "episodedetail",
      pageContent: {
        maintexts: maintexts.default,
        data: {
          podcastId,
          episodeId,
        }
      },
      locale,
    },
    revalidate: 5,
  }
}

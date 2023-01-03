import { useEffect, useState } from "react"
import Head from "next/head"
import { GetStaticPaths } from "next"

import { LocaleProps, WebSectionProps } from "../../../types/navigation"
import { PodcastWithEpisodesProps } from "../../../types/podcast"

import { deleteHtmlTags } from "../../../utils/deleteHtmlTags"
import { getShortenedString } from "../../../utils/getShortenedString"

import Container from "../../../components/Container"
import { getPodcastsDetail } from "../../../utils/getPodcastsDetail"
import Image from "next/image"

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
              <div className="place-self-start bg-white rounded-lg shadow-lg overflow-hidden p-4">
                <div className="leading-0 w-full grid grid-cols-1 place-content-center aspect-1 relative rounded-full overflow-hidden">
                  <Image src={podcastDetail.image} alt={podcastDetail.title} fill className="object-cover" />
                </div>
                <div>{podcastDetail.title}</div>
                <div>{podcastDetail.author}</div>
                <div>Description</div>
                <div>{podcastDetail.summary}</div>
              </div>
              <div className="sm:col-span-2 place-self-start bg-white rounded-lg shadow-lg overflow-hidden p-4">
                <div>EPISODES: {podcastDetail.episodes.length}</div>
                <div className="grid grid-cols-1 gap-2">
                  {podcastDetail.episodes.map((episode, index) => (
                    <div key={episode.id} className={`grid grid-cols-6 ${index % 2 === 0 ? "bg-white" : "bg-zinc-100"}`}>
                      <div className="col-span-4">{episode.title}</div>
                      <div>{episode.date}</div>
                      <div>{episode.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
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

import { useEffect, useState } from "react"
import Head from "next/head"
import { GetStaticPaths } from "next"

import { LocaleProps, WebSectionProps } from "../../../types/navigation"

import Container from "../../../components/Container"
import { getPodcastsDetail } from "../../../utils/getPodcastsDetail"

export default function PodcastDetail(props: WebSectionProps) {
  const { section, pageContent, locale } = props

  const maintexts = pageContent.maintexts
  const podcastId = pageContent.data.podcastId
  const [podcastDetail, setPodcastDetail] = useState(undefined)

  useEffect(() => {
    getPodcastsDetail(podcastId).then(data => {
      setPodcastDetail(data || undefined)
    })
  }, [podcastId])

  return (
    <Container>
      <div>{podcastId}</div>
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

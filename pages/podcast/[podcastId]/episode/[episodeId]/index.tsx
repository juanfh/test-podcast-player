import { useEffect, useState } from "react"
import Head from "next/head"
import { GetStaticPaths } from "next"

import { LocaleProps, WebSectionProps } from "../../../../../types/navigation"


import Container from "../../../../../components/Container"


export default function EpisodeDetail(props: WebSectionProps) {
  const { section, pageContent, locale } = props

  const maintexts = pageContent.maintexts
  const episodeId = pageContent.data.episodeId

  return (
    <Container>
      <div>{episodeId}</div>

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
  const episodeId = params?.episodeId || ""

  return {
    props: {
      section: "podcastdetail",
      pageContent: {
        maintexts: maintexts.default,
        data: {
          episodeId,
        }
      },
      locale,
    },
    revalidate: 5,
  }
}

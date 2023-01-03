import { getFromLocalStorage } from './localStorage/getFromLocalStorage'
import { saveToLocalStorage } from './localStorage/saveToLocalStorage'

import { getData } from '../services/getData'
import Parser from 'rss-parser'
import { mapPodcastDetail } from '../mappers/mapPodcasts'

export const getPodcastsDetail = async (podcastId: string) => {

  const podcastLocalDetail = getFromLocalStorage(`podcastDetail-${podcastId}}`)

  if (podcastLocalDetail) {
    saveToLocalStorage(`podcastDetail-${podcastId}}`, podcastLocalDetail)
    return podcastLocalDetail
  } else {
    const newPodcastDetail = await getData({ url: `lookup?id=${podcastId}` })
    if (newPodcastDetail?.results[0]) {
      const parser = new Parser()
      if (newPodcastDetail.results[0]?.feedUrl) {
        try {
          const feed = await parser.parseURL(newPodcastDetail.results[0].feedUrl)
          if (feed) {
            const mappedPodcastDetail = mapPodcastDetail(podcastId, feed)
            saveToLocalStorage(`podcastDetail-${podcastId}}`, mappedPodcastDetail)
            return mappedPodcastDetail
          }
        } catch (error) {
          //console.log(error)
          return undefined
        }
      }
      return undefined

    } else {
      return undefined
    }
  }

}

import { getFromLocalStorage } from './localStorage/getFromLocalStorage'
import { saveToLocalStorage } from './localStorage/saveToLocalStorage'

import { getData } from '../services/getData'
//import { mapPodcastDetail } from '../mappers/mapPodcasts'

export const getPodcastsDetail = async (podcastId: string) => {

  const podcastLocalDetail = getFromLocalStorage(`podcastDetail-${podcastId}}`)

  if (podcastLocalDetail) {
    saveToLocalStorage(`podcastDetail-${podcastId}}`, podcastLocalDetail)
    return podcastLocalDetail
  } else {
    const newPodcastDetail = await getData({ url: `lookup?id=${podcastId}` })
    if (newPodcastDetail?.results[0]) {
      /* const mappedPodcastDetail = mapPodcastDetail(newPodcastDetail.results[0])
      saveToLocalStorage(`podcastDetail-${podcastId}}`, mappedPodcastDetail)
      return mappedPodcastDetail */
    } else {
      return undefined
    }
  }

}

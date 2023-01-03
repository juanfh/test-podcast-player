import { PodcastProps } from "../types/podcast"

export const mapPodcast = (podcast: any): PodcastProps => {
  return {
    id: podcast?.id?.attributes['im:id'] || '',
    title: podcast['im:name']?.label || '',
    author: podcast['im:artist']?.label || '',
    summary: podcast?.summary?.label || '',
    image: podcast['im:image'][2]?.label || '',
    category: podcast?.category?.attributes?.label || '',
  }
}

export const mapPodcasts = (podcasts: any): PodcastProps[] => {
  const data = (podcasts && podcasts.length > 0) ? podcasts.map((podcast: any) => {
    return mapPodcast(podcast)
  }) : []
  return data
}

/* export const mapPodcastDetail = (podcast: any): PodcastProps => {
  return {
    id: podcast?.trackId || '',
    title: podcast?.trackName || '',
    author: podcast?.artistName || '',
    summary: podcast?.summary?.label || '',
    image: podcast['im:image'][2]?.label || '',
    category: podcast?.category?.attributes?.label || '',
  }
} */
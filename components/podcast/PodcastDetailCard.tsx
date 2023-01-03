import Image from "next/image"
import { PodcastWithEpisodesProps } from "../../types/podcast"

export interface PodcastDetailCardProps {
  podcastDetail: PodcastWithEpisodesProps
}

export const PodcastDetailCard = ({ podcastDetail }: PodcastDetailCardProps) => {

  return (
    <div className="place-self-start bg-white rounded-lg shadow-lg overflow-hidden p-4">
      <div className="leading-0 w-full grid grid-cols-1 place-content-center aspect-1 relative rounded-full overflow-hidden">
        <Image src={podcastDetail.image} alt={podcastDetail.title} fill className="object-cover" />
      </div>
      <div>{podcastDetail.title}</div>
      <div>{podcastDetail.author}</div>
      <div>Description</div>
      <div>{podcastDetail.summary}</div>
    </div>
  )

}
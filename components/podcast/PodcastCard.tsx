import Image from "next/image"
import Link from "next/link"

import { PodcastProps } from "../../types/podcast"
import { getShortenedString } from "../../utils/getShortenedString"

export interface PodcastCardProps {
  podcast: PodcastProps
}

export const PodcastCard = ({ podcast }: PodcastCardProps) => {

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
      <Link href={`/podcast/${podcast.id}`}>
        <div className="leading-0 w-full grid grid-cols-1 place-content-center aspect-1 relative rounded-full overflow-hidden">
          <Image src={podcast.image} alt={podcast.title} fill className="object-cover" />
        </div>
        <div className="text-center pt-4">
          <div className="text-sm font-bold">{getShortenedString(podcast.title)}</div>
          <div className="text-xs">{getShortenedString(podcast.author)}</div>
        </div>
      </Link>
    </div>
  )

}
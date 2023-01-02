import Image from "next/image"
import { PodcastProps } from "../../types/podcast"

export interface PodcastCardProps {
  podcast: PodcastProps
}

export const PodcastCard = ({ podcast }: PodcastCardProps) => {

  return (
    <div key={podcast.id} className="grid grid-cols-1 place-items-center rounded-lg shadow-lg overflow-hidden">
      <div className="leading-7 w-full aspect-1">
        <Image src={podcast.image} alt={podcast.title} width={300} height={300} />
      </div>
      <div className="text-xs">{podcast.title}</div>
      <div>{podcast.author}</div>
    </div>
  )

}
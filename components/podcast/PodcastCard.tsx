import Image from "next/image"
import { PodcastProps } from "../../types/podcast"

export interface PodcastCardProps {
  podcast: PodcastProps
}

export const PodcastCard = ({ podcast }: PodcastCardProps) => {

  return (
    <div key={podcast.id} className="grid grid-cols-1 rounded-lg shadow-lg overflow-hidden p-4 gap-2">
      <div className="leading-0 w-full grid grid-cols-1 place-content-center aspect-1 relative rounded-full overflow-hidden">
        <Image src={podcast.image} alt={podcast.title} width={300} height={300} />
      </div>
      <div className="text-center">
        <div className="text-sm font-bold">{podcast.title}</div>
        <div className="text-xs">{podcast.author}</div>
      </div>
    </div>
  )

}
import { Interweave } from "interweave"
import Image from "next/image"
import { useEffect, useState } from "react"
import { PodcastWithEpisodesProps } from "../../types/podcast"

export interface PodcastDetailCardProps {
  podcastDetail: PodcastWithEpisodesProps
}

export const PodcastDetailCard = ({ podcastDetail }: PodcastDetailCardProps) => {

  const [description, setDescription] = useState<string>("")
  useEffect(() => {
    setDescription(podcastDetail.summary)
  }, [podcastDetail])

  return (
    <div className="sm:sticky sm:top-4 place-self-start bg-white rounded-lg shadow-lg overflow-hidden p-4">
      <div className="leading-0 w-full grid grid-cols-1 place-content-center aspect-1 relative rounded-full overflow-hidden">
        <Image src={podcastDetail.image} alt={podcastDetail.title} fill className="object-cover" />
      </div>
      <div className="pt-4 text-center">
        <div className="text-xl font-bold text-fuchsia-800">{podcastDetail.title}</div>
        <div className="text-xs text-fuchsia-600">by {podcastDetail.author}</div>
        <div className="pt-4 text-left text-sm">
          <Interweave content={description} className="wysiwygeditor" />
        </div>
      </div>
    </div>
  )

}
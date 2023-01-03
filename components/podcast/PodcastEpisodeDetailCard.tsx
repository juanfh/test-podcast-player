import { PodcastEpisodeProps } from "../../types/podcast"
import { Player } from "../common/Player"

export interface PodcastEpisodeDetailCardProps {
  episodeDetail: PodcastEpisodeProps
}

export const PodcastEpisodeDetailCard = ({ episodeDetail }: PodcastEpisodeDetailCardProps) => {
  console.log('episodeDetail', episodeDetail)
  return (
    <div className="w-full sm:col-span-2">
      <div className=" bg-white rounded-lg shadow-lg overflow-hidden p-4 mb-4">
        <div className="text-xl font-bold text-fuchsia-800">{episodeDetail.title}</div>
        <div className="pt-4 text-left text-sm">{episodeDetail.content}</div>
        <Player url={episodeDetail.url} />
      </div>
    </div>
  )

}
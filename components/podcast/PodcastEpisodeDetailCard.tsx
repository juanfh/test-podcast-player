import { PodcastEpisodeProps } from "../../types/podcast"

export interface PodcastEpisodeDetailCardProps {
  episodeDetail: PodcastEpisodeProps
}

export const PodcastEpisodeDetailCard = ({ episodeDetail }: PodcastEpisodeDetailCardProps) => {

  return (
    <div className="w-full sm:col-span-2">
      <div className=" bg-white rounded-lg shadow-lg overflow-hidden p-4 mb-4">
        DETAIL
      </div>
    </div>
  )

}
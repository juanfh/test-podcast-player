import { PodcastWithEpisodesProps } from "../../types/podcast"
import { formatDate } from "../../utils/formatDate"
import { formatSecondsToHours } from "../../utils/formatSecondsToHours"


export interface PodcastEpisodesListProps {
  podcastDetail: PodcastWithEpisodesProps
  locale: string
  maintexts: any
}

export const PodcastEpisodesList = ({ podcastDetail, locale, maintexts }: PodcastEpisodesListProps) => {

  return (
    <div className="w-full sm:col-span-2">
      <div className=" bg-white rounded-lg shadow-lg overflow-hidden p-4 mb-4">
        <div className="uppercase text-xl font-bold text-fuchsia-800">{maintexts.episodes}: {podcastDetail.episodes.length}</div>
      </div>
      <div className=" bg-white rounded-lg shadow-lg overflow-hidden p-4">
        <div className="grid grid-cols-1">
          <div className="hidden md:grid md:grid-cols-6 items-center px-2 py-1 font-bold text-fuchsia-800">
            <div className="col-span-4">{maintexts.title}</div>
            <div className="text-right">{maintexts.date}</div>
            <div className="text-right">{maintexts.duration}</div>
          </div>
          {podcastDetail.episodes.map((episode, index) => (
            <div key={episode.id} className={`grid grid-cols-1 md:grid-cols-6 items-center ${index % 2 === 0 ? "bg-white" : "bg-zinc-100"} px-2 py-1`}>
              <div className="md:col-span-4 text-sm text-fuchsia-600">{episode.title}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2">
                <div className="text-sm md:text-right">{formatDate(episode.date, locale)}</div>
                <div className="text-sm md:text-right">{formatSecondsToHours(episode.duration)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

}
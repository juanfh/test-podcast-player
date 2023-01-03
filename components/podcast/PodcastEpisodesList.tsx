import { PodcastWithEpisodesProps } from "../../types/podcast"

export interface PodcastEpisodesListProps {
  podcastDetail: PodcastWithEpisodesProps
}

export const PodcastEpisodesList = ({ podcastDetail }: PodcastEpisodesListProps) => {

  return (
    <div className="sm:col-span-2 place-self-start bg-white rounded-lg shadow-lg overflow-hidden p-4">
      <div>EPISODES: {podcastDetail.episodes.length}</div>
      <div className="grid grid-cols-1 gap-2">
        {podcastDetail.episodes.map((episode, index) => (
          <div key={episode.id} className={`grid grid-cols-6 ${index % 2 === 0 ? "bg-white" : "bg-zinc-100"}`}>
            <div className="col-span-4">{episode.title}</div>
            <div>{episode.date}</div>
            <div>{episode.duration}</div>
          </div>
        ))}
      </div>
    </div>
  )

}
import Link from "next/link"
import { PodcastWithEpisodesProps } from "../../types/podcast"
import { formatDate } from "../../utils/formatDate"
import { formatSecondsToHours } from "../../utils/formatSecondsToHours"
import { Icon } from "../common/Icon"


export interface PodcastEpisodesListProps {
  podcastDetail: PodcastWithEpisodesProps
  locale: string
  maintexts: any
}

export const PodcastEpisodesList = ({ podcastDetail, locale, maintexts }: PodcastEpisodesListProps) => {

  return (
    <div className="w-full sm:col-span-2">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 mb-4">
        <div className="uppercase text-xl font-bold text-fuchsia-800">{maintexts.episodes}: {podcastDetail.episodes.length}</div>
      </div>
      <div className=" bg-white rounded-lg shadow-lg overflow-hidden p-4">
        <div className="grid grid-cols-1">
          <div className="hidden md:grid md:grid-cols-6 items-center px-2 py-1 font-bold text-fuchsia-800">
            <div className="col-span-4 flex items-center gap-1">
              <div className="text-sm"><Icon icon="podcast" /></div>
              <div className="text-sm">{maintexts.title}</div>
            </div>
            <div className="flex justify-end items-center gap-1">
              <div className="text-xs"><Icon icon="calendar-days" /></div>
              <div className="text-sm">{maintexts.date}</div>
            </div>
            <div className="flex justify-end items-center gap-1">
              <div className="text-xs"><Icon icon="clock" /></div>
              <div className="text-sm">{maintexts.duration}</div>
            </div>
          </div>
          {podcastDetail.episodes.map((episode, index) => (
            <div key={episode.id} className={`grid grid-cols-1 md:grid-cols-6 items-center ${index % 2 === 0 ? "bg-white" : "bg-zinc-100"} p-2`}>
              <Link href={`/podcast/${podcastDetail.id}/episode/${episode.id}`} className="md:col-span-4">
                <div className="group text-sm text-fuchsia-600 flex items-center gap-2 pb-1 md:pb-0">
                  <div className="grid grid-cols-1 place-items-center">
                    <div className="grid grid-cols-1 place-items-center bg-fuchsia-800 group-hover:bg-fuchsia-900 transition-colors duration-300 text-white text-xs rounded-full w-7 h-7">
                      <Icon icon="volume-high" />
                    </div>
                  </div>
                  <div className="w-full grow group-hover:text-fuchsia-800 transition-colors duration-300">
                    {episode.title}
                  </div>
                </div>
              </Link>
              <div className="grid grid-cols-1 md:grid md:grid-cols-2 md:col-span-2 md:gap-1">
                <div className="text-sm md:text-right flex md:block gap-1">
                  <div className="flex md:hidden items-center gap-1">
                    <div className="text-xs"><Icon icon="calendar-days" /></div>
                    <div className="text-sm">{maintexts.date}:</div>
                  </div>
                  {episode.date ? formatDate(episode.date, locale) : "-"}
                </div>
                <div className="text-sm md:text-right flex md:block gap-1">
                  <div className="flex md:hidden items-center gap-1">
                    <div className="text-xs"><Icon icon="clock" /></div>
                    <div className="text-sm">{maintexts.duration}:</div>
                  </div>
                  {episode.duration ? formatSecondsToHours(episode.duration) : "-"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

}
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

export interface PlayerProps {
  url: string
}

export const Player = ({ url }: PlayerProps) => {

  return (
    <AudioPlayer autoPlay src={url} onPlay={e => console.log("onPlay")} />
  )
}
import thumbnail from './oneokrock.jpg'
import video from './oneokrock.mp4'
import {prepareSong} from '../utils'

export default prepareSong({
  artist: 'ONE OK ROCK',
  name: 'Mighty Long Fall',
  thumbnail,
  notes: [
    {keys: ['q', 'd'], timepoint: 2},
    {keys: ['q', 's'], timepoint: 4},
    {keys: ['q'], timepoint: 4.5}
  ],
  video
})

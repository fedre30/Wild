import thumbnail from '../jet.jpg'
import video from '../jet.mp4'
import {prepareSong} from '../../utils'

export default prepareSong({
  artist: 'Jet',
  name: 'Are you gonna be my girl?',
  thumbnail,
  notes: [
    {keys: ['q', 'd'], timepoint: 2},
    {keys: ['q', 's'], timepoint: 4},
    {keys: ['q'], timepoint: 4.5}
  ],
  video
})

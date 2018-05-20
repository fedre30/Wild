import thumbnail from './oneokrock.jpg'
import video from './yubaba.mov'
import {prepareSong} from '../utils'

export default prepareSong({
  artist: 'Following Chihiro',
  name: 'Yubaba',
  thumbnail,
  notes: [
    {keys: ['q', 'd'], timepoint: 2},
    {keys: ['q', 's'], timepoint: 4},
    {keys: ['q'], timepoint: 4.5}
  ],
  video
})

import thumbnail from '../jet.jpg'
import video from '../jet.mov'
import {prepareSong} from '../../utils'

export default prepareSong({
  artist: 'Jet',
  name: 'Are you gonna be my girl?',
  thumbnail,
  notes: [
    {keys: ['q'], timepoint: 4.3},
    {keys: ['d'], timepoint: 4.8},
    {keys: ['s'], timepoint: 5.3},
    {keys: ['f'], timepoint: 5.8},
    {keys: ['q'], timepoint: 6.5},
    {keys: ['d'], timepoint: 7},
    {keys: ['s'], timepoint: 7.5}
    
  ],
  video
})

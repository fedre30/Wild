import thumbnail from './oneokrock.jpg'
import video from './oneokrock.mp4'
import {prepareSong} from '../utils'

export default prepareSong({
  artist: 'ONE OK ROCK',
  name: 'Mighty Long Fall',
  thumbnail,
  notes: [
    {keys: ['q'], timepoint: 2},
    {keys: ['q'], timepoint: 3},
    {keys: ['q'], timepoint: 4},
    {keys: ['q'], timepoint: 5},
    {keys: ['q'], timepoint: 6},
    {keys: ['q'], timepoint: 7},
    {keys: ['q'], timepoint: 8},
    {keys: ['q'], timepoint: 9},
    {keys: ['q'], timepoint: 10},
    {keys: ['q'], timepoint: 11},
    {keys: ['q'], timepoint: 12},
    {keys: ['q'], timepoint: 13},
  ],
  video
})

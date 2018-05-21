// LIBRARIES
import _ from 'lodash'

export function prepareSong (song) {
  const songCopy = _.cloneDeep(song)
  songCopy.notes = songCopy.notes.map((note, index) => {
    note.id = index
    return note
  })
  return songCopy
}

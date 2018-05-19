<template>
  <div class="game">
    <h1>Guitar Hero</h1>
    <Score :score="score"></Score>
    <div class="container">
      <Column :keyboard="column.keyboard" :highlighted="column.highlighted" v-for="column in columns" :key="column.keyboard">
        <Note class="note" v-for="note in notes" :key="note.id" :style="{'--y': `${note.y * 100}%`}" v-if="note.keys.includes(column.keyboard)"></Note>
      </Column>
      <play-zone class="playZone" :style="{'--playZoneY': `${playZoneY}%`, '--playZoneDelta': `${playZoneSpace}%`}"></play-zone>
    </div>
  </div>
</template>

<script>

// COMPONENTS
import Column from './wild_Column.vue'
import Note from './wild_note.vue'
import Score from './wild_score.vue'
import PlayZone from './wild_playZone.vue'

// ASSETS
import song1 from '../assets/song1'

// LIBRARIES
import _ from 'lodash'

// INITIALIZATION
const lookAheadTime = 4
const lookBackTime = 0.5
const playZoneDelta = 0.1

function prepareSong (song) {
  const songCopy = _.cloneDeep(song)
  songCopy.notes = songCopy.notes.map((note, index) => {
    note.id = index
    return note
  })
  return songCopy
}

export default {
  components: {Column, Note, Score, PlayZone},
  name: 'Game',
  data() {
    return {
      columns: [
        {
          keyboard: 'z',
          highlighted: false
        }, {
          keyboard: 'q',
          highlighted: false
        }, {
          keyboard: 's',
          highlighted: false
        }, {
          keyboard: 'd',
          highlighted: false
        }
      ],
      notes: [],
      song: prepareSong(song1),
      currentSongTime: 0,
      previousTime: null,
      playedNotes: [],
      score: 0
    }
  },
  created: function () {
    window.addEventListener('keydown', this.keydown)
    window.addEventListener('keyup', this.keyup)
  },

  computed: {
    playZoneY () {
      return lookAheadTime / (lookAheadTime + lookBackTime) * 100
    },

    playZoneSpace () {
      return playZoneDelta / (lookAheadTime + lookBackTime) * 100
    }
  },

  methods: {

    // VERIFY WHETHER USER PLAYS GOOD NOTES OR NOT

    verifyNotes () {
      const notesToVerify = this.notes.filter((note) => note.timepoint < this.currentSongTime + playZoneDelta  && note.timepoint > this.currentSongTime - playZoneDelta)
      let mistake = false

      if (notesToVerify.length === 0) {
        mistake = true
      }
      else {
        const chord = notesToVerify.sort((a, b) => a.timepoint < b.timepoint ? -1 : 1)[0]

        for (let i = 0; i < this.columns.length; i++) {
          const column = this.columns[i]
          if (column.highlighted && chord.keys.indexOf(column.keyboard) === -1) {
            mistake = true
          }
          else if (!column.highlighted && chord.keys.indexOf(column.keyboard) !== -1) {
            mistake = true
          }
        }
        this.playedNotes.push(chord.id)
      }

      if (mistake) {
        console.log('mistake')
      }
      else {
        this.refreshScore()
      }
    },

    // SCORE

    refreshScore () {
      this.score += 50
    },

    // KEYUP AND KEYDOWN FUNCTIONS TO BE ATTACHED TO EVENTS

    keyup: function (e) {
      const index = this.columns.findIndex(function (column) {
        return e.key === column.keyboard
      })
      if (index <= -1) {
        return
      }
      this.columns[index].highlighted = false
    },
    keydown: function (e) {
      if (e.key === ' ') {
        this.verifyNotes()
        return
      }
      const index = this.columns.findIndex(function (column) {
        return e.key === column.keyboard
      })
      if (index <= -1) {
        return
      }
      this.columns[index].highlighted = true
    },

    // FALLING ANIMATION OF NOTES INSIDE WINDOW ACCORDING TO CURRENTIME AND SONG DURATION

    animate () {
      const currentTime = new Date().getTime() / 1000
      const deltaTime = this.previousTime !== null ? currentTime - this.previousTime : 0
      this.currentSongTime += deltaTime

      const upperTime = lookAheadTime + this.currentSongTime
      const bottomTime = this.currentSongTime - lookBackTime
      const notesArray = this.song.notes.filter((note) => note.timepoint < upperTime && note.timepoint > bottomTime && this.playedNotes.findIndex((playedNoteID) => playedNoteID === note.id) === -1)
      this.notes = notesArray.map((note) => {
        const noteCopy = _.cloneDeep(note)
        noteCopy.y = (noteCopy.timepoint - bottomTime) / (upperTime - bottomTime)
        return noteCopy
      })

      this.previousTime = currentTime
      requestAnimationFrame(() => this.animate())
    },

    startGame () {
      this.currentSongTime = 0;
      requestAnimationFrame(() => this.animate())
    }
  },

  mounted () {
    this.startGame()
  },
  beforeDestroy: function () {
    window.removeEventListener('keydown', this.keydown)
    window.removeEventListener('keyup', this.keyup)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.container
  display: flex
  justify-content: center
  position: relative
</style>

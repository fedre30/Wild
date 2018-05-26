<template>
  <div class="game">
    <template v-if="typeof song !== 'undefined'">
      <video :src="song.video" ref="video"></video>
      <header class="header white">
        <Score :score="score"></Score>
      </header>
      <div class="container">
        <Column :keyboard="column.keyboard" :highlighted="column.highlighted" v-for="column in columns" :key="column.keyboard">
          <Note class="note" v-for="note in notes" :key="note.id" :style="{'--y': `${note.y * 100}%`}" v-if="note.keys.includes(column.keyboard)"></Note>
          <play-zone class="playZone" :style="{'--playZoneY': `${playZoneY}%`, '--playZoneDelta': `${playZoneSpace}%`}"></play-zone>
        </Column>
      </div>
    </template>
  </div>
</template>

<script>

// COMPONENTS
import Column from './wild_Column.vue'
import Note from './wild_note.vue'
import Score from './wild_score.vue'
import PlayZone from './wild_playZone.vue'

// LIBRARIES
import _ from 'lodash'

// INITIALIZATION
const lookAheadTime = 4
const lookBackTime = 0.5
const playZoneDelta = 0.5
let correctNotes = 0
const editMode = true

export default {
  components: {Column, Note, Score, PlayZone},
  name: 'Game',
  data () {
    return {
      columns: [
        {
          keyboard: 'q',
          highlighted: false
        }, {
          keyboard: 's',
          highlighted: false
        }, {
          keyboard: 'd',
          highlighted: false
        }, {
          keyboard: 'f',
          highlighted: false
        }
      ],
      notes: [],
      previousTime: null,
      playedNotes: [],
      score: 0,
      editor: []
    }
  },
  created: function () {
    document.addEventListener('keydown', this.keydown)
    document.addEventListener('keyup', this.keyup)
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
    currentSongTime () {
      try {
        return this.$refs.video.currentTime
      } catch(exc) {
        return 0
      }
    },

    verifyNotes () {
      const notesToVerify = this.notes.filter((note) => note.timepoint < this.currentSongTime() + playZoneDelta && note.timepoint > this.currentSongTime() - playZoneDelta)
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
        this.resetCombo()
      }
      else {
        this.refreshScore()
        if (correctNotes % 10 === 0) {
          this.getCombo()
        }
      }
    },

    // SCORE

    refreshScore () {
      correctNotes++
      this.score += 50

    },

    getCombo () {
      this.score = Math.floor(this.score * 1.5)
    },
    resetCombo (){
      correctNotes = 0
    },

    // KEYUP AND KEYDOWN FUNCTIONS TO BE ATTACHED TO EVENTS

    keyup: function (e){

      const index = this.columns.findIndex(function (column) {
        return e.key === column.keyboard
      })
      if (index <= -1) {
        return
      }
      this.columns[index].highlighted = false
    },
    keydown: function (e) {
      if (editMode) {
        if (e.key.toLowerCase() === 'o') {
          console.log(JSON.stringify(this.editor, null, 2))
          return
        }

        if (e.key === ' ') {
          this.editor.push({keys: this.columns.filter(c => c.highlighted).map(c => c.keyboard), timepoint: this.currentSongTime()})
        }
      }

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

    // FALLING ANIMATION OF NOTES INSIDE WINDOW ACCORDING TO CURRENTTIME AND SONG DURATION

    animate () {
      const currentTime = new Date().getTime() / 1000
      const deltaTime = this.previousTime !== null ? currentTime - this.previousTime : 0

      const upperTime = lookAheadTime + this.currentSongTime()
      const bottomTime = this.currentSongTime() - lookBackTime
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
      requestAnimationFrame(() => this.animate())

      // FAKE CLICK
      const videoEl = this.$refs.video
      function videoClickListener () {
        videoEl.play()
        videoEl.removeEventListener('click', videoClickListener)
      }
      videoEl.addEventListener('click', videoClickListener)
      videoEl.click()
    }
  },

  props: {
    song: {
      type: Object,
      required: true
    }
  },

  mounted () {
    if (this.song) {
      this.startGame()
    } else {
      this.$router.replace({name: 'home'})
    }
  },
  beforeDestroy: function () {
    document.removeEventListener('keydown', this.keydown)
    document.removeEventListener('keyup', this.keyup)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
video
  width: 100%
  height: 100vh
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 1

.header
  width: 100%
  z-index: 2000000
  color: white
  height: 10vh
.container
  display: flex
  justify-content: center
  position: relative
  z-index: 10000
  margin-top: 4rem
.white
  color: white
  text-align: center
  z-index: 30000

</style>

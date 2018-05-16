<template>
  <div class="game">
    <h1>Guitar Hero - {{ currentSongTimeInSec }}</h1>
    <div class="container">
      <Column :keyboard="column.keyboard" :highlighted="column.highlighted" v-for="column in columns" :key="column.keyboard">
        <div class="note" v-for="note in notes" :key="note.id" :style="{'--y': `${note.y * 100}%`}" v-if="note.keys.includes(column.keyboard)"></div>
      </Column>
    </div>
  </div>
</template>

<script>

import Column from './Column.vue'
import song1 from '../assets/song1'
import _ from 'lodash'

const lookAheadTime = 4
const lookBackTime = 0.5

function prepareSong(song){
  const songCopy = _.cloneDeep(song)
  songCopy.notes = songCopy.notes.map((note, index) => {
    note.id = index
    return note
  })
  return songCopy
}

export default {
  components: {Column},
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
      previousTime: null
    }
  },
  created: function () {
    window.addEventListener('keyup', this.keyup)
    window.addEventListener('keydown', this.keydown)
  },

  computed: {
    currentSongTimeInSec() {
      // TODO: remove after debug
      return Math.floor(this.currentSongTime)
    }
  },

  methods: {
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
      const index = this.columns.findIndex(function (column) {
        return e.key === column.keyboard
      })
      if (index <= -1) {
        return
      }
      this.columns[index].highlighted = true
    },

    animate(){
      const currentTime = new Date().getTime() / 1000
      const deltaTime = this.previousTime !== null ? currentTime - this.previousTime : 0
      this.currentSongTime += deltaTime

      const upperTime = lookAheadTime + this.currentSongTime
      const bottomTime = this.currentSongTime - lookBackTime
      const notesArray = this.song.notes.filter((note) => note.timepoint < upperTime && note.timepoint > bottomTime)
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
    window.removeEventListener('keyup', this.keyup, this.keyup)
    window.removeEventListener('keydown', this.keyup, this.keydown)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.container
  display: flex
  justify-content: center
.note
  width: 30px
  height: 30px
  border-radius: 100px
  background-color: black
  position: absolute
  bottom: var(--y)




</style>

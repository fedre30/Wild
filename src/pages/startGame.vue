<template>
  <div class="startGame">
    <h1 class="title">WILD - Keyboard Hero</h1>
    <div class="thumbnails">
      <thumbnail v-for="song in songs" :key="song.title" :song="song"></thumbnail>
    </div>
    <div class="instructions">
      <h3>How to play</h3>
      <p>Press right key and spacebar simultaneously when the note gets the red line</p>
      <ul>Difficulties:
        <li><span class="bold">Easy</span>: Three columns. Keys: Q, S, D</li>
        <li><span class="bold">Intermediate</span>: Four columns. Keys: Q, S, D, F</li>
        <li><span class="bold">Hard</span>: Five columns. Keys: Q, S, D, F, G</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Thumbnail from '../components/wild_thumbnail.vue'
import MightyLongFall from '../assets/songs/MightyLongFall'
import BeMyGirl from '../assets/songs/beMyGirl'

export default {
  components: {Thumbnail},
  name: 'StartGame',
  data () {
    return {
      songs: [
        MightyLongFall,
        BeMyGirl
      ]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.startGame
  width: 100%
  height: 100vh
  margin: 0
  background-color: black
  .title
    color: white
    margin: 0 0 5rem 0
    font-size: 5rem
.thumbnails
  width: 50%
  display: flex
  justify-content: space-between
  margin: 0 auto
  color: white

.instructions
  color: white

  li
    list-style: none

.bold
  font-weight: 800
  color: red

</style>

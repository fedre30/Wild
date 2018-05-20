<template>
  <div class="startGame">
    <h1 class="title">WILD - Keyboard Hero</h1>
    <div class="thumbnails">
      <thumbnail v-for="song in songs" :key="song.title" :song="song"></thumbnail>
    </div>
  </div>
</template>

<script>
import Thumbnail from '../components/wild_thumbnail.vue'
import MightyLongFall from '../assets/MightyLongFall'
import Yubaba from '../assets/Yubaba'

export default {
  components: {Thumbnail},
  name: 'StartGame',
  data () {
    return {
      songs: [
        MightyLongFall,
        Yubaba
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
    margin: 0 0 3rem 0
.thumbnails
  width: 50%
  display: flex
  justify-content: space-between
  margin: 0 auto
  color: white

</style>

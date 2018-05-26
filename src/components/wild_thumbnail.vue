<template>
    <div class="thumbnail">
        <div class="thumb-image"><img :src="song.thumbnail"></div>
        <h3> {{ song.name }}</h3>
        <p>{{ song.artist }}</p>
      <router-link class = "thumbnail-link" :to="{name: 'game', params: {song: song}}"><div class="button-play">Easy</div></router-link>
      <router-link class = "thumbnail-link" :to="{name: 'game', params: {song: song}}"><div class="button-play">Intermediate</div></router-link>
      <router-link class = "thumbnail-link" :to="{name: 'game', params: {song: song}}"><div class="button-play">Hard</div></router-link>
    </div>
</template>

<script>
export default {
  name: 'Thumbnail',
  props: {
    song: {
      type: Object,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.thumbnail
  color: white
  border: 1px solid white
  padding: 1rem
  cursor: pointer

  .thumb-image
    width: 300px
    height: 300px
    img
      width: 100%

.thumbnail-link
  text-decoration: none
.button-play
  width: 100px
  background-color: white
  color: black
  text-align: center
  padding: 1.5rem
  line-height: 5px
  margin: 3vh auto
  border-radius: 1rem
  font-size: 1.2rem

.button-play:hover
  background-color: darkred
  color: white

</style>

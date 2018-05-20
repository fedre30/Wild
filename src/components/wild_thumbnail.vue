<template>
  <router-link :to="{name: 'game', params: {song: song}}">
    <div class="thumbnail">
        <div class="thumb-image"><img :src="song.thumbnail"></div>
        <h3> {{ song.title }}</h3>
        <p>{{ song.artist }}</p>
    </div>
  </router-link>
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
</style>

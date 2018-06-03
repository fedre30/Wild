<template>
    <div class="score">Score: {{ score }}</div>
</template>

<script>
export default {
  name: 'Score',
  props: {
    score: {
      type: Number,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.score
  font-size: 3rem
  width: 300px
  height: 50px
  background-color: darkred
  padding: 1rem
  line-height: 50px
  border-radius: 0.2em
  color: white
  font-weight: 800
  z-index: 2000000
  position: fixed
  top: 3vh
  left: 42%
</style>

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
  font-size: 1.5rem
  color: black
</style>

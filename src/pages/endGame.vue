<template>
  <div class="endGame">
    <Score :score="this.score">Score: {{score }}</Score>
    <div class="rate"> Rate: {{ rate }} %</div>
    <div class="button-replay">
      <router-link :to="{name: 'home'}">Replay</router-link>
    </div>
  </div>
</template>

<script>
import Score from '../components/wild_score.vue'

export default {
  components: {Score},
  name: 'endGame',

  props: {
    score: {
      type: Number,
      required: true
    } ,
    rate: {
      type: Number,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.endGame
  width: 100%
  height: 100vh
  background-color: black
  color: white
  margin: 0
  position: relative

.rate
  position: absolute
  top: 30%
  left: 45%
  font-size: 2rem

.button-replay
  position: absolute
  top: 50%
  left: 45%
  width: 200px
  height: 50px
  background-color: darkred
  border-radius: 1rem
  padding: 1rem
  line-height: 50px
  a
    color: white
    font-size: 3rem
    text-decoration: none
  &:hover
    background-color: white
    a
      color: black
</style>

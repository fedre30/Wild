<template>
  <div>
    <div class="column">
      <slot></slot>
    </div>
    <div class="letters" :class="{'right' : highlighted}">{{ keyboard.toUpperCase() }}</div>
  </div>
</template>

<script>
export default {
  name: 'Column',

  props: {
    keyboard: {
      type: String,
      required: true
    },
    highlighted: {
      type: Boolean,
      default: false,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.column
  width: 15vw
  height: 75vh
  border: 1px solid darkgrey
  margin: 0 20px
  transform: perspective(650px) rotateX(25deg)
  transform-origin: 50% 100%
  text-align: justify
  font-weight: bold
  overflow: hidden

.letters
  color: white
  font-weight: bold
  font-size: 2rem

.right
  background-color: green
  width: 90%
  text-align: center
  margin: 0 auto

</style>

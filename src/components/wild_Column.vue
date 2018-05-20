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
  height: 70vh
  border: 1px solid white
  margin: 0 20px
  position: relative

.letters
  color: white
  font-weight: bold
  font-size: 2rem

.right
  background-color: green

</style>

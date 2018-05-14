<template>
  <div>
    <div class="column"></div>
    <div :class="{'active' : highlighted}">{{ keyboard }}</div>

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
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.column
  width: 15vw
  height: 70vh
  border: 1px solid grey
  margin: 0 20px
.active
  color: white
  background-color: red
  width: 2rem
  height: 2rem

</style>

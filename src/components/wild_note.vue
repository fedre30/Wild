<template>
      <div class="note"></div>
</template>

<script>
export default {
  name: 'Note',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.note
  width: 30px
  height: 30px
  border-radius: 100px
  background-color: darkred
  position: absolute
  bottom: var(--y)
  left: 50%
  border: 2px solid white
</style>

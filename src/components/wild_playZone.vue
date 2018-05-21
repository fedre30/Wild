<template>
    <div class="playZone"></div>
</template>

<script>
export default {
  name: 'Playzone',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.playZone
  background-color: red
  width: 100%
  height: 4px
  position: absolute
  top: var(--playZoneY)
</style>

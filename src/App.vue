<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import Game from './pages/startGame.vue'

export default {
  components: {Game},
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: black;
}
</style>

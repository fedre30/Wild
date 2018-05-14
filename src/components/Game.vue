<template>
  <div class="game">
    <h1>Guitar Hero</h1>
    <div class="container">
      <Column :keyboard="column.keyboard" :highlighted="column.highlighted" v-for="column in columns" :key="column.keyboard"></Column>
    </div>
  </div>
</template>

<script>

import Column from './Column.vue'

export default {
  components: {Column},
  name: 'Game',
  data() {
    return {
      columns: [
        {
          keyboard: 'z',
          highlighted: false
        }, {
          keyboard: 'q',
          highlighted: false
        }, {
          keyboard: 's',
          highlighted: false
        }, {
          keyboard: 'd',
          highlighted: false
        }
      ]
    };
  },
  created: function () {
    window.addEventListener('keyup', this.keyup)
    window.addEventListener('keydown', this.keydown)
  },

  methods: {
    keyup: function (e) {
      const index = this.columns.findIndex(function (column) {
        return e.key === column.keyboard
      })
      if (index <= -1) {
        return
      }
      this.columns[index].highlighted = false
    },
    keydown: function (e) {
      const index = this.columns.findIndex(function (column) {
        return e.key === column.keyboard
      })
      if (index <= -1) {
        return
      }
      this.columns[index].highlighted = true
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('keyup', this.keyup, this.keyup)
    window.removeEventListener('keydown', this.keyup, this.keydown)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.container
  display: flex
  justify-content: center


</style>

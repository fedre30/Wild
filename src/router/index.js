import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/wild_Game.vue'

Vue.use(Router)
Vue.use(Game)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Game',
      component: Game
    }
  ]
})

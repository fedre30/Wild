import Vue from 'vue'
import Router from 'vue-router'
import startGame from '@/pages/startGame.vue'
import Game from '@/components/wild_Game.vue'

Vue.use(Router)
Vue.use(Game)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: startGame
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
      props: true
    }
  ]
})

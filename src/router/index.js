import Vue from 'vue'
import Router from 'vue-router'
import startGame from '@/pages/startGame.vue'
import Game from '@/components/wild_Game.vue'
import endGame from '@/pages/endGame.vue'

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
    },
    {
      path: '/endGame',
      name: 'endGame',
      component: endGame,
      props: true
    }
  ]
})


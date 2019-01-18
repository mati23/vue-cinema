import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/Login.vue'
import Filme from './components/cadastro/CadastroFilme.vue'
import Createcinema from './components/crudCinema/Createcinema.vue';
import Createsessao from './components/crudSessao/Createsessao.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cadastro/filme',
      name: 'cadastro_filme',
      component: Filme
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cadastro/cinema',
      name: 'cadastro_cinema',
      component: Createcinema
    },
    {
      path: '/cadastro/sessao',
      name: 'cadastro_sessao',
      component: Createsessao
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

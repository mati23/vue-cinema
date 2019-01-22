import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/Login.vue'
import Createcinema from './components/crudCinema/Createcinema.vue';
import Createsessao from './components/crudSessao/Createsessao.vue';
import Readcinema from './components/crudCinema/Readcinema.vue';
import CadastroFilme from './components/cadastro/CadastroFilme.vue'
import ListarFilmes from './components/listagem/ListarFilmes.vue'
import Readsessao from './components/crudSessao/Readsessao.vue'

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
      path: '/listagem/filmes',
      name: 'listagem_filmes',
      component: ListarFilmes
    },
    {
      path: '/cadastro/filme',
      name: 'cadastro_filme',
      component: CadastroFilme
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/listagem/cinemas',
      name: 'listagem_cinemas',
      component: Readcinema,
      props: true
    },
    {
      path: '/cadastro/cinema/:id?',
      name: 'cadastro_cinema',
      component: Createcinema,
      props: true
    },
    {
      path: '/cadastro/sessao/:id?',
      name: 'cadastro_sessao',
      component: Createsessao,
      props: true
    },
    {
      path: '/listagem/sessao',
      name: 'listagem_sessao',
      component: Readsessao
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

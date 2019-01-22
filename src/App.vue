<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        
        <span class="font-weight-light">Ingresso Online </span>
        <span >{{usuario}}</span>
        
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="/login"
        target=""
      >
        <span class="mr-2">Login</span>        
      </v-btn> 
      <v-btn
        flat
        href="/listagem/filmes"
        target=""
      >
        <span class="mr-2">Filmes</span>        
      </v-btn>
       <v-btn
        flat
        href="/listagem/cinemas"
        target=""
      >
        <span class="mr-2">Cinemas</span>        
      </v-btn>
      <v-btn
        flat
        href="/listagem/sessao"
        target=""
      >
        <span class="mr-2">Listar Sessão</span>        
      </v-btn>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target=""
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view @mudarsessao="atualizaSessao"/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Login from './components/Login'
import CadastroFilme from './components/cadastro/CadastroFilme'
import ListarFilmes from './components/listagem/ListarFilmes'



export default {
  
  name: 'App',
  components: {
    HelloWorld,
    CadastroFilme,
    ListarFilmes,
    Login
  },
  data () {
    return {
      usuario: "mateus",
    }
  },
  mounted(){
    this.nomeDoUsuario() 
  },
  methods:{
    atualizaSessao(){
      console.log('atualiza sessao')
      this.usuario = "TEste" 
    },
    nomeDoUsuario(){
      console.log(window.localStorage.getItem('nomedousuario')) 
      this.usuario = window.localStorage.getItem('nomedousuario')
    }
  },
  computed:{
    
  }
  
}
</script>
 
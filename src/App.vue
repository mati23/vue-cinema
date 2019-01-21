<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
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
        href="/cadastro/sessao"
        target=""
      >
        <span class="mr-2">Cadastrar Sessão</span>        
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
      <router-view/>
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
    ListarFilmes
  },
  data () {
    return {
      //
    }
  }
}
</script>

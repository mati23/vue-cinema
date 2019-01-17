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
        <span class="mr-2">Filme</span>        
      </v-btn> 
      <v-btn
        flat
        href="/cadastro/filme"
        target=""
      >
        <span class="mr-2">Cadastro Filme</span>        
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
import Filme from './components/cadastro/CadastroFilme'


export default {
  name: 'App',
  components: {
    HelloWorld,
    Filme
  },
  data () {
    return {
      //
    }
  }
}
</script>

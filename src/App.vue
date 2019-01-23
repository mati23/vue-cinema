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
        <span class="mr-2">Listar Sessãos</span>        
      </v-btn>
      <v-btn
        flat
        href="/meusingressos"
        target=""
      >
        <span class="mr-2">Meus Ingressos</span>        
      </v-btn>
      <v-flex xs2 sm2>
        <v-overflow-btn
          :items="dropdown_usuario"
          label= "Minha Conta"
          target="#dropdown-example"
        ></v-overflow-btn>
      </v-flex>
      
    </v-toolbar>
    <v-content>
      <router-view @mudasessao="atualizaSessao($event)"/>
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
      dropdown_usuario: ['Editar Cadastro','Sair'],
      usuario: "",
      nomeUsuario: this.usuario
    }
  },
  mounted(){
    
  },
  methods:{
    atualizaSessao(nomeAtualizado){
      console.log('atualiza sessao')
      this.usuario = nomeAtualizado
    }
    
  },
  computed:{
    
  },
  watch: {
    // nomeDoUsuario(){
    //   console.log(sessionStorage.getItem('nomedousuario') + 'teste2')
    //   this.usuario = sessionStorage.getItem('nomedousuario')
    // }
  }
  
}
</script>
 <style>
 
 </style>
 
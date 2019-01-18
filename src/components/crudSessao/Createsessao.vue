<template>
  <form>
    <v-select
      v-model="sessaoCinema"
      :items="cinemalist"
      :item-text="'nome'"
      label="Cinema"
      required
    ></v-select>
    <v-select
      v-model="sessaoFilme"
      :items="filmelist"
      :item-text="'titulo'"
      label="Filme"
      required
    ></v-select>
    <v-text-field
      v-model="sessaoData"
      label="Data"
      required
    ></v-text-field>
    <v-text-field
      v-model="sessaoHora"
      label="Horario"
      required
    ></v-text-field>
    <v-text-field
      v-model="preco"
      label="Preço"
      required
    ></v-text-field>
    <v-btn @click="salvarcadastro" color="success">Salvar</v-btn>
  </form>
</template>

<script>
import axios from 'axios'

  export default {
    data: () => ({
        sessaoCinema:'', sessaoFilme:'', cinemalist:[], filmelist:[],
        sessaoData:'', sessaoHora:'', preco:''
    }),
    mounted(){
      this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{
        "selector": {
          "collection": "cinema"
        },fields:["_id", "nome"]
      }).then(resultado => {
        this.cinemalist = resultado.data.docs
      }).catch(function (error){
        console.log(error);
      }),
      this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{
        "selector": {
          "collection": "filmes"
        },fields:["_id", "titulo"]
      }).then(resultado => {
        this.filmelist = resultado.data.docs
      }).catch(function (error){
        console.log(error);
      })
    },
    methods:{
      salvarcadastro(){
        this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/',{
          "collection": "sessao",
          "cinema": this.sessaoCinema,
          "filme": this.sessaoFilme,
          "data": this.sessaoData,
          "horario": this.sessaoHora,
          "preco": this.preco,
        })
      }
    }
  }
</script>
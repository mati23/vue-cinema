<template>
  <form>
    <v-select
      v-model="sessao.cinema"
      :items="cinemalist"
      :item-text="'nome'"
      label="Cinema"
      required
    ></v-select>
    <v-select
      v-model="sessao.filme"
      :items="filmelist"
      :item-text="'titulo'"
      label="Filme"
      required
    ></v-select>
    <v-text-field
      v-model="sessao.data"
      label="Data"
      required
    ></v-text-field>
    <v-text-field
      v-model="sessao.hora"
      label="Horario"
      required
    ></v-text-field>
    <v-text-field
      v-model="sessao.preco"
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
      sessao:{
        _id:'',
        _rev:'',
        collection:'',
        cinema:'',
        filme:'',
        data:'',
        hora:'',
        preco:''
      },
        cinemalist:[], filmelist:[],
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

      // lercadastro(){
      //   this.$nextTick(()=>{
      //     axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{
      //       "selector": {
      //         "nome": this.sessao.cinema
      //       },fields:["nome"]
      //     }).then(resultado => { 
      //       this.sessao.cinema = resultado.data.docs.nome
      //     }).catch(function (error){
      //       console.log(error);
      //     });
      //   })
      // },
      salvarcadastro(){
        if(this.$route.params.id){
          this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/',{
            "_id": this.sessao._id,
            "_rev": this.sessao._rev,
            "collection": this.sessao.collection,
            "cinema": this.sessao.cinema,
            "filme": this.sessao.filme,
            "data": this.sessao.data,
            "horario": this.sessao.horario,
            "preco": this.sessao.preco,
            "deleted_at": ""
          })
        }else{
          this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/',{
          "collection": "sessao",
          "cinema": this.sessao.cinema,
          "filme": this.sessao.filme,
          "data": this.sessao.data,
          "horario": this.sessao.horario,
          "preco": this.sessao.preco,
          "deleted_at": ""
        })
        }
      }
    }
  }
</script>
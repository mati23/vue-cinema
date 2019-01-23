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
      v-model="sessao.horario"
      label="Horario"
      required
    ></v-text-field>
    <v-text-field
      v-model="sessao.preco"
      label="Preço"
      required
    ></v-text-field>
    <v-text-field
      v-model="sessao.lotacao"
      label="Lotação da sala"
      required
    ></v-text-field>
    <v-text-field
      v-model="sessao.disponivel"
      label="Vagas Disponiveis"
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
        horario:'',
        preco:'',
        lotacao:'',
        disponivel:''
      },
        cinemalist:[], filmelist:[],
    }),
    mounted(){
      if(this.$route.params.id){
        this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{
          selector:{
            "_id": this.$route.params.id
          },
        }).then(resultado => {                
          this.sessao = resultado.data.docs[0]
        }).catch(error => console.log(error))
      }
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
            "lotacao": this.sessao.lotacao,
            "disponivel": this.sessao.disponivel,
            "deleted_at": ""
          })
          this.$router.push({ name: 'listagem_sessao'})
        }else{
          this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/',{
          "collection": "sessao",
          "cinema": this.sessao.cinema,
          "filme": this.sessao.filme,
          "data": this.sessao.data,
          "horario": this.sessao.horario,
          "preco": this.sessao.preco,
          "lotacao": this.sessao.lotacao,
          "disponivel": this.sessao.disponivel,
          "deleted_at": ""
        })
        this.$router.push({ name: 'listagem_sessao'})
        }
      }
    }
  }
</script>
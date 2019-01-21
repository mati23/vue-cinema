<template>
  <form>
    <v-text-field
      v-model="cinema.nome"
      label="Cinema"
      required
    ></v-text-field>
    <v-select
      v-model="cinema.estado"
      :items="uflist"
      label="Estado"
      required
      @change="listarcidades"
    ></v-select>
    <v-select
    v-model="cinema.cidade"
      :items="cidadeslist"
      label="Cidade"
      required
    ></v-select>
    <v-text-field
      v-model="cinema.localizacao"
      label="Localização"
      required
    ></v-text-field>
    <v-btn @click="salvarcadastro" color="success">Salvar</v-btn>
  </form>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      cinema:{
        _id:'',
        _rev:'',
        collection:'',
        nome:'',
        estado:'',
        cidade:'',
        localizacao:''
      },
      uflist: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
      'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO',
      'RR', 'SC', 'SP', 'SE', 'TO'],
      cidadeslist:[]
    }),
    mounted(){
      if(this.$route.params.id){
        this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{
          selector:{
            "_id": this.$route.params.id
          },
        }).then(resultado => {                
          this.cinema = resultado.data.docs[0]
          this.listarcidades()
        }).catch(error => console.log(error))
      }
    },
    methods:{
        lercadastro(){
        this.$nextTick(()=>{
          axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/trg_municipios/_find',{
            "selector": {
              "sigla": this.cinema.estado
            },fields:["cidades"]
          }).then(resultado => { 
            this.cidadeslist = resultado.data.docs["0"].cidades
          }).catch(function (error){
            console.log(error);
          });
        })
      },
      listarcidades(){
        this.$nextTick(()=>{
          axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/trg_municipios/_find',{
            "selector": {
              "sigla": this.cinema.estado
            },fields:["cidades"]
          }).then(resultado => { 
            this.cidadeslist = resultado.data.docs["0"].cidades
          }).catch(function (error){
            console.log(error);
          });
        })
      },
      salvarcadastro(){
        if(this.$route.params.id){
          this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/',{
            "_id": this.cinema._id,
            "_rev": this.cinema._rev,
            "collection": this.cinema.collection,
            "nome": this.cinema.nome,
            "estado": this.cinema.estado,
            "cidade": this.cinema.cidade,
            "localizacao": this.cinema.localizacao
          })
        }else{
          this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/',{
          "collection": "cinema",
          "nome": this.cinema.nome,
          "estado": this.cinema.estado,
          "cidade": this.cinema.cidade,
          "localizacao": this.cinema.localizacao
        })
        }
      }
    }
  }
</script>
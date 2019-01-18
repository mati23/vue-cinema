<template>
  <form>
    <v-text-field
      v-model="cineNome"
      label="Cinema"
      required
    ></v-text-field>
    <v-select
      v-model="uf"
      :items="uflist"
      label="Estado"
      required
      @change="listarcidades"
    ></v-select>
    <v-select
    v-model="cidad"
      :items="cidadeslist"
      label="Cidade"
      required
    ></v-select>
    <v-text-field
      v-model="cineLocalizacao"
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
      cineNome:'', cineLocalizacao:'', cidad:'',
      uflist: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
      'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO',
      'RR', 'SC', 'SP', 'SE', 'TO'], 
      cidadeslist:[],
      uf: ''
    }),
    methods:{
      listarcidades(){
        this.$nextTick(()=>{
          axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/trg_municipios/_find',{
            "selector": {
              "sigla": this.uf
            },fields:["cidades"]
          }).then(resultado => { 
            this.cidadeslist = resultado.data.docs["0"].cidades
          }).catch(function (error){
            console.log(error);
          });
        })
      },
      salvarcadastro(){
        this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/',{
          "collection": "cinema",
          "nome": this.cineNome,
          "estado": this.uf,
          "cidade": this.cidad,
          "localizacao": this.cineLocalizacao
        })
      }
    }
  }
</script>
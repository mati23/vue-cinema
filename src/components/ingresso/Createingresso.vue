<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Meu ingresso</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <form>
      <v-text-field
        v-model="sessao.cinema"
        label="Cinema"
        required
      ></v-text-field>
      <v-text-field
        v-model="sessao.filme"
        label="Filme"
        required
      ></v-text-field>
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
      <v-select
        v-model="quantidade"
        :items="numeros"
        label="Numero de ingressos"
        required
      ></v-select>
      <v-text-field
        v-model="sessao.disponivel"
        label="Vagas Disponiveis"
        required
      ></v-text-field>
      <v-btn @click="salvarcadastro" color="success">Salvar</v-btn>
    </form>
  </div>
</template>

<script>
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
        disponivel:'',
      },
      dialog: false,
      quantidade:'',
      numeros: [1, 2, 3, 4]
    }),
    computed: {
      vagas() {
        return parseInt(this.sessao.disponivel)-this.quantidade
      }
    },
    mounted() {
      if(this.$route.params.id){
        this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{
          selector:{
            "_id": this.$route.params.id
          },
        }).then(resultado => {                
          this.sessao = resultado.data.docs[0]
        }).catch(error => console.log(error))
      }

    },
    methods: {
      salvarcadastro(){
        if(this.vagas >= 0){
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
            "disponivel": this.vagas,
            "deleted_at": ""
          })
          this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/',{
            "collection": "ingresso",
            "cinema": this.sessao.cinema,
            "filme": this.sessao.filme,
            "data": this.sessao.data,
            "horario": this.sessao.horario,
            "preco": this.sessao.preco,
            "quantidade": this.quantidade,
            "cliente": "cliente._id",
            "deleted_at": ""
          })
        }else{
          confirm('Acabou os ingressos nessa budega.')
        }
      }
    }
  }
</script>
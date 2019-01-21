<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Lista de Cinemas da Rede</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn 
            slot="activator" 
            color="primary" 
            dark 
            class="mb-2"
            href="/cadastro/cinema"
            target="">Cadastrar</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline"></span>
          </v-card-title>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="cinemas"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nome }}</td>
        <td class="text-xs-right">{{ props.item.cidade }}</td>
        <td class="text-xs-right">{{ props.item.localizacao }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item._id)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" >Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>


<script>
  import Createcinema from './Createcinema.vue';
  import Vue from 'vue'
  import Router from '../../router'

  export default {
    data: () => ({
      cinemas: [],
      dialog: false,
      headers: [
        {
          text: 'Nome',
          align: 'left',
          sortable: false,
          value: 'nome'
        },
        { text: 'Estado', value: '', sortable: false },
        { text: 'Cidade', value: '', sortable: false },        
        { text: 'Localização', value: '', sortable: false }
      ],
    }),
    mounted(){
        this.$axios.post(
            'http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{selector:{
                "collection": "cinema"
            },fields: ["_id","nome", "cidade","localizacao"]
            }
            ).then(resultado => {                
                this.cinemas = resultado.data.docs           
            }).catch(error => console.log(error))
    },

    methods: {
      editItem (item) {
        this.$router.push({name: 'cadastro_cinema', params: {id: item}})
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },
    }
  }
</script>
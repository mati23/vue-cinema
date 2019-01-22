<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Lista Sessões Disponíveis</v-toolbar-title>
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
            href="/cadastro/sessao"
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
      :items="sessoes"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.cinema }}</td>
        <td class="text-xs-right">{{ props.item.filme }}</td>
        <td class="text-xs-right">{{ props.item.data }}</td>
        <td class="text-xs-right">{{ props.item.horario }}</td>
        <td class="text-xs-right">{{ props.item.preco }}</td>
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
  import Createsessao from './Createsessao.vue';
  import Vue from 'vue'
  import Router from '../../router'

  const baseUri = 'http://couch-dev.3e.eng.br:5984/ingresso_online/'

  export default {
    data: () => ({
      sessoes: [],
      dialog: false,
      headers: [
        {
          text: 'Cinema',
          align: 'left',
          sortable: false,
          value: ''
        },
        { text: 'Filme', value: '', sortable: false },
        { text: 'Data', value: '', sortable: false },        
        { text: 'Horario', value: '', sortable: false },
        { text: 'Preço', value: '', sortable: false }
      ],
    }),
    mounted(){
      this.listaSessao()
    },

    methods: {
      listaSessao(){
        this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{selector:{
          "collection": "sessao",
          "deleted_at": ""
        },fields: ["_id","cinema", "filme", "data", "horario", "preco"]
        }).then(resultado => {                
          this.sessoes = resultado.data.docs           
        }).catch(error => console.log(error))
      },
      editItem (item) {
        this.$router.push({name: 'cadastro_sessao', params: {id: item}})
      },

      deleteItem (item) {
        let rev = confirm('Are you sure you want to delete this item?')
          if(rev){
            const index = this.sessoes.indexOf(item)
            /**
             * Faz uma requisição para selecionar o documento no couch com o ID e REV do item
             * que foi selecionado
             */
            this.$axios.post(
                'http://couch-dev.3e.eng.br:5984/ingresso_online/_find', {
                  selector: {
                    "collection": "sessao",
                    "_id": item._id
                    },
                  
                },
                {
                      withCredentials: true,
                      auth:{
                        username: "admin",
                        password: "admin2435,"
                    }
                }
            ).then(resultado => {  
              /**
               * Edita o resultado da requisição adicionando o campo "deleted_at"
               * e retorna o documento via requisição PUT */ 
                  let sessao = resultado.data.docs[0]            
                  sessao.deleted_at = new Date()
                  this.$axios.put(baseUri + resultado.data.docs[0]._id, sessao,{
                      withCredentials: true,
                      auth:{
                        username: "admin",
                        password: "admin2435,"
                    }
                  }
                  ).then(() => this.listaSessao())
                }
            ).catch(error => console.log(error))
          }
        }
    }
  }
</script>
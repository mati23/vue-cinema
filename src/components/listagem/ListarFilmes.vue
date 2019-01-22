<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Filmes</v-toolbar-title>
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
            href="/cadastro/filme"
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
      :items="filmes"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.titulo }}</td>
        <td class="text-xs-right">{{ props.item.genero }}</td>
        <td class="text-xs-right">{{ props.item.classificacao }}</td>
        <td class="justify-center layout px-0">
          <v-btn 
            slot="activator" 
            color="primary" 
            dark 
            class="mb-2"
            @click="listItem(props.item.titulo)"
            target="">
            Lista de Cinemas
          </v-btn>
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
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
  const baseUri = 'http://couch-dev.3e.eng.br:5984/ingresso_online/'
  export default {
    data: () => ({
      filmes: [],
      dialog: false,
      headers: [
        {
          text: 'Titulo',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Gênero', value: '' },
        { text: 'Classificação', value: '' },
      ],
    }),
    mounted(){
        this.listaFilmes()
    },

    computed: {
      
    },

    watch: {
      
    },

    methods: {
      /**
       * Função que faz requisição ao banco de dados e distribui os valores do array de resultados
       * na tabela
       */
      listaFilmes(){
        this.$axios.post(
            'http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{selector:{
                "collection": "filmes",
                "deleted_at": ""
            },fields: ["_id","titulo", "genero","classificacao"]
            }
            ).then(resultado => {                
                this.filmes = resultado.data.docs           
            }).catch(error => console.log(error))
      },
      editItem (item) {
        this.$router.push({name: 'cadastro_filme', params: {id: item._id}})
      },
      listItem (item) {
        this.$router.push({name: 'listagem_sessao', params: {filme: item}})
      },
      deleteItem (item) {
        confirm('Are you sure you want to delete this item?') 
        const index = this.filmes.indexOf(item)
        console.log(item.titulo)
        /**
         * Faz uma requisição para selecionar o documento no couch com o ID e REV do item
         * que foi selecionado
         */
        this.$axios.post(
            'http://couch-dev.3e.eng.br:5984/ingresso_online/_find', {
              selector: {
                "collection": "filmes",
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
              let filme = resultado.data.docs[0]            
              filme.deleted_at = new Date()
              this.$axios.put(baseUri + resultado.data.docs[0]._id, filme,{
                  withCredentials: true,
                  auth:{
                    username: "admin",
                    password: "admin2435,"
                }
              }
              ).then(() => this.listaFilmes())
            }
        ).catch(error => console.log(error))
      }   
    }
  }
</script> 
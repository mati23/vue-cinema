<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Meus Ingressos</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
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
        <td>{{ props.item.filme }}</td>
        <td class="text-xs-right">{{ props.item.cinema }}</td>
        <td class="text-xs-right">{{ props.item.data }}</td>
        <td class="text-xs-right">{{ props.item.horario }}</td>
        <td class="text-xs-right">{{ props.item.quantidade }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item.sessaoID)"
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
      sessoes: [],
      dialog: false,
      headers: [
        {
          text: 'Filme',
          align: 'left',
          sortable: false,
          value: ''
        },
        { text: 'Cinema', value: '', sortable: false },
        { text: 'Data', value: '', sortable: false },        
        { text: 'Horario', value: '', sortable: false },
        { text: 'Quantidade', value: '', sortable: false }
      ],
    }),
    mounted(){
        this.listaIngresso()
    },

    methods: {
      listaIngresso(){
        this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{
          selector:{
            "collection": "ingresso",
            "cliente": localStorage.getItem('id'),
            "deleted_at": ""
          },
        }).then(resultado => {
          this.sessoes = resultado.data.docs
        }).catch(error => console.log(error))
      },
      editItem (item) {
        this.$router.push({name: 'compra_ingresso', params: {id: item}})
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
                    "collection": "ingresso",
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
                  ).then(() => this.listaIngresso())
                }
            ).catch(error => console.log(error))
          }
        }
    }
  }
</script>
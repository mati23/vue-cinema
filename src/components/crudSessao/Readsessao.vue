// <template>
//   <div>
//     <v-toolbar flat color="white">
//       <v-toolbar-title>Lista Sessões</v-toolbar-title>
//       <v-divider
//         class="mx-2"
//         inset
//         vertical
//       ></v-divider>
//       <v-spacer></v-spacer>
//       <v-dialog v-model="dialog" max-width="500px">
//         <v-btn 
//             slot="activator" 
//             color="primary" 
//             dark 
//             class="mb-2"
//             href="/cadastro/cinema"
//             target="">Cadastrar</v-btn>
//         <v-card>
//           <v-card-title>
//             <span class="headline"></span>
//           </v-card-title>
//         </v-card>
//       </v-dialog>
//     </v-toolbar>
//     <v-data-table
//       :headers="headers"
//       :items="cinemas"
//       class="elevation-1"
//     >
//       <template slot="items" slot-scope="props">
//         <td>{{ props.item.nome }}</td>
//         <td class="text-xs-right">{{ props.item.cidade }}</td>
//         <td class="text-xs-right">{{ props.item.localizacao }}</td>
//         <td class="justify-center layout px-0">
//           <v-icon
//             small
//             class="mr-2"
//             @click="editItem(props.item._id)"
//           >
//             edit
//           </v-icon>
//           <v-icon
//             small
//             @click="deleteItem(props.item)"
//           >
//             delete
//           </v-icon>
//         </td>
//       </template>
//       <template slot="no-data">
//         <v-btn color="primary" >Reset</v-btn>
//       </template>
//     </v-data-table>
//   </div>
// </template>


// <script>
//   import Createcinema from './Createcinema.vue';
//   import Vue from 'vue'
//   import Router from '../../router'

//   const baseUri = 'http://couch-dev.3e.eng.br:5984/ingresso_online/'

//   export default {
//     data: () => ({
//       cinemas: [],
//       dialog: false,
//       headers: [
//         {
//           text: 'Nome',
//           align: 'left',
//           sortable: false,
//           value: 'nome'
//         },
//         { text: 'Estado', value: '', sortable: false },
//         { text: 'Cidade', value: '', sortable: false },        
//         { text: 'Localização', value: '', sortable: false }
//       ],
//     }),
//     mounted(){
//       this.listaCinema()
//     },

//     methods: {
//       listaCinema(){
//         this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{selector:{
//           "collection": "cinema",
//           "deleted_at": ""
//         },fields: ["_id","nome", "cidade","localizacao"]
//         }).then(resultado => {                
//           this.cinemas = resultado.data.docs           
//         }).catch(error => console.log(error))
//       },
//       editItem (item) {
//         this.$router.push({name: 'cadastro_cinema', params: {id: item}})
//       },

//       deleteItem (item) {
//         let rev = confirm('Are you sure you want to delete this item?')
//           if(rev){
//             const index = this.cinemas.indexOf(item)
//             /**
//              * Faz uma requisição para selecionar o documento no couch com o ID e REV do item
//              * que foi selecionado
//              */
//             this.$axios.post(
//                 'http://couch-dev.3e.eng.br:5984/ingresso_online/_find', {
//                   selector: {
//                     "collection": "cinema",
//                     "_id": item._id
//                     },
                  
//                 },
//                 {
//                       withCredentials: true,
//                       auth:{
//                         username: "admin",
//                         password: "admin2435,"
//                     }
//                 }
//             ).then(resultado => {  
//               /**
//                * Edita o resultado da requisição adicionando o campo "deleted_at"
//                * e retorna o documento via requisição PUT */ 
//                   let cinema = resultado.data.docs[0]            
//                   cinema.deleted_at = new Date()
//                   this.$axios.put(baseUri + resultado.data.docs[0]._id, cinema,{
//                       withCredentials: true,
//                       auth:{
//                         username: "admin",
//                         password: "admin2435,"
//                     }
//                   }
//                   ).then(() => this.listaCinema())
//                 }
//             ).catch(error => console.log(error))
//           }
//         }
//     }
//   }
// </script>
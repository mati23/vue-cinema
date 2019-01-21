<template>
    <div>
        <v-container>
            <v-flex md6 offset-md3>
                <v-form
    ref="form"
    
  >
    
    <v-text-field
      v-model="filme.titulo"
      :counter="50"
      
      label="Nome do Filme"
      required
    ></v-text-field>

    <v-select
      v-model="filme.genero"
      :items="generoItems"
      :item-text="'genero'"
      :rules="[v => !!v || 'Item is required']"
      label="Gênero"
      required
    ></v-select>
  

    <v-select
      v-model="filme.classificacao"
      :items="classificacaoItems"
      :item-text="'classificacao'"
      :rules="[v => !!v || 'Item is required']"
      label="Classificação"
      required
    ></v-select>


      

    <v-btn
      color="info"
      @click="criaFilme"
      target=""
    >
      Cadastrar Filme
    </v-btn>

    

  </v-form>
            </v-flex>
        </v-container>
    </div>    
</template>
<script>
    export default {
        data: () => ({
            filme: {
                    _id: '',
                    _rev: '',
                    titulo: '',
                    genero: '',
                    classificacao: ''
                },
                classificacaoItems:[
                    'L',
                    10,
                    12,
                    14,
                    16,
                    18
                ],
                generoItems: []
        }),
        mounted() {
            if(this.$route.params.id){
            this.$axios.post('http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{
                selector:{
                    "_id": this.$route.params.id
                },
                }).then(resultado => {                
                this.filme = resultado.data.docs[0]
                
                }).catch(error => console.log(error))
            
            }
            this.listaFilmes()
            
        },
        methods: {
            criaFilme(){
                if(this.$route.params.id){
                    this.$axios.post(
                    'http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/',{
                    "collection": "filmes",
                    "_id": this.filme._id,
                    "_rev": this.filme._rev,
                    "titulo": this.filme.titulo,
                    "genero": this.filme.genero, 
                    "classificacao": this.classificacao,
                    "updated_at": new Date(),
                    "deleted_at": ""                             
                    }    
                ).catch(error => console.log(error))            
                }else{
                    this.$axios.post(
                    'http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/',{
                        "collection": "filmes",
                        "titulo": this.filme.titulo,
                        "genero": this.filme.genero, 
                        "classificacao": this.classificacao,
                        "created_at": new Date(),
                        "updated_at": "",
                        "deleted_at": ""                       
                    } 
                    ).catch(error => console.log(error))
                }
                
            },
            listaFilmes(){
                this.$nextTick(() => {
                /**
                 * Recebe via requisição POST fazendo a seleção dos itens 'classificação' de cada filme
                 * e em seguida atribui à chave 'generoItems' que será mostrada ao usuario. 
                 */
                this.$axios.post(
                    'http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{selector:{
                        "collection": "filmes"
                    },fields: ["_id", "genero"]
                    }
                    ).then(resultado => {                
                        this.generoItems = resultado.data.docs
                        
                    }).catch(error => console.log(error))
                })
            }
        },
        
        
    }
</script>
<style>

</style>

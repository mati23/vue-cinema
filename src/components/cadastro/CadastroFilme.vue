<template>
    <div>
        <v-container>
            <v-flex md6 offset-md3>
                <v-form
    ref="form"
    
  >
    
    <v-text-field
      v-model="name"
      :counter="50"
      
      label="Nome do Filme"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="generoItems"
      :rules="[v => !!v || 'Item is required']"
      label="Gênero"
      required
    ></v-select>
  

    <v-select
      v-model="select"      
      :rules="[v => !!v || 'Item is required']"
      :items="classificacaoItems"
      label="Classificação"
      required
    ></v-select>


      

    <v-btn
      color="info"
      
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
    data(){
        return {
            name: '',
            select: null,
            classificacaoItems:[
                'L',
                10,
                12,
                14,
                16,
                18
            ],
            generoItems: [
                
            ]
        }
    },
    mounted() {
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
                for(var i=0;i<resultado.data.docs.length;i++){
                    this.generoItems.push(resultado.data.docs[i].genero)
                }  
            }).catch(error => console.log(error))
    }
    
}
</script>
<style>

</style>

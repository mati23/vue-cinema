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
                'Ação',
                'Aventura',
                'Romance'
            ]
        }
    },
    
}
</script>
<style>

</style>

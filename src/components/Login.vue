<template>
    <div>
    <v-container>
        
        <v-flex xs6 offset-xs3>            
            <h1 class="text-md-center font-weight-light">Pagina de Cadastro</h1>
            <v-form
            ref="form"
        >
            <v-text-field
                v-model="name"
                :counter="50"
                :rules="nameRules"
                label="Insira seu email"
                required
            ></v-text-field>
            <v-text-field
                v-model="password"
                :append-icon="show ? 'visibility_off': 'visibility'"
                :type="show ? 'text' : 'password'"
                name="password-input"
                label="Insira sua senha"
            >
            </v-text-field>
            <div class="text-xs-right">
                <v-btn  
                color="success"
                href="/cadastro/usuario"
                >Registrar-se</v-btn>
                <v-btn  color="info">Login</v-btn>
            </div>
        </v-form>
        </v-flex>
        
    </v-container>
    </div>
</template>
<script>
export default {
    data(){
        return{
            email:'',
            password:'',
            name:'',
            show:false,
            nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
        }
    }
}
</script>
<style>

</style>

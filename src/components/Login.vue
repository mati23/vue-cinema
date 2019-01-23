<template>
    <div>
    <v-container>
        
        <v-flex xs6 offset-xs3>            
            <h1 class="text-md-center font-weight-light">Pagina de Cadastro</h1>
            <v-form
            ref="form"
        >
            <v-text-field
                v-model="email"
                :counter="50"
                :rules="nomeRules"
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
                <v-btn  
                color="info"
                @click="validaUsuario()">Login</v-btn>
            </div>
        </v-form>
        </v-flex>
        
    </v-container>
    </div>
</template>
<script>

export default {
    name: 'login',
    data(){
        return{
            email:'',
            password:'',
            nome:'',
            show:false,
            nomeRules: [
        v => !!v || 'nome is required',
        v => (v && v.length <= 100) || 'nome must be less than 100 characters'
      ],
        }
    },
    mounted(){
        //console.log(sessionStorage.getItem('nomedousuario'))
        
    },
    methods: {
        /**
         * Faz a validação com o banco para verificar se a senha inserida corresponde 
         * à senha do formulário utilizando decriptação e a chave hash do banco
         */
        validaUsuario(){
            this.$axios.post(
                'http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{
                    selector:{
                        "collection": "usuarios",
                        "email": this.email
                    },fields: ["_id","email","nome","senha","hash"]
                }
            ).then(resultado => {
                let usuario = resultado.data.docs[0]
                if(usuario.email == this.email && 
                    this.$bcryptjs.compareSync(this.password, usuario.hash, function(erro, res){}) == true){
                    alert("Sejá bem vindo, " + usuario.nome )
                    this.$emit('mudasessao', usuario.nome)
                }else{
                    alert("Usuario ou senha estão incorretos!")
                }
            }).catch(error => console.log(error))
            
        },
        mudaTitulo(nome){
            //sessionStorage.setItem('nomedousuario', nome)
            
            }
        
    }
}
</script>
<style>

</style>

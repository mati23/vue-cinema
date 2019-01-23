<template>
   <div>
    <v-container>
        
        <v-flex xs6 offset-xs3>            
            <h1 class="text-md-center font-weight-light">Pagina de Cadastro</h1>
            <v-form
            ref="form"
        >
            <v-text-field
                v-model="nome"
                :counter="50"
                :rules="nomeRules"
                label="Insira seu nome"
                required
            ></v-text-field>
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
            <v-text-field
                v-model="passwordConfirm"
                :append-icon="show ? 'visibility_off': 'visibility'"
                :type="show ? 'text' : 'password'"
                name="password-input"
                label="Confirme sua senha"
                required
            ></v-text-field>

            <v-text-field
                v-model="idade"
                :counter="50"
                
                label="Insira sua idade"
                required
            ></v-text-field>
            <v-slider
              v-model="idade"
              
              color="orange"
              label=""
              hint="Be honest"
              min="1"
              max="100"
              thumb-label
            ></v-slider>
          
            <div class="text-xs-right">
                <v-btn  
                color="success"
                @click="criaUsuario()"
                >Registrar-se</v-btn>                
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
            _id:'',
            _rev:'',
            idade: '',
            email:'',
            password:'',
            passwordConfirm: '',
            password: '',          
            nome: '',
            admin: '',
            created_at: '',
            updated_at: '',
            deleted_at: '',
            show:false,
            
            nomeRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'This field must be less than 10 characters'
            ],
        }
    },
    mounted(){
        this.listaUsuario()
    },
    methods:{
        /**
         * Lista as informações do usuario quando ele(a) desejar editar o registro
         * de cadastro
         */
        listaUsuario(){
            console.log(this.$route)
            if(this.$route.params.id){
                this.$axios.post(
                    'http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/_find',{
                        selector:{
                            "collection": "usuarios",
                            "_id": this.$route.params.id
                        },                                                
                        }
                    ).then( resultado => {
                        console.log(resultado.data.docs[0]._id)
                        let usuario = resultado.data.docs[0]
                        this._id = usuario._id
                        this._rev = usuario._rev
                        this.nome = usuario.nome
                        this.email = usuario.email
                        this.idade = usuario.idade
                        this.created_at = usuario.created_at
                        }
                    ).catch(error => console.log(error))
            }
        },
        criaUsuario(){
            const saltRounds = 10;
            var hash = this.$bcryptjs.hashSync(this.password,saltRounds)            
            console.log(this.$route.params.id)
            if(this.$route.params.id){
                /**
                 * Se for para editar o usuario, recebe as credenciais da sessão 
                 * e começa o formulário de cadastro com os dados já preenchidos
                 */
                this.$axios.post(
                        'http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/',{
                        "collection": "usuarios",
                        "_id": this._id,
                        "_rev": this._rev,
                        "admin": false,
                        "nome": this.nome,
                        "idade":this.idade,
                        "email":this.email,
                        "senha": this.$bcryptjs.hashSync(this.password, saltRounds),
                        "hash": hash,
                        "updated_at": new Date()
                        }).catch(error => console.log(error))
                        alert("Usuario atualizado!")                
            }else{
                     /**
                 * Encripta a senha inserida pelo usuario, checa se as senhas são equivalentes
                 * e encripta as senhas do usuário para salvar no banco de dados.
                 */
                if(this.password == this.passwordConfirm){
                    //registra usuario
                    this.$axios.post(
                    'http://admin:admin2435,@couch-dev.3e.eng.br:5984/ingresso_online/',{
                        "collection": "usuarios",
                        "admin": false,
                        "nome": this.nome,
                        "email": this.email,
                        "idade": this.idade,
                        "senha": this.$bcryptjs.hashSync(this.password, saltRounds),
                        "hash": hash,
                        "created_at": new Date(),
                        "updated_at":"",
                        "deleted_at":""
                        }
                    ).catch(error => console.log(error))
                    alert("Usuario registrado!")
                }else{
                    alert("A confirmação de senha está inválida")
                }
            }    
        }
    }    
}
</script>

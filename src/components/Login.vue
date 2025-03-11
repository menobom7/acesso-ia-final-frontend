<template>
  <div class="login-container">
    <div class="login">
    <img src="@/assets/logo.png" class="logo"/>
      <h3 class="text-center"> Acesse sua conta </h3>
      <form @submit.prevent="Processarlogin">
          <div class="form-group">
            <label>Login</label>
            <input type="text" v-model="dadosLogin.login" class="form-control" required>
          </div>
          <div class="form-group">
            <label>Senha</label>
            <input type="password" v-model="dadosLogin.senha" class="form-control" required>
          </div>
           <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">
                  Acessar
              </button>
            
          </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from  'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      dadosLogin: {
        login:'',
        senha: ''
      },
      errorAlerta: ''
    };
  },
  methods: {
    async Processarlogin() {
      try{
        const response = await axios.post('https://localhost:7246/api/v1/logins/autenticar', this.dadosLogin);
        localStorage.setItem('dados-usuario-logado',
        JSON.stringfy(response.data));
        
        Swal.fire({
            title: 'Login realizado com sucesso',
            text:  'Voce sera redirecionado para o sistema',
            icon: 'success',
            timer: 2000,
            confirmButtonText: false
        })

        //Redirecionando 
        setTimeout(() => {
            this.$router.push('/home')
        }, 200);
      }catch(error) {
        this.errorAlerta = 'Login ou senha inválidos';
        Swal.fire({
            title: 'Atenção - erro',
            text:  this.errorAlerta,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login {
  background: white;
  padding:30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  width: 350px;
  text-align:center;
}

.logo {
  width: 150px;
  margin-bottom: 20px;
}
</style>
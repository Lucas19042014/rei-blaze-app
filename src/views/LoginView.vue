<script setup>
</script>

<template>
  <main>
    <div class="form-login">
      <loading v-model:active="isLoading" />
      <input
        class="form-control"
        type="text"
        name="email"
        id="email"
        v-model="email"
        placeholder="Digite seu e-mail"
      />
      <input
        class="form-control"
        type="password"
        name="password"
        id="password"
        v-model="password"
        placeholder="Digite sua senha"
      />
      <button class="form-control btn-login" @click="submit">Acessar</button>
    </div>
  </main>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Cookies from 'js-cookie';
import authServices from '../services/authServices';
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  name: 'LoginView',
  data() {
    return {
      isLoading: false,
      email: 'oreidodigital.org2@gmail.com',
      password: 'Senha@123'
    }
  },
  components: {
      Loading
  },
  methods: {
    async submit() {
      try {
        this.isLoading = true;
        const authData = await authServices.login(this.email, this.password);
        
        Cookies.set('session_key', authData.token, { expires: new Date(authData.expireAt) });

        setTimeout(() => this.$router.push('/'), 3000);
      } catch (error) {
        this.isLoading = false;
        toast.error(`E-mail ou senha inválidos`, {
          timeout: 2000
        });
      }
    }
  }
}

</script>
<style src="./LoginView.css" lang="css" scoped />
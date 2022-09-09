<script setup>
</script>

<template>
  <main>

    <div class="form-login">
      <loading v-model:active="isLoading" />
      <h3>Precisamos agora atualizar sua senha!</h3>
      <h4> Ela precisa ter no mínimo 8 caracteres</h4>

      <br>

      <input
        class="form-control"
        type="password"
        name="email"
        id="email"
        minlength="8"
        v-model="password"
        placeholder="Digite sua nova senha"
      />
      <input
        class="form-control"
        type="password"
        name="confirm_password"
        id="confirm_password"
        minlength="8"
        v-model="confirm_password"
        placeholder="Digite sua senha novamente"
      />
      <button class="form-control btn-login" @click="submit">Confirmar</button>
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
      confirm_password: '',
      password: ''
    }
  },
  components: {
      Loading
  },
  methods: {
    async submit() {
      try {
        if (this.password.length < 8) {
          toast.error(`Sua senha precisa ter no mínimo 8 caracteres`, {
            timeout: 2000
          });

          this.password = '';
          this.confirm_password = '';

          return;
        }

        if (this.password !== this.confirm_password) {
          toast.error(`As senhas não conferem`, {
            timeout: 2000
          });
          this.password = '';
          this.confirm_password = '';

          return;
        }

        this.isLoading = true;
        const authData = await authServices.resetPass(this.password, this.confirm_password);
        
        setTimeout(() => this.$router.push('/'), 3000);
      } catch (error) {
        this.isLoading = false;
        toast.error(`Valores Inválidos`, {
          timeout: 2000
        });
      }
    },
  }
}

</script>
<style src="./PasswordResetView.css" lang="css" scoped />
<template>
  <nav v-show="showNavBar">
    <span class="user-name">{{ userName }}</span>
    <a href="#" @click="logout">Sair</a>
  </nav>
  <header>
    <div class="wrapper">
      <img src="@/assets/images/logo.png" class="logo" alt="">
    </div>
  </header>

  <RouterView />
</template>

<script>
import authServices from './services/authServices';
import Cookies from 'js-cookie';

export default {
  name: 'App',
  data() {
    return {
      userName: '...'
    }
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
    isRouteLogin() {
      return this.currentRoute?.includes('login');
    },
    showNavBar() {
      return !this.isRouteLogin;
    }
  },
  async created() {
    this.getUserMe();

    setInterval(() => {
        this.getUserMe();
    }, 10000);
  },
  methods: {
    async getUserMe() {
      try {
        if (this.isRouteLogin) {
          return;
        }
          
        const me = await authServices.me();
        if (!me) {
          Cookies.remove('session_key');
          this.$router.push('/login');
          return;
        }

        this.userName = `Bora, ${me.name}!`;
      } catch (error) {
          this.$router.push('/login');
      }
    },
    logout() {
      Cookies.remove('session_key');
      this.$router.push('/login');
    }
  }
}
</script>

<style src="./App.css" lang="css" scoped />

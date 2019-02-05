<template>
  <v-toolbar app color="primary">
    <v-toolbar-title class="headline text-uppercase">
      <span>Smart-</span>
      <span class="font-weight-light">SENSOR</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="isAuthenticated">
      <v-btn flat @click="logout">Logout</v-btn>
    </div>
  </v-toolbar>
</template>

<script>
  export default {
    name: "AppNavigation",
    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("userLogout");
      }
    }
  };
</script>

<style scoped>
</style>
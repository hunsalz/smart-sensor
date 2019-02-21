<template>
  <v-toolbar
    app
    prominent
    dark
    color="primary"
  >
    <v-toolbar-title class="headline text-uppercase">
      <span>Smart </span>
      <span class="font-weight-light">
        SENSOR
      </span>
    </v-toolbar-title>
    <v-spacer />
    <div v-if="isAuthenticated">
      <v-btn
        flat
        @click="logout"
      >
        {{ $t('app.logout.name') }}
      </v-btn>
    </div>
    <v-btn
      icon
    >
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    name: "TheNavigation",
    computed: {
      isAuthenticated() {
        return this.$store.getters["User/isAuthenticated"];
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("User/logout");
      }
    }
  };
</script>

<style scoped>
</style>

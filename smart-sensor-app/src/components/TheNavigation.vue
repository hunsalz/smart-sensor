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
      v-show="$route.name === 'more'"
      flat
      icon
      @click="home"
    >
      <v-icon>chevron_left</v-icon>
    </v-btn>
    <v-btn
      v-show="$route.name === 'home'"
      flat
      icon
      @click="more"
    >
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  import router from "../router";

  export default {
    name: "TheNavigation",
    computed: {
      isAuthenticated() {
        return this.$store.getters["User/isAuthenticated"];
      }
    },
    methods: {
      home() {
        router.push({ name: "home" });
      },
      logout() {
        this.$store.dispatch("User/logout");
      },
      more() {
        router.push({ name: "more" });
      }
    }
  };
</script>

<style scoped>
</style>

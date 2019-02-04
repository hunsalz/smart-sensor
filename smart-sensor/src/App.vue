<template>
  <v-app id="app">
    <app-navigation></app-navigation>
    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: "App",
    components: {
      AppNavigation: () => import("./components/AppNavigation.vue")
    },
    created() {
      this.setTitle();
    },
    methods: {
      setTitle() {
        //document.title = this.$t("application.name");
      }
    }
  };
</script>

<style>
</style>

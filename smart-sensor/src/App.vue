<template>
  <v-app dark id="app">
    <app-navigation></app-navigation>
    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
    <v-footer height="auto" color="primary">
      <v-layout justify-center row wrap>
        <v-btn flat href="https://github.com/hunsalz/smart-sensor" target="_blank" rel="noreferrer">
          <span class="mr-2">GitHub</span>
        </v-btn>
      </v-layout>
    </v-footer>
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

<template>
  <v-app id="app">
    <the-navigation />
    <v-content transition="slide-x-transition">
      <router-view />
    </v-content>
    <v-footer
      height="auto"
      color="primary"
    >
      <v-layout
        justify-center
        row
      >
        <v-btn
          flat
          href="https://github.com/hunsalz/smart-sensor"
          target="_blank"
          rel="noreferrer"
        >
          <span class="white--text">
            GitHub
          </span>
        </v-btn>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  import TheNavigation from "@/components/TheNavigation";

  export default {
    name: "App",
    components: {
      TheNavigation
    },
    created() {
      this.setTitle();
    },
    methods: {
      setTitle() {
        document.title = this.$t("app.name");
      }
    }
  };
</script>

<style>
</style>

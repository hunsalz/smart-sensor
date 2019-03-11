<template>
  <v-app id="app">
    <the-navigation />
    <v-content transition="slide-x-transition">
      <router-view />
    </v-content>
    <the-footer />
  </v-app>
</template>

<script>
export default {
  name: "App",
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

<style scoped></style>

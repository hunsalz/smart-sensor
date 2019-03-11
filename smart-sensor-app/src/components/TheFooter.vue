<template>
  <v-footer height="auto" color="primary" fixed>
    <v-layout justify-center row>
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
</template>

<script>
import router from "@/router";
import { MODULES } from "@/store";

export default {
  name: "TheFooter",
  computed: {
    isAuthenticated() {
      return this.$store.getters[MODULES.User.getters.isAuthenticated];
    }
  },
  methods: {
    home() {
      router.push({ name: "home" });
    },
    logout() {
      this.$store.dispatch(MODULES.User.actions.logout);
    },
    more() {
      router.push({ name: "more" });
    }
  }
};
</script>

<style scoped></style>

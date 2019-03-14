<template>
  <v-toolbar app prominent dark color="primary">
    <v-toolbar-title class="headline text-uppercase">
      <span>Smart </span>
      <span class="font-weight-light">
        SENSOR
      </span>
    </v-toolbar-title>
    <v-spacer />
    <!--v-btn v-show="$route.name !== 'login'" flat @click="logout">
      {{ $t("app.logout.name") }}
    </v-btn-->
    <v-btn v-show="$route.name === 'home'" flat icon @click="togglePanels">
      <v-icon>{{ toggleIcon }}</v-icon>
    </v-btn>
    <v-btn v-show="$route.name === 'more'" flat icon @click="home">
      <v-icon>chevron_left</v-icon>
    </v-btn>
    <v-btn v-show="$route.name === 'home'" flat icon @click="more">
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import router from "@/router";
import { MODULES } from "@/store";

export default {
  name: "TheNavigation",
  data: () => ({
    toggleIcon: "expand_more"
  }),
  created() {
    this.$eventHub.$on("update:toggleIcon", e => {
      this.toggleIcon = e;
    });
  },
  beforeDestroy() {
    this.$eventHub.$off("update:toggleIcon");
  },
  methods: {
    togglePanels() {
      if (this.toggleIcon === "expand_more") {
        this.toggleIcon = "expand_less";
      } else {
        this.toggleIcon = "expand_more";
      }
      this.$eventHub.$emit("update:togglePanels");
    },
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

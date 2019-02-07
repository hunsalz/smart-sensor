<template>
  <v-app id="app">
    <app-navigation></app-navigation>
    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
    <v-footer height="auto" color="primary">
      <v-layout justify-center row>
        <v-btn flat href="https://github.com/hunsalz/smart-sensor" target="_blank" rel="noreferrer">
          <span class="white--text">GitHub</span>
        </v-btn>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    AppNavigation: () => import('./components/AppNavigation.vue')
  },
  created () {
    this.setTitle()
  },
  methods: {
    setTitle () {
      document.title = this.$t('app.name')
    }
  }
}
</script>

<style>
</style>

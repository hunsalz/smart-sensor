<template>
  <v-container grid-list-md>
    <v-layout align-space-between justify-start wrap>
      <v-flex v-for="i in 5" :key="i" xs6>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">ESP-8266</div>
            <v-card>
              <v-card-text
                class="grey lighten-3"
              >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "AppOverview"
  };
</script>

<style scoped>
</style>
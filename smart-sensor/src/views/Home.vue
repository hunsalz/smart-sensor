<template>
  <v-container grid-list-sm>
    <v-layout
      row
      wrap
    >
      <v-flex
        v-for="i in 5"
        :key="i"
        xs12
        sm6
        md4
      >
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">
              <panel-header />
            </div>
            <v-card>
              <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PanelHeader from "@/components/PanelHeader";

  export default {
    name: "Home",
    components: {
      PanelHeader
    }
  };
</script>

<style scoped>
</style>

<template>
  <v-container
    grid-list-md
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-space-around
      row
      wrap
    >
      <v-flex
        xs12
        md6
        xl4
      >
        <v-expansion-panel>
          <v-expansion-panel-content>
            <div slot="header">
              <panel-header device="ESP-000023f09d" />
            </div>
            <v-card>
              <v-card-text>Lorem ipsum dolor sit amet ...</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-content>
            <div slot="header">
              <panel-header device="ESP-0023a4ae30" />
            </div>
            <v-card>
              <v-card-text>Lorem ipsum dolor sit amet ...</v-card-text>
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
    },
    data: () => ({
      show: false
    }),
    created() {
      //this.$store.dispatch("queryDevices");
    }
  };
</script>

<style scoped>
</style>

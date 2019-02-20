<template>
  <v-container
    grid-list-xs
    fluid
  >
    <v-layout row>
      <v-flex
        xs12
        md6
        xl4
      >
        <v-expansion-panel expand>
          <v-expansion-panel-content
            v-for="(device, index) in devices"
            :key="index"
          >
            <div slot="header">
              <panel-header
                :device="device.name"
                :label="device.label"
              />
            </div>
            <panel-tabs>
              <panel-chart :device="device.name" />
            </panel-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PanelHeader from "@/components/PanelHeader";
  import PanelTabs from "@/components/PanelTabs";
  import PanelChart from "@/components/PanelChart";

  export default {
    name: "Home",
    components: {
      PanelHeader,
      PanelTabs,
      PanelChart
    },
    computed: {
      devices: function() {
        return this.$store.getters["Device/getDevices"];
      }
    },
    created() {
      this.$store.dispatch("Device/getDevices");
    }
  };
</script>

<style scoped>
</style>

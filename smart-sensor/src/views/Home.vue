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
            <v-tabs
              grow
              slider-color="yellow"
            >
              <v-tab
                v-for="(tab, index) in tabs"
                :key="index"
                class="caption"
              >
                {{ $t(tab) }}
              </v-tab>
              <v-tab-item
                v-for="(tab, index) in tabs"
                :key="index"
                lazy
              >
                <!--chartist
                  ratio="ct-major-second"
                  type="Line"
                  :data="chartData"
                  :options="chartOptions"
                /-->
              </v-tab-item>
            </v-tabs>
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
      tabs: ["tabs.last4h", "tabs.last24h", "tabs.last7d", "tabs.last10"],
      chartData: {
        labels: ["A", "B", "C"],
        series: [[1, 3, 2], [4, 6, 5]]
      },
      chartOptions: {
        lineSmooth: false
      }
    }),
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

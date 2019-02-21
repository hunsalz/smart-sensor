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
            <v-tabs grow>
              <v-tab
                v-for="(tab, index1) in tabs"
                :key="index1"
                class="caption"
              >
                {{ $t(tab.name) }}
              </v-tab>
              <v-tab-item
                v-for="(tab, index2) in tabs"
                :key="index2"
                lazy
              >
                <panel-chart
                  :device="device.name"
                  :filter="tabs[index2]"
                />
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
  import PanelChart from "@/components/PanelChart";

  export default {
    name: "Home",
    components: {
      PanelHeader,
      PanelChart
    },
    data: function() {
      return {
        tabs: [
          {
            name: "tabs.last10",
            key: "LAST_10",
            limit: 10
          },
          {
            name: "tabs.last4hours",
            key: "LAST_4_HOURS",
            offsetFromNowInMillis: 4 * 60 * 60 * 1000,
            limit: 1000
          },
          {
            name: "tabs.last24hours",
            key: "LAST_24_HOURS",
            offsetFromNowInMillis: 24 * 60 * 60 * 1000,
            limit: 1000
          },
          {
            name: "tabs.last7days",
            key: "LAST_7_DAYS",
            offsetFromNowInMillis: 7 * 24 * 60 * 60 * 1000,
            limit: 1000
          }
        ]
      };
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

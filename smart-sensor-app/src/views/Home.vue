<template>
  <v-container grid-list-xs fluid>
    <v-layout row>
      <v-flex xs12 md6 xl4>
        <v-expansion-panel expand>
          <v-expansion-panel-content
            v-for="(device, index1) in devices"
            :key="index1"
          >
            <div slot="header">
              <panel-header :device="device.name" :label="device.label" />
            </div>
            <v-tabs grow>
              <v-tab
                v-for="(tab, index2) in tabs"
                :key="index2"
                class="caption"
              >
                {{ $t(tab.name) }}
              </v-tab>
              <v-tab-item v-for="(tab, index3) in tabs" :key="index3" lazy>
                <panel-charts :device="device.name" :filter="tabs[index3]" />
              </v-tab-item>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { MODULES } from "@/store";
import { LIMIT_REDUCE, TIME_REDUCE } from "@/components/mixins/ReduceFunctions";

export default {
  name: "Home",
  data: () => ({
    tabs: [
      {
        name: "tabs.last10",
        key: "LAST_10",
        offsetFromNowInMillis: NaN,
        limit: 10,
        reduceFunction: LIMIT_REDUCE
      },
      {
        name: "tabs.last4hours",
        key: "LAST_4_HOURS",
        offsetFromNowInMillis: 4 * 60 * 60 * 1000,
        limit: 1000,
        reduceFunction: TIME_REDUCE
      },
      {
        name: "tabs.last24hours",
        key: "LAST_24_HOURS",
        offsetFromNowInMillis: 24 * 60 * 60 * 1000,
        limit: 1000,
        reduceFunction: TIME_REDUCE
      },
      {
        name: "tabs.last7days",
        key: "LAST_7_DAYS",
        offsetFromNowInMillis: 7 * 24 * 60 * 60 * 1000,
        limit: 1000,
        reduceFunction: TIME_REDUCE
      }
    ]
  }),
  computed: {
    devices: function() {
      return this.$store.getters[MODULES.Device.getters.getDevices];
    }
  },
  created() {
    this.$store.dispatch(MODULES.Device.actions.loadDevices);
  }
};
</script>

<style scoped></style>

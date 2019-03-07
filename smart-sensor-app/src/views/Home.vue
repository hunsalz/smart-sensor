<template>
  <v-container grid-list-md fluid>
    <v-layout row>
      <v-flex xs12 md6 xl4>
        <v-card-actions>
          <!--v-select label="Size"></v-select-->
          <v-spacer></v-spacer>
          <v-btn @click="toggle" color="primary" fab small>
            <v-icon>{{ computedExpandToggleIcon }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expansion-panel expand v-model="computedPanels">
          <v-expansion-panel-content
            v-for="device in computedDevices"
            :key="device.name"
          >
            <div slot="header">
              <panel-header :device="device.name" :label="device.label" />
            </div>
            <v-tabs grow>
              <v-tab v-for="tab in tabs" :key="tab.name" class="caption">
                {{ $t(tab.name) }}
              </v-tab>
              <v-tab-item v-for="(tab, index) in tabs" :key="index" lazy>
                <panel-charts :device="device.name" :filter="tabs[index]" />
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
    computedDevices() {
      return this.$store.getters[MODULES.Device.getters.getDevices];
    },
    computedExpandToggle() {
      if (this.computedPanels.length == 0) {
        return false;
      }
      return this.computedPanels.every(value => {
        return value ? true : false;
      });
    },
    computedExpandToggleIcon() {
      return !this.computedExpandToggle ? "expand_more" : "expand_less";
    },
    computedPanels: {
      get() {
        return this.$store.getters[MODULES.AppPreferences.getters.getPanels]
          ? this.$store.getters[MODULES.AppPreferences.getters.getPanels]
          : [];
      },
      set(computedPanels) {
        this.$store.commit(
          MODULES.AppPreferences.mutations.setPanels,
          computedPanels
        );
      }
    }
  },
  created() {
    //this.$store.dispatch(MODULES.Device.actions.loadDevices);
  },
  methods: {
    toggle() {
      if (!this.computedExpandToggle) {
        this.computedPanels = [
          ...Array(this.computedDevices.length).keys()
        ].map(() => true);
      } else {
        this.computedPanels = [];
      }
    }
  }
};
</script>

<style scoped></style>

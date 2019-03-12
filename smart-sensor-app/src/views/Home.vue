<template>
  <v-container fluid pl-0 pr-0>
    <v-layout row>
      <v-flex>
        <v-subheader>
          <!--v-select label="Size"></v-select-->
          <v-spacer></v-spacer>
          <v-btn @click="toggle" color="info" fab small>
            <v-icon>{{ computedExpandToggleIcon }}</v-icon>
          </v-btn>
        </v-subheader>
        <v-container grid-list-md fluid>
          <v-layout row wrap>
            <v-flex xs12 md6 xl4>
              <!--v-hover>
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  flat
                  tile
                >
                  <v-img
                    :src="
                      `https://unsplash.it/150/300?image=${Math.floor(
                        Math.random() * 100
                      ) + 1}`
                    "
                    height="150px"
                  ></v-img>
                </v-card>
              </v-hover-->

              <v-expansion-panel expand v-model="computedPanels" ma-0 pa-0>
                <v-expansion-panel-content
                  v-for="device in computedDevices"
                  :key="device.name"
                >
                  <panel-header
                    slot="header"
                    :device="device.name"
                    :label="device.label"
                  />
                  <v-tabs grow>
                    <v-tab v-for="tab in tabs" :key="tab.name" class="caption">
                      {{ $t(tab.name) }}
                    </v-tab>
                    <v-tab-item v-for="(tab, index) in tabs" :key="index" lazy>
                      <panel-charts
                        :device="device.name"
                        :filter="tabs[index]"
                      />
                    </v-tab-item>
                  </v-tabs>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-flex>
          </v-layout>
        </v-container>
        <back-to-top visibleoffset="80" right="14px" bottom="20px">
          <v-btn color="info" fab small>
            <v-icon>expand_less</v-icon>
          </v-btn>
        </back-to-top>
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
    this.$store.dispatch(MODULES.Device.actions.loadDevices);
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

<style scoped>
.expansion-panel__container {
  background-color: rgba(255, 0, 0, 1);
}
</style>

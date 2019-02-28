<template>
  <v-container
    ma-0
    pa-0
    fluid
  >
    <v-layout row>
      <v-flex xs5>
        <v-card flat>
          <v-card-text>
            <div>
              <div class="subheading">
                {{ computedLabel }}
              </div>
              <span class="font-weight-light grey--text caption">
                {{ device }}
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card flat>
          <v-card-text class="font-weight-light caption">
            <div>
              <div>{{ $t('units.temperature') }} {{ computedValue.temperature }} °</div>
              <div>{{ $t('units.humidity') }} {{ computedValue.humidity }} %</div>
              <div>{{ $t('units.pressure') }} {{ computedValue.pressure }} Pa</div>
              <div>{{ $t('units.altitude') }} {{ computedValue.altitude }} m</div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex>
        <div class="text-xs-center grey--text font-weight-light caption">
          {{ $t('app.panel.lastUpdate') }} : {{ computedLastUpdateDate }}
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import moment from "moment";
  import { MODULES } from "@/store";

  export default {
    name: "PanelHeader",
    props: {
      device: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: false,
        default: ""
      }
    },
    computed: {
      computedLabel: function() {
        // add device name as fallback
        return this.label === "" ? this.device : this.label;
      },
      computedValue: function() {
        return this.$store.getters[MODULES.BME280.getters.getValue](this.device);
      },
      computedLastUpdateDate() {
        return moment(this.computedValue.createdAt).format('LLL');
      }
    },
    created() {
      this.$store.dispatch(MODULES.BME280.actions.subscribeToValues, this.device);
    }
  };
</script>

<style scoped>
</style>

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
                {{ computeLabel }}
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
              <div>{{ $t('units.temperature') }} {{ computeValue.temperature }} °</div>
              <div>{{ $t('units.humidity') }} {{ computeValue.humidity }} %</div>
              <div>{{ $t('units.pressure') }} {{ computeValue.pressure }} Pa</div>
              <div>{{ $t('units.altitude') }} {{ computeValue.altitude }} m</div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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
      computeLabel: function() {
        // add device name as fallback
        return this.label === "" ? this.device : this.label;
      },
      computeValue: function() {
        return this.$store.getters["BME280/getValue"](this.device);
      }
    },
    created() {
      this.$store.dispatch("BME280/subscribeToValues", this.device);
    }
  };
</script>

<style scoped>
</style>

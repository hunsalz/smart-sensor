<template>
  <v-container
    ma-0
    pa-0
    fluid
  >
    <v-layout row>
      <v-flex xs5>
        <v-card
          flat
        >
          <v-card-text>
            <div>
              <div class="subheading">
                {{ label }}
              </div>
              <span class="font-weight-light grey--text caption">
                {{ device }}
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card
          flat
        >
          <v-card-text class="font-weight-light caption">
            <div>
              <div>{{ $t('label.temperature') }} {{ getData.temperature }} °</div>
              <div>{{ $t('label.humidity') }} {{ getData.humidity }} %</div>
              <div>{{ $t('label.pressure') }} {{ getData.pressure }} Pa</div>
              <div>{{ $t('label.altitude') }} {{ getData.altitude }} m</div>
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
      }
    },
    data: function() {
      return {
        label: "MeinSensor"
      };
    },
    computed: {
      getData() {
        return this.$store.getters["BME280/getData"](this.device);
      }
    },
    created() {
      this.$store.dispatch("BME280/subscribeToLastBME280Entry", this.device);
    }
  };
</script>

<style scoped>
</style>

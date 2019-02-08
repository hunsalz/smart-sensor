<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <v-layout column>
          <v-flex>{{ label }}</v-flex>
          <v-flex>{{ device }}</v-flex>
        </v-layout>
      </v-flex>
      <v-spacer />
      <v-flex>
        <v-layout column>
          <v-flex>{{ $t('label.temperature') }} {{ getTemperature }} °</v-flex>
          <v-flex>{{ $t('label.humidity') }} 54 %</v-flex>
          <v-flex>{{ $t('label.pressure') }} 32322 Pa</v-flex>
          <v-flex>{{ $t('label.altitude') }} 122 m</v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "PanelHeader",
    data: function() {
      return {
        label: "MeinSensor",
        device: "ESP-000023f09d"
      };
    },
    computed: {
      getTemperature() {
        return this.$store.state.temperature;
      }
    },
    created() {
      this.$store.dispatch("first", {
        device: this.device
      });
    }
  };
</script>

<style scoped>
</style>

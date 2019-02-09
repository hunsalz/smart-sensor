<template>
  <v-container fluid>
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
          <v-flex>{{ $t('label.temperature') }} {{ getData.temperature }} °</v-flex>
          <v-flex>{{ $t('label.humidity') }} {{ getData.humidity }} %</v-flex>
          <v-flex>{{ $t('label.pressure') }} {{ getData.pressure }} Pa</v-flex>
          <v-flex>{{ $t('label.altitude') }} {{ getData.altitude }} m</v-flex>
        </v-layout>
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
        return this.$store.state[this.device];
      }
    }
  };
</script>

<style scoped>
</style>

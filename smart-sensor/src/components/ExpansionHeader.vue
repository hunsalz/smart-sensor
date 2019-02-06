<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <v-layout column>
          <v-flex>Label</v-flex>
          <v-flex>ESP-0000001</v-flex>
        </v-layout>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex>
        <v-layout column>
          <v-flex>Temperature 22</v-flex>
          <v-flex>Humidity 54 %</v-flex>
          <v-flex>Pressure 32322 Pa</v-flex>
          <v-flex>Altitude 122 m</v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "ExpansionHeader"
  };
</script>

<style scoped>
</style>
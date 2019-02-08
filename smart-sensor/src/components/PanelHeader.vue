<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <v-layout column>
          <v-flex>Label</v-flex>
          <v-flex>ESP-0000001</v-flex>
        </v-layout>
      </v-flex>
      <v-spacer />
      <v-flex>
        <v-layout column>
          <v-flex>{{ $t('label.temperature') }} 22 °</v-flex>
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
  name: 'PanelHeader'
}
</script>

<style scoped>
</style>

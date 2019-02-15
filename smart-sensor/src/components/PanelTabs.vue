<template>
  <v-container
    ma-0
    pa-0
    fluid
  >
    <v-layout row>
      <v-flex>
        <v-tabs
          grow
          slider-color="yellow"
        >
          <v-tab
            v-for="(tab, index) in tabs"
            :key="index"
            class="caption"
          >
            {{ $t(tab) }}
          </v-tab>
          <v-tab-item
            v-for="(tab, index) in tabs"
            :key="index"
            lazy
          >
            <slot />
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "PanelTabs",
    data: () => ({
      tabs: ["tabs.last4h", "tabs.last24h", "tabs.last7d", "tabs.last10"]
    })
  };
</script>

<style scoped>
</style>

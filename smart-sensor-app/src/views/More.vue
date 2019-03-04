<template>
  <v-container fill-height>
    <v-layout
      align-center
      justify-center
    >
      <v-flex>
        <v-card class="elevation-12">
          <v-toolbar color="primary">
            <v-toolbar-title class="white--text">
              {{ $t('app.more.name') }}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-for="(device, index) in devices"
                :key="index"
                prepend-icon="label"
                name="label"
                type="text"
                counter
                maxlength="20"
                :label="device.name"
                :value="device.label"
                @input="label => updateLabel(index, label)"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              @click="submit"
            >
              {{ $t('app.more.btn') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { MODULES } from "@/store";

  export default {
    name: "More",
    computed: {
      devices: function() {
        return this.$store.getters[MODULES.Device.getters.getDevices];
      }
    },
    created() {
      this.$store.dispatch(MODULES.Device.actions.loadDevices);
    },
    methods: {
      submit() {
        this.$store.dispatch(MODULES.Device.actions.saveDevices);
      },
      updateLabel(index, label) {
        this.$store.commit(MODULES.Device.mutations.setLabel, { index, label });
      }
    }
  };
</script>

<style scoped>
</style>
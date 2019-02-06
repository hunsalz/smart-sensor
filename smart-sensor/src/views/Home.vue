<template>
  <v-container grid-list-sm>
    <v-layout row wrap>
      <v-flex v-for="i in 5" :key="i" xs12 sm6 md4>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">
              <expansion-header></expansion-header>
            </div>
            <v-card>
              <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import ExpansionHeader from "@/components/ExpansionHeader";

  export default {
    name: "Home",
    components: {
      ExpansionHeader
    }
  };
</script>

<style scoped>
  .info2 {
    width: 100%;
  }

  .label {
    font-size: 2em;
    font-weight: 500;
    text-align: center;
  }

  .key {
    font-size: 0.8em;
    text-align: center;
  }

  .details {
    font-size: 0.8em;
    width: 100%;
  }

  .column {
    padding-left: 5px;
    padding-right: 5px;
  }
</style>
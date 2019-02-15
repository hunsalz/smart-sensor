<template>
  <v-container
    ma-0
    pa-0
    fluid
  >
    <v-layout row>
      <v-flex>
        <v-card>
          <chartist
            ref="chart"
            type="Line"
            :data="data"
            :options="options"
          />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "PanelChart",
    props: {
      device: {
        type: String,
        required: true
      }
    },
    data: () => ({
      data: {
        labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
        series: [[230, 750, 450, 300, 280, 240, 200, 190]]
      },
      options: {
        lineSmooth: true,
        low: 0,
        high: 1000,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    }),
    created() {
      this.$store.dispatch("BME280/getValues", { 
        device: this.device, 
        createdAt: new Date('January 1, 1970 00:00:00') 
      });
    },
    mounted() {
      //console.log(this.$refs.chart)
      //this.$refs.chart.redraw();
    }
  };
</script>

<style scoped>
</style>

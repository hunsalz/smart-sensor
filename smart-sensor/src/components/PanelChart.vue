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
            ratio="ct-major-second"
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
  import moment from "moment";

  export default {
    name: "PanelChart",
    props: {
      device: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        options: {
          lineSmooth: true,
          axisX: {
            type: this.$chartist.FixedScaleAxis,
            divisor: 5,
            labelInterpolationFnc(value) {
              return moment(new Date()).format("hh::mm::ss");
            }
          },
          yAxes: [
            {
              ticks: {
                suggestedMin: -50,
                suggestedMax: 50
              }
            }
          ]
        }
      };
    },
    computed: {
      data: function() {
        return {
          series: [
            {
              data: [
                { x: new Date(143134652600), y: 53 },
                { x: new Date(143234652600), y: 40 },
                { x: new Date(143340052600), y: 45 },
                { x: new Date(143366652600), y: 40 },
                { x: new Date(143410652600), y: 20 },
                { x: new Date(143508652600), y: 32 },
                { x: new Date(143569652600), y: 18 },
                { x: new Date(143579652600), y: 11 }
              ]
            }
          ]
        };

        // return {
        //   series: [
        //     {
        //       data: this.$store.getters["BME280/getValuesByLabel"](
        //         this.device,
        //         "all"
        //       )
        //     }
        //   ]
        // };
      }
    },
    created() {
      this.$store.dispatch("BME280/loadValues", {
        device: this.device,
        label: "all",
        createdAt: new Date("January 1, 1970 00:00:00")
      });
    },
    mounted() {
      //console.log(this.$refs.chart)
      //this.$refs.chart.redraw();
    }
  };
</script>

<style scoped>
  .ct-label {
    color: inherit;
    opacity: 0.7;
    font-size: 0.975rem;
    font-weight: 100;
  }

  .ct-grid {
    stroke: rgba(255, 255, 255, 0.2);
  }
  .ct-series-a .ct-point,
  .ct-series-a .ct-line,
  .ct-series-a .ct-bar,
  .ct-series-a .ct-slice-donut {
    stroke: rgba(255, 255, 255, 0.8);
  }
  .ct-series-a .ct-slice-pie,
  .ct-series-a .ct-area {
    fill: rgba(255, 255, 255, 0.4);
  }
</style>

<template>
  <v-container
    ma-0
    pa-0
    fluid
  >
    <v-layout row>
      <v-flex>
        <v-card>
          <line-chart
            :chart-data="computedData"
            :options="options"
          />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import LineChart from "./LineChart.js";

  export default {
    name: "PanelChart",
    components: {
      LineChart
    },
    props: {
      device: {
        type: String,
        required: true
      }
    },
    data: function() {
      return {
        options: {
          fill: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                type: "time",
                distribution: "series",
                time: {
                  unit: "minute",
                  //round: "minute",
                  displayFormats: {
                    minute: "dd HH:mm:ss"
                  }
                },
                ticks: {
                  source: "labels"
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      };
    },
    computed: {
      computedData: function() {
        let series = this.$store.getters["BME280/getValuesByLabel"](
          this.device,
          "all"
        );
        return {
          labels: series.labels,
          datasets: [
            {
              backgroundColor: "rgba(33, 150, 243, 0.3)",
              data: series.data
            }
          ]
        };
      }
    },
    created() {
      this.$store.dispatch("BME280/loadValues", {
        device: this.device,
        label: "all",
        createdAt: new Date("January 1, 1970 00:00:00")
      });
    }
  };
</script>

<style scoped>
</style>

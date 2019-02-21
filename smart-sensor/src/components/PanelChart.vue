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
            :chart-data="computedTemperatures"
            :options="options"
          />
          <line-chart
            :chart-data="computedHumidities"
            :options="options"
          />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import LineChart from "./LineChart.js";

  const LAST_1000_ENTRIES = "LAST_1000_ENTRIES";

  export default {
    name: "PanelChart",
    components: {
      LineChart
    },
    props: {
      device: {
        type: String,
        required: true
      },
      filter: {
        type: Object,
        default: () => {
          return {
            key: LAST_1000_ENTRIES,
            limit: 1000
          };
        }
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
      computedTemperatures: function() {
        let series = this.$store.getters["BME280/getSeries"](
          this.device,
          this.filter.key
        );
        return {
          labels: series.labels,
          datasets: [
            {
              backgroundColor: "rgba(211, 47, 47, 0.3)",
              data: series.temperatures
            }
          ]
        };
      },
      computedHumidities: function() {
        let series = this.$store.getters["BME280/getSeries"](
          this.device,
          this.filter.key
        );
        return {
          labels: series.labels,
          datasets: [
            {
              backgroundColor: "rgba(2, 136, 209, 0.3)",
              data: series.humidities
            }
          ]
        };
      }
    },
    created() {
      this.$store.dispatch("BME280/loadSeries", {
        device: this.device,
        key: this.filter.key,
        offsetFromNowInMillis: this.filter.offsetFromNowInMillis,
        limit: this.filter.limit
      });
    }
  };
</script>

<style scoped>
</style>

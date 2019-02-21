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
            createdAt: new Date("January 1, 1970 00:00:00"),
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
      computedData: function() {
        let series = this.$store.getters["BME280/getSeries"](
          this.device,
          this.filter.key
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
      this.$store.dispatch("BME280/loadSeries", {
        device: this.device,
        key: this.filter.key,
        createdAt: this.filter.createdAt,
        limit: this.filter.limit
      });
    }
  };
</script>

<style scoped>
</style>

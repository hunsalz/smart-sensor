<template>
  <v-container ma-0 pa-0 fluid>
    <v-layout row>
      <v-flex>
        <v-card>
          <v-card-text>
            <div class="text-xs-center grey--text">
              {{ $t("units.temperature") }}
            </div>
          </v-card-text>
          <line-chart :chart-data="computedTemperatures" :options="options" />
          <v-card-text>
            <div class="text-xs-center grey--text">
              {{ $t("units.humidity") }}
            </div>
          </v-card-text>
          <line-chart :chart-data="computedHumidities" :options="options" />
          <v-card-text>
            <div class="text-xs-center grey--text">
              {{ $t("units.pressure") }}
            </div>
          </v-card-text>
          <line-chart :chart-data="computedPressures" :options="options" />
          <v-card-text>
            <div class="text-xs-center grey--text">
              {{ $t("units.altitude") }}
            </div>
          </v-card-text>
          <line-chart :chart-data="computedAltitudes" :options="options" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LineChart from "./mixins/LineChart.js";
import { LIMIT_REDUCE } from "./mixins/ReduceFunctions.js";
import { MODULES } from "@/store";

export const LAST_1000_ENTRIES = "LAST_1000_ENTRIES";

export default {
  name: "PanelCharts",
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
          offsetFromNowInMillis: NaN,
          limit: 1000,
          reduceFunction: LIMIT_REDUCE
        };
      }
    }
  },
  data: () => ({
    options: {
      fill: true,
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 0
        }
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
                minute: "HH:mm:ss"
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
  }),
  computed: {
    computedTemperatures: function() {
      let series = this.$store.getters[MODULES.BME280.getters.getSeries](
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
      let series = this.$store.getters[MODULES.BME280.getters.getSeries](
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
    },
    computedPressures: function() {
      let series = this.$store.getters[MODULES.BME280.getters.getSeries](
        this.device,
        this.filter.key
      );
      return {
        labels: series.labels,
        datasets: [
          {
            backgroundColor: "rgba(81, 45, 168, 0.3)",
            data: series.pressures
          }
        ]
      };
    },
    computedAltitudes: function() {
      let series = this.$store.getters[MODULES.BME280.getters.getSeries](
        this.device,
        this.filter.key
      );
      return {
        labels: series.labels,
        datasets: [
          {
            backgroundColor: "rgba(69, 90, 100, 0.3)",
            data: series.altitudes
          }
        ]
      };
    }
  },
  created() {
    this.$store.dispatch(MODULES.BME280.actions.loadSeries, {
      device: this.device,
      key: this.filter.key,
      offsetFromNowInMillis: this.filter.offsetFromNowInMillis,
      limit: this.filter.limit,
      reduceFunction: this.filter.reduceFunction
    });
  }
};
</script>

<style scoped></style>

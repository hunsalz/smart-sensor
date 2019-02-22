import Vue from 'vue'
import Parse from 'parse'

Parse.initialize(
  '1IFq8uk57NzXVMvzb1EYtytchOCj4OEUMyCawK1a',
  'jtl8Wgy2RajOIMqxlQjuAjJFqfZoMLLlL5yLWooY'
)
Parse.serverURL = 'https://smart-sensor.back4app.io'
Parse.liveQueryServerURL = 'wss://smart-sensor.back4app.io'

Vue.use(Parse)
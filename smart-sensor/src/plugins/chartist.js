import Vue from 'vue'
import 'chartist/dist/chartist.min.css'

Vue.use(require('vue-chartist'), { messageNoData: 'You have not enough data', classNoData: 'empty' })

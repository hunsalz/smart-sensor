import Vue from 'vue'

const moment = require('moment')
require('moment/locale/de')

Vue.use(require('vue-moment'), {
  moment
})

// TODO finalize i18n
// console.log(Vue.moment().locale())
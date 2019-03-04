import Vue from 'vue'

const moment = require('moment')
require('moment/locale/' + process.env.VUE_APP_I18N_LOCALE)

Vue.use(require('vue-moment'), {
  moment
})
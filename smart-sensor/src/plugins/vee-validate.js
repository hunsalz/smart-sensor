import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';

const i18n = new VueI18n();

Vue.use(VeeValidate, {
    validity: true
});
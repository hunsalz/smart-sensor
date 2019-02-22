import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
//import messagesEN from 'vee-validate/dist/locale/en'
import messagesDE from 'vee-validate/dist/locale/de'
//import VueI18n from 'vue-i18n'

// const i18n = new VueI18n();

// Vue.use(VeeValidate, {
//     i18nRootKey: 'validations',
//     i18n,
//     dictionary: {
//         en: { messages: { ...messagesEN } },
//         de: { messages: { ...messagesDE } },
//     }
// });

// TODO https://baianat.github.io/vee-validate/guide/localization.html#vuei18n-integration

Validator.localize({ de: messagesDE })

Vue.use(VeeValidate, { locale: 'de' })

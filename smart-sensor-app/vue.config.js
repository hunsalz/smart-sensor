// eslint-disable-next-line no-undef
module.exports = {
  publicPath: '/smart-sensor/',
  lintOnSave: process.env.NODE_ENV !== 'production',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    },
    pwa: {
      name: 'Smart Sensor',
      themeColor: '#1976D2',
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'default'
    }
  }
}

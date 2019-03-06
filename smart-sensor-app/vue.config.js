// eslint-disable-next-line no-undef
module.exports = {
  publicPath: "./",
  lintOnSave: process.env.NODE_ENV !== "production",
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    },
    pwa: {
      name: "Smart Sensor App",
      themeColor: "#1976D2",
      msTileColor: "#000000",
      appleMobileWebAppCapable: "yes",
      appleMobileWebAppStatusBarStyle: "default",
      iconPaths: {
        favicon32: "img/icons/favicon-32x32.png",
        favicon16: "img/icons/favicon-16x16.png",
        appleTouchIcon: "img/icons/apple-touch-icon-180x180.png",
        maskIcon: "img/icons/safari-pinned-tab.svg",
        msTileImage: "img/icons/msapplication-icon-144x144.png"
      },
      workboxOptions: {
        cacheId: "sensor-app",
        importWorkboxFrom: "local"
      }
    }
  },
  chainWebpack: config => {
    config.module.rules.delete("svg");
    config.module.rule("images").test(/\.(svg|png|jpe?g|gif|webp)(\?.*)?$/);
  }
};

module.exports = {
    chainWebpack: config => {
      config.module.rules.delete('eslint');
    },
    css: {
      loaderOptions: {
        scss: {
          prependData: `@import "~@/assets/scss/variables.scss";`
        },
      }
    }
  }
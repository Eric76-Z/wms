const path = require("path"); //引入path模块
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
module.exports = {
  publicPath: "/", // 公共路径(必须有的)
  indexPath: "index.html", // 相对于打包路径index.html的路径
  outputDir: "dist", // 'dist', 生产环境构建文件的目录
  // publicPath: "./",
  assetsDir: "static", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  // productionSourceMap: false, //去除打包后js的map文件
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true,
    },
    host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: {
      //配置多个跨域
      "/api": {
        target: "http://172.11.11.11:7071",
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/api": "/",
        },
      },
      "/api2": {
        target: "http://172.12.12.12:2018",
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/api2": "/",
        },
      },
    },
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("components", resolve("./src/components"))
      .set("assets", resolve("./src/assets"))
      .set("commonjs", resolve("./src/commonjs"))
      .set("network", resolve("./src/network"))
      .set("views", resolve("@/views"));
    //set第一个参数：设置的别名，第二个参数：设置的路径
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/variables.scss";`,
      },
      scss: {
        prependData: `@import "~@/assets/scss/variables.scss";`,
      },
    },
  },

  //去掉console
  configureWebpack: (config) => {
    // 判断为生产模式下，因为开发模式我们是想保存console的
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer.map((arg) => {
        const option = arg.options.terserOptions.compress;
        option.drop_console = true; // 打开开关
        return arg;
      });
    }
  },

  // configureWebpack: {
  //   // 关闭 webpack 的性能提示
  //   // performance: {
  //   //   hints:false
  //   // }

  //   // //或者

  //   // 警告 webpack 的性能提示
  //   performance: {
  //     hints: "warning",
  //     // 入口起点的最大体积
  //     maxEntrypointSize: 50000000,
  //     // 生成文件的最大体积
  //     maxAssetSize: 30000000,
  //     // 只给出 js 文件的性能提示
  //     assetFilter: function (assetFilename) {
  //       return assetFilename.endsWith(".js");
  //     },
  //   },
  // },

  // devServer: {
  //   proxy: {
  //     [process.env.VUE_APP_DEV]: {
  //       target: process.env.VUE_APP_BASE,
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         [`^${process.env.VUE_APP_DEV}`]: "",
  //       },
  //     },
  //   },
  // },
  // pluginOptions: {
  //   electronBuilder: {
  //     builderOptions: {
  //       productName: "product",
  //       appId: "com.company.product",
  //       nsis: {
  //         deleteAppDataOnUninstall: true,
  //       },
  //     },
  //   },
  // },
};

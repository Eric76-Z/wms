import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import user from "./modules/user";
import blade from "./modules/blade/blade";

// // //因为我把模块拆分了，但是我又不想每次都导入，就通过这个自动导入modules目录下的模块
// const modulesFiles = require.context("./modules", true, /\.js$/);
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
//   const value = modulesFiles(modulePath);
//   modules[moduleName] = value.default;
//   return modules;
// }, {});

const PERSIST_PATHS = ["location", "user"];
const state = {
  location: {
    local: [],
    robot: [],
    weldinggun: [],
  },
  listOffset: {
    bladedetail_scrollTop: 0,
  },
  navbarcfg: {
    mainnavbarcfg: {
      title: "",
      isShow: [false, false, false],
    },
  },
  temp: {
    partdetail: {},
  },
};

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    user: user,
    blade: blade,
  },
  plugins: [
    createPersistedState({
      paths: PERSIST_PATHS,
    }),
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        console.log(val);
        return {
          bladeinfo: val.blade.bladeinfo,
          bladeitemdata: val.blade.bladeitemdata,
          listOffset: val.listOffset,
          temp: val.temp,
        };
      },
    }),
  ],
});

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

const PERSIST_PATHS = ["location", "user", "search"];
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
    popnavbarcfg: {
      title: "",
      isShow: [false, false, false],
    },
  },
  temp: {
    partdetail: {},
  },
  search: {
    partsearch: {
      history: [],
    },
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

Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

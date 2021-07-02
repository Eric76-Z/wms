import { createStore } from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import modules from "./modules";

const state = {};

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules,
});

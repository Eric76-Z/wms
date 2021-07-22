import { ADD_TO_BLADEINFO, ADD_TO_BLADEITEMDATA } from "@/store/mutation-types";
import { reqBladeData } from "@/network/sort.js";
// import router from "@/router";
// import { Toast } from "vant";
// import { Toast } from "vant";

const state = {
  bladeinfo: {},
  bladeitemdata: {},
};

const mutations = {
  [ADD_TO_BLADEINFO](state, payload) {
    payload.checked = true;
    // console.log(payload);
    state.bladeinfo = payload;
  },
  [ADD_TO_BLADEITEMDATA](state, payload) {
    console.log(payload);
    state.bladeitemdata = payload;
    console.log(state.bladeitemdata);
  },
};

const actions = {
  getBladedata(context, payload) {
    reqBladeData(payload)
      .then((res) => {
        switch (payload.target) {
          case "getbladeinfo":
            console.log(res);
            context.commit(ADD_TO_BLADEINFO, res.callback);
            break;
          case "getbladeitemdata":
            context.commit(ADD_TO_BLADEITEMDATA, res.callback);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

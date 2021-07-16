import { ADD_TO_BLADEDATA, ADD_TO_LOCATION } from "./mutation-types";
export default {
  [ADD_TO_BLADEDATA](state, payload) {
    payload.checked = true;
    // console.log(payload);
    state.bladedata = payload;
  },
  [ADD_TO_LOCATION](state, payload) {
    // payload.checked = true;
    state.location = [];
    state.location.push(payload);
    console.log(state.location);
  },
};

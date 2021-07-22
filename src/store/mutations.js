import { ADD_TO_LOCATION } from "./mutation-types";
export default {
  [ADD_TO_LOCATION](state, payload) {
    // payload.checked = true;
    state.location = [];
    state.location.push(payload);
    console.log(state.location);
  },
};

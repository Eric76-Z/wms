import { ADD_TO_LOCATION, CHANGE_OFFSET } from "./mutation-types";
export default {
  [ADD_TO_LOCATION](state, payload) {
    // payload.checked = true;
    state.location = [];
    state.location.push(payload);
    console.log(state.location);
  },
  [CHANGE_OFFSET](state, payload) {
    // switch (payload.target) {
    //   case "bladedetail_scrollTop":
    //     state.listOffset.bladedetail_scrollTop = payload.data;
    //     break;
    //   default:
    //     break;
    // }
    console.log(payload.data);
    state.listOffset = payload.data;
  },
};

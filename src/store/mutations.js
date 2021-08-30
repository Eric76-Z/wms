import { ADD_TO_LOCATION, CHANGE_OFFSET, CHANGE_TEMP } from "./mutation-types";
export default {
  [ADD_TO_LOCATION](state, payload) {
    // payload.checked = true;
    console.log(payload);
    switch (payload.target) {
      case "local":
        state.location.local.length = 0;
        state.location.local = payload.local;
        console.log(state.location);
        break;
      case "robot":
        state.location.robot.length = 0;
        state.location.robot = payload.robot;
        console.log(state.location);
        break;
      case "weldinggun":
        state.location.weldinggun.length = 0;
        state.location.weldinggun = payload.weldinggun;
        console.log(state.location);
        break;
      default:
        console.log("不能识别target");
        break;
    }
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
  [CHANGE_TEMP](state, payload) {
    switch (payload.target) {
      case "partdetail":
        state.temp.partdetail = payload.data;
        break;
      default:
        break;
    }
  },
};

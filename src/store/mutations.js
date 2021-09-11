import {
  ADD_TO_LOCATION,
  CHANGE_OFFSET,
  CHANGE_TEMP,
  SET_TOKEN,
  SET_HISTORY,
  DELETE_HISTORY,
} from "./mutation-types";
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
  [SET_TOKEN](state, payload) {
    if (payload == "logout") {
      state.user.userinfo.token = "";
      state.user.unserState = 400;
    }
  },

  //历史搜索
  [SET_HISTORY](state, payload) {
    switch (payload.target) {
      case "part":
        if (state.search.partsearch.history.indexOf(payload.data) != -1) {
          state.search.partsearch.history.remove(payload.data);
        } else if (state.search.partsearch.history.length >= 20) {
          state.search.partsearch.history.pop();
        }
        state.search.partsearch.history.unshift(payload.data);
        break;
      default:
        break;
    }
  },
  [DELETE_HISTORY](state, payload) {
    switch (payload.target) {
      case "part":
        state.search.partsearch.history.length = 0;
        break;
      default:
        break;
    }
  },
};

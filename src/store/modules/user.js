import { postLogin } from "@/network/sort.js";
// mutation-types
const CHANGE_USER_STATE = "change_user_state";

const state = {
  username: "",
  userId: "",
  token: "",
  userState: 400,
};

const mutations = {
  [CHANGE_USER_STATE]: (state, data) => {
    state.username = data.username;
    state.userId = data.userId;
    console.log(data);
    state.userState = data.state;
    state.token = data.token;
  },
};

const actions = {
  //  用户login/logout
  userChangeState(context, payload) {
    console.log(payload);
    postLogin(payload)
      .then((res) => {
        if (res.state == 200) {
          const data = {
            username: res.username,
            userId: res.userId,
            token: res.token,
            userState: res.state,
          };
          context.commit(CHANGE_USER_STATE, data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // context.commit(CHANGE_USER_STATE, payload);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

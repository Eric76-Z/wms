import { userLogin } from "@/network/sort.js";
import router from "@/router";
// import { Toast } from "vant";
import { USER_LOGIN, USER_LOGOUT } from "@/store/mutation-types";
// import { Toast } from "vant";

const state = {
  userinfo: {
    userIcon: "",
    username: "",
    userId: "",
  },
  token: "",
  userState: 400,
};

const mutations = {
  [USER_LOGIN]: (state, data) => {
    state.userinfo.username = data.username;
    state.userinfo.userId = data.userId;
    state.userState = data.userState;
    state.token = data.token;
    console.log(state);
  },
  [USER_LOGOUT]: (state) => {
    state.userState = "400";
    state.token = "";
  },
};

const actions = {
  //  用户login/logout
  userChangeState(context, payload) {
    if (payload.action === "login") {
      const data = {
        username: payload.username,
        password: payload.password,
      };
      userLogin(data)
        .then((res) => {
          console.log(res);
          if (res.state == 200) {
            const data = {
              username: res.username,
              userId: res.userId,
              token: res.access,
              userState: res.state,
            };
            context.commit(USER_LOGIN, data);
            router.push("/profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (payload.action === "logout") {
      context.commit(USER_LOGOUT);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

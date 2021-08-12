import { userLogin, userRegister, partupUser } from "@/network/sort.js";
import router from "@/router";

import {
  USER_LOGIN,
  USER_LOGOUT,
  USERINFO_CHANGE,
} from "@/store/mutation-types";

const state = {
  userinfo: {
    userIcon: "",
    username: "",
    userId: "",
    firstname: "",
    lastname: "",
    realname: "张炯平",
    isSuper: true,
    groups: [],
    email: "",
    phonenum: "",
  },
  token: "",
  refresh: "",
  userState: 400,
};

const mutations = {
  [USER_LOGIN]: (state, data) => {
    console.log(data);
    state.userinfo.username = data.username;
    state.userinfo.userId = data.userId;
    state.userinfo.firstname = data.firstname;
    state.userinfo.lastname = data.lastname;
    state.userinfo.realname = data.realname;
    state.userinfo.isSuper = data.isSuper;
    state.userinfo.groups = data.groups;

    state.userinfo.email = data.email;
    state.userinfo.phonenum = data.phonenum;

    state.userState = 200;

    data.token != null ? (state.token = data.token) : console.log(state.token);
    data.refresh != null
      ? (state.refresh = data.refresh)
      : console.log(state.refresh);
    console.log(state);
  },
  [USER_LOGOUT]: (state) => {
    state.userState = "400";
    state.token = "";
    state.refresh = "";
  },
  [USERINFO_CHANGE]: (state) => {
    console.log(state);
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
            context.commit(USER_LOGIN, res);
            router.push("/profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (payload.action === "logout") {
      context.commit(USER_LOGOUT);
    } else if (payload.action === "partup") {
      partupUser({
        id: payload.id,
        username: payload.username,
      }).then((res) => {
        context.commit(USER_LOGIN, res);
      });
    }
  },
  Register(context, payload) {
    userRegister(payload)
      .then((res) => {
        context.commit(USER_LOGIN, res);
        router.push("/profile");
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

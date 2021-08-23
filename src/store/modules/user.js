import { userLogin, userRegister, partupUser } from "@/network/sort.js";
import router from "@/router";
import { Toast } from "vant";

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
    first_name: "",
    last_name: "",
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
    state.userinfo.first_name = data.first_name;
    state.userinfo.last_name = data.last_name;
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
            Toast({
              message: "登陆成功",
              duration: 1000,
              onClose: () => {
                router.push("/profile");
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (payload.action === "logout") {
      context.commit(USER_LOGOUT);
    } else if (payload.action === "partup") {
      partupUser(payload).then((res) => {
        console.log(res);
        context.commit(USER_LOGIN, res);
      });
    }
  },
  Register(context, payload) {
    userRegister(payload)
      .then((res) => {
        switch (res.code) {
          case 10:
            Toast.success({
              message: "注册成功！自动登录...",
              duration: 2000,
              onClose: () => {
                userLogin({
                  username: payload.username,
                  password: payload.password,
                })
                  .then((res) => {
                    if (res.state == 200) {
                      context.commit(USER_LOGIN, res);
                      Toast({
                        message: "登陆成功",
                        duration: 1000,
                        onClose: () => {
                          router.push("/profile");
                        },
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              },
            });
            break;
          case 11:
            Toast.fail({
              message: "检查密码输入是否正确！",
              duration: 1000,
            });
            break;
          case 12:
            if (res.msg.username) {
              Toast.fail({
                message: "用户名已存在",
                duration: 1000,
              });
            } else if (res.msg.phonenum) {
              Toast.fail({
                message: "手机号已被注册！",
                duration: 1000,
              });
            } else {
              Toast.fail({
                message: "未知原因！",
                duration: 1000,
              });
            }
            return res;
          default:
            Toast.fail({
              message: "未知原因！",
              duration: 1000,
            });
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

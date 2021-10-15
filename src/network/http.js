import axios from "axios";
import qs from "qs";
import { Dialog, Toast } from "vant";
import store from "../store";
import router from "../router";

// let getCookie = function (cookie) {
//   let reg = /csrftoken=([\w]+)[;]?/g;
//   return reg.exec(cookie)[1];
// };

let config = {
  // baseURL: "https://www.xiuxiu.work/",
  baseURL: "http://127.0.0.1:8000",
  timeout: 10000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

// 环境的切换
if (process.env.NODE_ENV == "development") {
  config.baseURL = "http://127.0.0.1:8000";
  // config.baseURL = "https://www.xiuxiu.work/";
} else if (process.env.NODE_ENV == "debug") {
  config.baseURL = "";
} else if (process.env.NODE_ENV == "production") {
  config.baseURL = "https://www.xiuxiu.work/";
}

// 创建Axios对象
const Axios = axios.create(config);
Axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// 请求拦截
Axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // Toast.loading({
    //   duration: 0,
    //   message: "加载中...",
    //   forbidClick: true,
    // });
    // if (config.method == "post") {
    //   config.headers = Object.assign(config.headers, {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   });
    // }
    if (config.url == "api/myuser/getcode/") {
      config.timeout = 59 * 1000;
    }
    if (store.state.user.token !== "") {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = "Bearer " + store.state.user.token;
      // console.log(config.headers.Authorization);
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
Axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    Toast.clear();
    return response;
  },
  (error) => {
    // Do something with response error
    Toast.clear();
    /***** 接收到异常响应的处理开始 *****/

    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          if (error.response.data.length != 0) {
            if (error.response.data["auth_err"] != undefined) {
              Dialog.alert({
                title: "认证失败",
                message: error.response.data.auth_err,
                onClose: () => {
                  router.replace({
                    path: "/login",
                    query: { redirect: router.currentRoute.fullPath },
                  });
                },
              });
            } else {
              Toast({
                message: "错误请求!",
                duration: 1000,
                forbidClick: true,
              });
            }
          } else {
            error.message = "错误请求";
            Toast({
              message: "错误请求!",
              duration: 1000,
              forbidClick: true,
            });
          }

          break;
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          Dialog.alert({
            title: "认证失败",
            message: "未授权，请重新登录！",
            onClose: () => {
              router.replace({
                path: "/login",
                query: { redirect: router.currentRoute.fullPath },
              });
            },
          });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Toast({
            message: "登录过期，请重新登录",
            duration: 1000,
            forbidClick: true,
          });
          // 清除token
          store.commit("set_token", "logout");
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath,
              },
            });
          }, 1000);
          break;
        default:
          Dialog.alert({
            title: "提示",
            message: error.response.data.message,
          });
          break;
      }
    }
    console.log(error.response);
    console.log(error.message);
    return Promise.reject(error);
  }
);

export default function axiosApi(type, params, method) {
  return new Promise((resolve, reject) => {
    if (method == "post") {
      Axios({
        method: method,
        url: type,
        data: qs.stringify(params),
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (method == "get") {
      Axios({
        method: method,
        url: type,
        params: params,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (method == "delete") {
      // console.log(params);
      Axios({
        method: method,
        url: type + params.id,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    } else if (method == "patch") {
      let data = params;
      if (params.formData != undefined) {
        data = params.formData;
      }
      Axios({
        method: method,
        url: type + params.id + "/",
        data: data,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

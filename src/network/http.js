import axios from "axios";
import qs from "qs";
import { Dialog, Toast } from "vant";
import store from "../store";

// let getCookie = function (cookie) {
//   let reg = /csrftoken=([\w]+)[;]?/g;
//   return reg.exec(cookie)[1];
// };

let config = {
  // baseURL: "https://www.xiuxiu.work/",
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

// 创建Axios对象
const Axios = axios.create(config);

// 请求拦截
Axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    Toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
    });
    // if (config.method == "post") {
    //   config.headers = Object.assign(config.headers, {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   });
    // }
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
    console.log(error.response);
    Toast.clear();
    switch (error.response.status) {
      case 401:
        Dialog.alert({
          title: "认证失败",
          message: "请检查用户名密码或重新登录  ！",
        });
        break;
      default:
        Dialog.alert({
          title: "提示",
          message: "网络请求失败，反馈给客服",
        });
        break;
    }

    return Promise.reject(error);
  }
);

export default function axiosApi(type, params, method) {
  // let sign = process.env.VUE_APP_SIGN;
  // if (process.env.NODE_ENV === "production") {
  //   sign = localStorage.getItem("wx_sign");
  // } else {
  //   sign = "crm:user:sign:f0c8cbe468f6a34463d198268290903f";
  // }
  // var value = {
  //   sign: sign,
  // };
  // console.log(params);
  // var data = method == "post" ? qs.stringify(params) : params;
  return new Promise((resolve, reject) => {
    if (method == "post") {
      console.log(params);
      Axios({
        method: method,
        url: type,
        data: qs.stringify(params),
      })
        .then((res) => {
          switch (res.status) {
            case 200:
              res.data.state = 200;
              resolve(res.data);
              break;
            case 201:
              resolve(res.data);
              break;
            default:
              // 接口错误提示
              Toast.fail(res.statusText);
              break;
          }
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
          // console.log(res);
          switch (res.status) {
            case 200:
              resolve(res.data);
              break;
            default:
              // 接口错误提示
              Toast.fail(res.statusText);
              break;
          }
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
          switch (res.status) {
            case 204:
              resolve(res.status);
              break;
            default:
              // 接口错误提示
              Toast.fail(res.statusText);
              break;
          }
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
          console.log(res);
          switch (res.status) {
            case 200:
              resolve(res.data);
              break;
            default:
              // 接口错误提示
              Toast.fail(res.statusText);
              break;
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

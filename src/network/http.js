import axios from "axios";
import qs from "qs";
import { Dialog, Toast } from "vant";

// let getCookie = function (cookie) {
//   let reg = /csrftoken=([\w]+)[;]?/g;
//   return reg.exec(cookie)[1];
// };

let config = {
  baseURL: "http://192.168.198.129:8000/",
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
    Dialog.alert({
      title: "提示",
      message: "网络请求失败，反馈给客服",
    });
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
      Axios({
        method: method,
        url: type,
        data: qs.stringify(params),
      })
        .then((res) => {
          console.log(res);
          if (res.data.errcode == 0) {
            resolve(res.data);
          } else {
            // 接口错误提示
            Toast.fail(res.data.msg);
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
          switch (res.data.errcode) {
            case 0:
              resolve(res.data);
              break;

            default:
              // 接口错误提示
              Toast.fail(res.data.msg);
              break;
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

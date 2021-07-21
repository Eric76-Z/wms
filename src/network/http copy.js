import axios from "axios";
import qs from "qs";
import { Toast } from "vant";
import store from "../store";
import router from "../router";
import { USER_LOGOUT } from "@/store/mutation-types";

let config = {
  baseURL: "http://192.168.198.128:8000/",
  timeout: 5000, // Timeout
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

    if (store.state.user.token !== "") {
      config.headers.Authorization = store.state.user.token;
      console.log(config.headers.token);
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
    if (response.status == 200) {
      const data = response.data;
      // console.log(data);
      if (data.errcode == -1) {
        //登录过期 需求重新登录 情况vuex的token和localstorge的token
        store.commit(USER_LOGOUT);
        //调转到login界面
        router.replace({ path: "/login" });
      }
    }
    return response;
  },
  (error) => {
    // Do something with response error
    console.log(error.response.status);
    Toast.clear();
    // Dialog.alert({
    //   title: "提示",
    //   message: "网络请求失败，反馈给客服",
    // });
    switch (error.response.status) {
      case 401:
        if (
          error.response.data["detail"] ==
          "No active account found with the given credentials"
        ) {
          Toast.fail("用户名或密码错误！");
        } else {
          Toast.fail(error.message);
        }
        break;

      default:
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
      Axios({
        method: method,
        url: type,
        data: qs.stringify(params),
      })
        .then((res) => {
          // switch (res.data.errcode) {
          //   case 0:
          //     resolve(res.data);
          //     break;
          //   default:
          //     // 接口错误提示
          //     Toast.fail(res.data.msg);
          //     break;
          // }
          console.log(res);
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
          // switch (res.data.errcode) {
          //   case 0:
          //     resolve(res.data);
          //     break;
          //   default:
          //     // 接口错误提示
          //     Toast.fail(res.data.msg);
          //     break;
          // }
          console.log(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

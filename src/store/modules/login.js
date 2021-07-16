// import { getLogin } from "@i/user";
// import { getToken, setToken } from "@u/auth";

// const state = {
//   token: getToken(),
// };

// const mutations = {
//   SET_TOKEN: (state, token) => {
//     state.token = token;
//   },
// };

// const actions = {
//   /**
//    * 用户登录
//    * @param commit
//    * @param data
//    * @returns {Promise<unknown>}
//    */
//   getLogin({ commit }, data) {
//     const { username, password } = data;
//     return new Promise((resolve, reject) => {
//       getLogin({
//         phonenumber: username.trim(),
//         password: password,
//       })
//         .then((res) => {
//           const { status, data } = res;
//           if (status === "1") {
//             commit("SET_TOKEN", data.token);
//             setToken(data.token);
//             resolve(res);
//           } else {
//             reject(res);
//           }
//         })
//         .catch((res) => {
//           reject(res);
//         });
//     });
//   },
// };

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
// };

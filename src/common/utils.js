import * as math from "mathjs";
//防抖函数，防止重复调用
export function debounce(func, delay = 500) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// // 时间格式化
// export function formatDate(date, fmt) {
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(
//       RegExp.$1,
//       (date.getFullYear() + "").substr(4 - RegExp.$1.length)
//     );
//   }

//   let o = {
//     "M+": date.getMonth() + 1,
//     "d+": date.getDate(),
//     "h+": date.getHours(),
//     "m+": date.getMinutes(),
//     "s+": date.getSeconds(),
//   };

//   for (let k in o) {
//     if (new RegExp(`(${k})`).test(fmt)) {
//       let str = o[k] + "";
//       fmt = fmt.replace(
//         RegExp.$1,
//         RegExp.$1.length === 1 ? str : padLeftZero(str)
//       );
//     }
//   }

//   return fmt;
// }

export const formatDate = {
  format1: (dateData) => {
    let date = new Date(dateData);

    let y = date.getFullYear();

    let m = date.getMonth() + 1;

    m = m < 10 ? "0" + m : m;

    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let min = date.getMinutes();
    min = min < 10 ? "0" + min : min;
    const time = y + "-" + m + "-" + d + " " + h + ":" + min;
    // console.log(time);

    return time;
  },
  getMin: (dateData1, dateData2) => {
    let time1 = new Date(dateData1).getTime();
    let time2 = new Date(dateData2).getTime();
    let duration = (time2 - time1) / (60 * 1000);
    duration = duration < 10 && duration > 0 ? "0" + duration : duration;
    duration =
      duration < 0 && duration > -10 ? "-0" + math.abs(duration) : duration;
    return duration;
  },
};

// export const

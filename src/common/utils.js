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
  nowDateTime: () => {
    var myDate = new Date();
    myDate.getYear(); //获取当前年份(2位)
    myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    myDate.getMonth(); //获取当前月份(0-11,0代表1月)
    myDate.getDate(); //获取当前日(1-31)
    myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
    myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
    myDate.getHours(); //获取当前小时数(0-23)
    myDate.getMinutes(); //获取当前分钟数(0-59)
    myDate.getSeconds(); //获取当前秒数(0-59)
    myDate.getMilliseconds(); //获取当前毫秒数(0-999)
    myDate.toLocaleDateString(); //获取当前日期
    return myDate;
  },
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
  format2: (dateData) => {
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
    const time = y + "年" + m + "月" + d + "日" + " " + h + ":" + min;

    return time;
  },
  format3: (dateData) => {
    let date = new Date(dateData);

    let y = date.getFullYear();

    let m = date.getMonth() + 1;

    m = m < 10 ? "0" + m : m;

    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    const time = y + "年" + m + "月" + d + "日";

    return time;
  },
  deltaMin: (dateData1, dateData2) => {
    // console.log(dateData1.replace(/-/g, "/"));
    //安卓和ios系统对于日期的格式不懂，将****-**-**转化为****/**/**的格式
    let time1 = new Date(dateData1.replace(/-/g, "/")).getTime();
    let time2 = new Date(dateData2.replace(/-/g, "/")).getTime();

    let duration = (time2 - time1) / (60 * 1000);
    duration = duration < 10 && duration > 0 ? "0" + duration : duration;
    duration =
      duration < 0 && duration > -10 ? "-0" + math.abs(duration) : duration;
    return duration;
  },
  deltaDay: (dateData1, dateData2) => {
    let date1 = new Date(dateData1).getTime();
    let date2 = new Date(dateData2).getTime();
    let delta = (date2 - date1) / (60 * 60 * 24 * 1000);
    delta = delta < 10 && delta > 0 ? "0" + delta : delta;
    delta = delta < 0 && delta > -10 ? "-0" + math.abs(delta) : delta;
    // console.log(delta);
    return math.ceil(delta);
  },
};

// export const

/* * 
 用途：js中字符串超长作固定长度加省略号（...）处理
 参数说明：
    str:需要进行处理的字符串，可含汉字
    len:需要显示多少个汉字，两个英文字母相当于一个汉字。
 */
export const beautySub = (str, len) => {
  var reg = /[\u4e00-\u9fa5]/g, //专业匹配中文
    slice = str.substring(0, len),
    chineseCharNum = ~~(slice.match(reg) && slice.match(reg).length),
    realen = slice.length * 2 - chineseCharNum;
  return str.substr(0, realen) + (realen < str.length ? "..." : "");
};

/**
 * 判断arry1 是否包含 arry2
 */

export const innerArry = (arry1, arry2) => {
  for (const i of arry2) {
    console.log(i);

    if (arry1.indexOf(i) == -1) {
      return false;
    }
  }
  return true;
};

export const filters = {
  numFilter(value) {
    let realVal = "";
    if (!isNaN(value) && value !== "") {
      // 截取当前数据到小数点后两位
      realVal = parseFloat(value).toFixed(1);
    } else {
      realVal = "--";
    }
    return realVal;
  },
};

// export const partsSearchHistory = (val) => {
//   console.log(val);
// };

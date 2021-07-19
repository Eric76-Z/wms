import axiosApi from "./http";

//获取刀片相关数据
export function reqBladeData() {
  return axiosApi("mywork/getbladedata/", {}, "get");
}
//按query关键词返回工位信息
export function reqLocation(query) {
  return axiosApi("mywork/getlocation/", query, "get");
}
//提交刀片申请表单
export function postForm(query) {
  return axiosApi("mywork/postform/", query, "post");
}
//用户登录
export function postLogin(query) {
  return axiosApi("myuser/login/", query, "get");
}

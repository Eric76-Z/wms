import axiosApi from "./http";

//获取CPH工位信息
export function reqCphLocation(query) {
  return axiosApi("workstation/location/cph_location_tree/", query, "get");
}

//按query关键词返回工位信息
export function reqLocation(query) {
  return axiosApi("workstation/location/cph_location_tree/", query, "get");
}

//获取刀片相关数据
export function reqBladeData(params) {
  return axiosApi("mywork/getbladedata/", params, "get");
}

//获取刀片申请订单数据
export function reqBladeItemData(params) {
  return axiosApi("workstation/bladeitem/blade_item/", params, "get");
}

//提交刀片申请表单
export function applyBlade(query) {
  return axiosApi("workstation/applyblade/", query, "post");
}
//用户登陆
export function userLogin(query) {
  return axiosApi("myuser/login/", query, "get");
}

//用户退出登陆
export function userLogout(query) {
  return axiosApi("myuser/logout/", query, "post");
}

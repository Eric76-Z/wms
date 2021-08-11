import axiosApi from "./http";

//获取刀片订单信息数据
export function reqBladeItemData(params) {
  return axiosApi("workstation/bladeitem/", params, "get");
}

//创建刀片订单信息数据
export function createBladeItemData(params) {
  return axiosApi("workstation/bladeitem/", params, "post");
}

//更新刀片订单  /workstation/bladeitem/{id}/
export function partupBladeItemData(params) {
  return axiosApi("workstation/bladeitem/", params, "patch");
}

//删除刀片订单  /workstation/bladeitem/{id}/
export function deleteBladeItemData(params) {
  return axiosApi("workstation/bladeitem/", params, "delete");
}

//获取CPH工位信息
export function reqCphLocation(query) {
  return axiosApi("workstation/location/cph_location_tree/", query, "get");
}

//[{'value': '1060', 'area': 'CPH2.1-UB-LTVR'}, {'value': '1080', 'area': 'CPH2.1-UB-LTVR'}......]
export function reqLocationByTarget(query) {
  return axiosApi("workstation/location/back_by_target/", query, "get");
}

//获取焊枪信息
export function reqWeldingGun(query) {
  return axiosApi("/workstation/weldinggun/", query, "get");
}
/*
=======================故障申报模块相关接口=======================
*/
//申报故障
export function createMaintenanceRecords(params) {
  return axiosApi("workstation/maintenance/", params, "post");
}

//获取故障信息
export function listMaintenanceRecords(params) {
  return axiosApi("workstation/maintenance/", params, "get");
}

//获取单个故障信息
export function readMaintenanceRecords(params) {
  return axiosApi("workstation/maintenance/" + params.id + "/", params, "get");
}

//删除故障
export function deleteMaintenanceRecords(params) {
  return axiosApi("workstation/maintenance/", params, "delete");
}

//更新故障信息
export function partupMaintenanceRecords(params) {
  return axiosApi("workstation/maintenance/", params, "patch");
}

//获取备件信息
export function listParts(params) {
  return axiosApi("workstation/parts/", params, "get");
}

// //获取刀片申请订单数据
// export function reqBladeItemData(params) {
//   return axiosApi("workstation/bladeitem/blade_item/", params, "get");
// }

// //提交刀片申请表单
// export function applyBlade(query) {
//   return axiosApi("workstation/applyblade/", query, "post");
// }

// //获取刀片相关数据
// export function reqBladeData(params) {
//   return axiosApi("workstation/maintenance/", params, "get");
// }
//用户登陆
export function userLogin(query) {
  return axiosApi("myuser/login/", query, "post");
}

//用户注册
export function userRegister(query) {
  return axiosApi("myuser/register/", query, "post");
}

//用户退出登陆
export function userLogout(query) {
  return axiosApi("myuser/logout/", query, "post");
}

import axiosApi from "./http";

// const URL_PREFIX = "fontend";
// const URL_MODULE_WORKSTATION = "workstation";
// const URL_MODULE_USER = "user";

//获取刀片订单信息数据
export function reqBladeItemData(params) {
  return axiosApi("api/workstation/bladeitem/", params, "get");
}

//创建刀片订单信息数据
export function createBladeItemData(params) {
  return axiosApi("api/workstation/bladeitem/", params, "post");
}

//更新刀片订单  /workstation/bladeitem/{id}/
export function partupBladeItemData(params) {
  return axiosApi("api/workstation/bladeitem/", params, "patch");
}

//删除刀片订单  /workstation/bladeitem/{id}/
export function deleteBladeItemData(params) {
  return axiosApi("api/workstation/bladeitem/", params, "delete");
}

//获取CPH工位信息
export function reqCphLocation(query) {
  return axiosApi("api/workstation/location/cph_location_tree/", query, "get");
}

//[{'value': '1060', 'area': 'CPH2.1-UB-LTVR'}, {'value': '1080', 'area': 'CPH2.1-UB-LTVR'}......]
export function reqLocationByTarget(query) {
  return axiosApi("api/workstation/location/back_by_target/", query, "get");
}

//获取焊枪信息
export function reqWeldingGun(query) {
  return axiosApi("api//workstation/weldinggun/", query, "get");
}
/*
=======================故障申报模块相关接口=======================
*/
//申报故障
export function createMaintenanceRecords(params) {
  return axiosApi("api/workstation/maintenance/", params, "post");
}

//获取故障信息
export function listMaintenanceRecords(params) {
  return axiosApi("api/workstation/maintenance/", params, "get");
}

//获取单个故障信息
export function readMaintenanceRecords(params) {
  return axiosApi(
    "api/workstation/maintenance/" + params.id + "/",
    params,
    "get"
  );
}

//删除故障
export function deleteMaintenanceRecords(params) {
  return axiosApi("api/workstation/maintenance/", params, "delete");
}

//更新故障信息
export function partupMaintenanceRecords(params) {
  return axiosApi("api/workstation/maintenance/", params, "patch");
}

/*
=======================备件模块相关接口=======================
*/
//获取备件信息
export function listParts(params) {
  return axiosApi("api/workstation/parts/", params, "get");
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
  return axiosApi("api/myuser/login/", query, "post");
}

//用户注册
export function userRegister(query) {
  return axiosApi("api/myuser/register/", query, "post");
}

//用户退出登陆
export function userLogout(query) {
  return axiosApi("api/myuser/logout/", query, "post");
}

//用户信息更新
export function partupUser(query) {
  return axiosApi("api/myuser/user/", query, "patch");
}

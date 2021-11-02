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

//获取刀片数据分析信息
export function reqBladeAnalyseData(params) {
  return axiosApi("api/workstation/bladeitem/analyse_data/", params, "get");
}

/*
=======================工位模块相关接口=======================
*/
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
=======================EMS故障申报模块相关接口=======================
*/
//申报故障
export function createEmsMaintenanceRecords(params) {
  return axiosApi("api/workstation/emsmaintenance/", params, "post");
}
//获取故障信息
export function listEmsMaintenanceRecords(params) {
  return axiosApi("api/workstation/emsmaintenance/", params, "get");
}

/*
=======================备件模块相关接口=======================
*/
//获取备件信息
export function listParts(params) {
  return axiosApi("api/workstation/parts/", params, "get");
}
//更新备件信息
export function partupParts(params) {
  return axiosApi("api/workstation/parts/", params, "patch");
}
/*
=======================用户模块相关接口=======================
*/
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

//获取验证码
export function getCode(query) {
  return axiosApi("api/myuser/getcode/", query, "get");
}
//用户重置密码
export function resetPwd(query) {
  return axiosApi("api/myuser/resetpwd/", query, "post");
}

//=======================设备类型相关接口=======================
export function listDevicesType(query) {
  return axiosApi("api/workstation/devicestype/", query, "get");
}

export function partupDevicesType(query) {
  return axiosApi("api/workstation/devicestype/", query, "patch");
}
//=======================管理模块相关接口=======================
export function listSort(query) {
  return axiosApi("api/workstation/sort/", query, "get");
}

export function createSort(query) {
  return axiosApi("api/workstation/sort/", query, "post");
}

export function partupSort(query) {
  return axiosApi("api/workstation/sort/", query, "patch");
}

export function deleteSort(query) {
  return axiosApi("api/workstation/sort/", query, "delete");
}

export function listSortDevice(query) {
  return axiosApi("api/workstation/sort/listsort_device/", query, "get");
}

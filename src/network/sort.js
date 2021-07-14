import axiosApi from "./http";

export function reqBladeData() {
  return axiosApi("mywork/getbladedata", {}, "get");
}

export function reqLocation(query) {
  return axiosApi("mywork/getlocation", query, "get");
}

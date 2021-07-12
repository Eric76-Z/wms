import axiosApi from "./http";

export function getBladeData() {
  return axiosApi("mywork/getbladedata", {}, "get");
}

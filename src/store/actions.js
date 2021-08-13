import { ADD_TO_LOCATION } from "./mutation-types";
import { reqLocationByTarget } from "@/network/sort.js";

export default {
  getLocation(context, payload) {
    switch (payload.target) {
      case "local":
        reqLocationByTarget(payload)
          .then((res) => {
            const data = {
              target: "local",
              local: res,
            };
            context.commit(ADD_TO_LOCATION, data);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "robot":
        reqLocationByTarget(payload)
          .then((res) => {
            console.log(res);
            const data = {
              target: "robot",
              robot: res,
            };
            context.commit(ADD_TO_LOCATION, data);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "weldinggun":
        reqLocationByTarget(payload)
          .then((res) => {
            console.log(res);
            const data = {
              target: "weldinggun",
              weldinggun: res,
            };
            context.commit(ADD_TO_LOCATION, data);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
        console.log("不能识别target");
        break;
    }
  },
};

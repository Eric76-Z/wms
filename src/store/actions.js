import { ADD_TO_LOCATION } from "./mutation-types";
import { reqWeldingGun } from "@/network/sort.js";
export default {
  getLocation(context, payload) {
    switch (payload.target) {
      case "local":
        break;
      case "robot":
        break;
      case "weldinggun":
        reqWeldingGun(payload)
          .then((res) => {
            console.log(res);
            const data = {
              weldinggun: [],
            };
            res.forEach((element) => {
              const area =
                element["location"]["location_level_1"] +
                "-" +
                element["location"]["location_level_2"] +
                "-" +
                element["location"]["location_level_3"];
              data.weldinggun.push({
                value: element["weldinggun_num"],
                area: area,
              });
            });
            data.target = "weldinggun";
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

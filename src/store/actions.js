import { ADD_TO_LOCATION } from "./mutation-types";
import { reqWeldingGun } from "@/network/sort.js";
export default {
  getLocation(context, payload) {
    reqWeldingGun(payload)
      .then((res) => {
        console.log(res);
        const location = [];
        res.forEach((element) => {
          const area =
            element["location"]["location_level_1"] +
            "-" +
            element["location"]["location_level_2"] +
            "-" +
            element["location"]["location_level_3"];
          location.push({
            value: element["weldinggun_num"],
            area: area,
          });
        });
        // console.log(location);
        context.commit(ADD_TO_LOCATION, location);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

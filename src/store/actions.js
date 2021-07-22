import { ADD_TO_LOCATION } from "./mutation-types";
import { reqLocation } from "@/network/sort.js";
export default {
  getLocation(context, payload) {
    reqLocation(payload)
      .then((res) => {
        const location = [];
        res.rows.forEach((element) => {
          const area =
            element["location_level_1"] +
            "-" +
            element["location_level_2"] +
            "-" +
            element["location_level_3"];
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

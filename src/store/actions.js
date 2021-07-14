import { ADD_TO_BLADEDATA, ADD_TO_LOCATION } from "./mutation-types";
import { reqBladeData, reqLocation } from "@/network/sort.js";
export default {
  getBladedata(context) {
    reqBladeData()
      .then((res) => {
        // context.state.listcfg.content = res.callback;
        context.commit(ADD_TO_BLADEDATA, res.callback);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getLocation(context, payload) {
    console.log(payload);
    reqLocation(payload)
      .then((res) => {
        const location = [];
        res.rows.forEach((element) => {
          location.push({ value: element["weldinggun_num"] });
        });
        console.log(location);

        context.commit(ADD_TO_LOCATION, location);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

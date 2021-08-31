export default {
  weldinggunNum(state) {
    console.log(state.location);
    return state.location;
  },

  bladeDataCol(state) {
    const ret = {
      titleCol: [], //["鸿柏02G刀片", "鲁兹02G刀具", "鲁兹02G刀片", "邺格02G刀片", ......
      titleToId: {}, //key-鲁兹02G刀片， value-1922  映射列表
    };
    for (let i of state.blade.bladeinfo.results) {
      let mySpec = i["my_spec"].split("|")[0];
      let id = i["id"];
      ret.titleCol.push(mySpec);
      ret.titleToId[mySpec] = id;
    }
    console.log(ret);
    return ret;
  },
};

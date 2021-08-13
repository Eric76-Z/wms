export default {
  weldinggunNum(state) {
    console.log(state.location);
    return state.location;
  },
  //["鸿柏02G刀片", "鲁兹02G刀具", "鲁兹02G刀片", "邺格02G刀片", ......
  bladeinfoCol(state) {
    let col = [];
    for (let i of state.blade.bladeinfo) {
      col.push(i["my_spec"].split("|")[0]);
    }
    return col;
  },
};

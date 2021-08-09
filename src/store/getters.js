export default {
  weldinggunNum(state) {
    console.log(state.location);
    return state.location;
  },
  bladeinfolist(state) {
    for (const iterator of state.blade.bladeinfo) {
      console.log(iterator);
    }
    return state.blade.bladeinfo;
  },
};

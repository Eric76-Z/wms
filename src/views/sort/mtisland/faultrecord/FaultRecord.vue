<template>
  <div id="faultrecord">
    <router-view></router-view>
  </div>
</template>

<script>
import { toRef } from "vue";
import { useStore } from "vuex";
export default {
  name: "faultrecord",
  data() {
    return {};
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "故障申报向导",
      isShow: [true, true, true],
    };

    return {
      navbarcfg,
    };
  },
};
</script>

<style lang="scss"></style>

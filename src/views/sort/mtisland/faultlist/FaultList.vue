<template>
  <div id="faultlist">
    <main-nav-bar :navbarcfg="navbarcfg" />

    <router-view />
  </div>
</template>

<script>
import { ref } from "vue";
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";

export default {
  name: "faultlist",
  data() {
    return {};
  },
  components: {
    MainNavBar,
  },
  setup() {
    const navbarcfg = {
      title: "历史故障",
      isShow: [true, true, true],
    };
    const value = ref("");
    // const isShow = reactive("false");
    const foucs = () => {};

    return {
      navbarcfg,
      value,
      foucs,
    };
  },
};
</script>

<style lang="scss"></style>

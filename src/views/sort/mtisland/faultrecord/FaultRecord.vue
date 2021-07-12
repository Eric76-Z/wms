<template>
  <div id="bladeapply">
    <main-nav-bar :navbarcfg="navbarcfg" />

    <router-view></router-view>
  </div>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";

export default {
  name: "BladeApply",
  data() {
    return {};
  },
  components: {
    MainNavBar,
  },
  setup() {
    const navbarcfg = {
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

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
    return {
      navbarcfg: {
        title: "表单-刀片申请",
        isShow: [true, true, true],
      },
    };
  },
  components: {
    MainNavBar,
  },
};
</script>

<style lang="scss"></style>

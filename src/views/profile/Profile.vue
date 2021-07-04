<template>
  <div>
    <main-nav-bar :navbarcfg="navbarcfg" />
    <h2>Profile</h2>
  </div>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
export default {
  name: "Profile",
  data() {
    return {
      navbarcfg: {
        title: "myproject-用户",
        isShow: [false, true, false],
      },
    };
  },
  components: {
    MainNavBar,
  },
};
</script>

<style lang="scss">
// .van-nav-bar {
//   background-color: $navbar-color;
// }
</style>

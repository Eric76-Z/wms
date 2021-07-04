<template>
  <div>
    <main-nav-bar :navbarcfg="navbarcfg" />

    <main-grid></main-grid>
  </div>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
import MainGrid from "@/components/content/maingrid/MainGrid";

export default {
  name: "Sort",
  data() {
    return {
      navbarcfg: {
        title: "myproject-分类",
        isShow: [false, true, false],
      },
    };
  },
  components: {
    MainNavBar,
    MainGrid,
  },
};
</script>

<style lang="scss">
// .van-nav-bar {
//   background-color: $navbar-color;
// }
</style>

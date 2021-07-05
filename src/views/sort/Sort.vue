<template>
  <div>
    <main-nav-bar :navbarcfg="navbarcfg" />
    <main-grid :gridcfg="gridcfg" />
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
      gridcfg: {
        iconText: {
          机器人: ["jiqiren", "/"],
          焊枪: ["hanzhuang", "/"],
          其他设备: ["shebei", "/"],
          申报列表: ["shenqing", "/sort/list"],
          列表明细: ["liebiao", "/"],
          备件查询: ["kucunguanli", "/"],
          资料查询: ["ziliao", "/"],
          故障代码: ["faultcode", "/"],
          空白: ["kongbai", "/"],
        },
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

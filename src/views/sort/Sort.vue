<template>
  <div id="sort">
    <router-view />
    <main-nav-bar :navbarcfg="navbarcfg" />
    <main-grid :gridcfg="gridcfg" />
  </div>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
import MainGrid from "@/components/content/maingrid/MainGrid";
import { reactive } from "vue";

export default {
  name: "Sort",
  data() {
    return {};
  },
  components: {
    MainNavBar,
    MainGrid,
  },
  setup() {
    const navbarcfg = reactive({
      title: "myproject-分类",
      isShow: [false, true, false],
    });
    const gridcfg = reactive({
      iconText: {
        机器人: ["jiqiren", "/"],
        焊枪: ["hanzhuang", "/"],
        其他设备: ["shebei", "/"],
        申报列表: ["shenqing", "/sort/list"],
        列表明细: ["liebiao", "/sort/detail"],
        备件查询: ["kucunguanli", "/"],
        资料查询: ["ziliao", "/"],
        故障代码: ["faultcode", "/"],
        空白: ["kongbai", "/"],
      },
    });
    return {
      navbarcfg,
      gridcfg,
    };
  },
};
</script>

<style lang="scss">
// .van-nav-bar {
//   background-color: $navbar-color;
// }
</style>

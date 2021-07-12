<template>
  <div id="mtisland">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <main-grid :gridcfg="gridcfg" />
  </div>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
import MainGrid from "@/components/content/maingrid/MainGrid";
import { reactive } from "vue";

export default {
  name: "MtIsland",
  data() {
    return {};
  },
  components: {
    MainNavBar,
    MainGrid,
  },
  setup() {
    const navbarcfg = reactive({
      title: "分类-维修岛",
      isShow: [true, true, true],
    });
    const gridcfg = reactive({
      iconText: {
        故障申报: ["jiqiren", "/sort/mtisland/faultrecord"],
        故障记录: ["hanzhuang", "/"],
        故障代码: ["shebei", "/"],
        维修经验: ["shenqing", "/sort/list"],
        项目问题: ["liebiao", "/sort/detail"],
        备件查询: ["kucunguanli", "/"],
        资料查询: ["ziliao", "/"],
        故障代码1: ["faultcode", "/"],
        维修专家: ["weixiuqiye", "/sort/mtisland"],
      },
      columnNum: 4,
    });
    return {
      navbarcfg,
      gridcfg,
    };
  },
};
</script>

<style lang="scss">
#app {
  height: 100vh;
}
</style>

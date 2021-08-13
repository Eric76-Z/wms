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
      iconText: [
        ["故障申报", "jiqiren", "/sort/mtisland/faultrecord"],
        ["故障记录", "hanzhuang", "/sort/mtisland/faultlist"],
        ["交接白板-未完成", "shebei", "/sort/mtisland"],
        ["维修经验-未完成", "shenqing", "/sort/mtisland"],
        ["项目问题-未完成", "liebiao", "/sort/mtisland"],
      ],
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

<template>
  <div id="mtisland">
    <main-grid :gridcfg="gridcfg" />
  </div>
</template>

<script>
import MainGrid from "@/components/content/maingrid/MainGrid";
import { reactive, toRef } from "vue";
import { useStore } from "vuex";

export default {
  name: "MtIsland",
  components: {
    MainGrid,
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "分类-维修岛",
      isShow: [true, true, true],
    };

    const gridcfg = reactive({
      iconText: [
        ["故障申报", "jiqiren", "/sort/mtisland/faultrecord"],
        ["故障记录", "hanzhuang", "/sort/mtisland/faultlist"],
        ["交接白板-未开放", "shebei", "/sort/mtisland"],
        ["维修经验-未开放", "shenqing", "/sort/mtisland"],
        ["项目问题-未开放", "liebiao", "/sort/mtisland"],
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

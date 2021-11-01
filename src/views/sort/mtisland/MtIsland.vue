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
      grid: [
        {
          text: "故障申报",
          iconText: "jiqiren",
          route: "/sort/mtisland/faultrecord",
          tag: {
            text: "",
            textColor: "",
            color: "",
            show: "",
          },
        },
        {
          text: "故障记录",
          iconText: "hanzhuang",
          route: "/sort/mtisland/faultlist",
          tag: {
            text: "",
            textColor: "",
            color: "",
            show: "",
          },
        },
        {
          text: "交接白板",
          iconText: "shebei",
          route: "",
          tag: {
            text: "未开发",
            textColor: "",
            color: "var(--van-gray-6)",
            show: "true",
          },
        },
        {
          text: "维修经验",
          iconText: "shenqing",
          route: "",
          tag: {
            text: "未开发",
            textColor: "",
            color: "var(--van-gray-6)",
            show: "true",
          },
        },
        {
          text: "项目问题",
          iconText: "liebiao",
          route: "",
          tag: {
            text: "未开发",
            textColor: "",
            color: "var(--van-gray-6)",
            show: "true",
          },
        },
        {
          text: "EMS故障记录",
          iconText: "liebiao",
          route: "",
          tag: {
            text: "",
            textColor: "",
            color: "",
            show: "",
          },
        },
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

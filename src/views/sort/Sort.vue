<template>
  <div id="sort">
    <router-view />
    <main-grid :gridcfg="gridcfg" />
  </div>
</template>

<script>
import MainGrid from "@/components/content/maingrid/MainGrid";
import { reactive, toRef } from "vue";
import { useStore } from "vuex";

export default {
  name: "Sort",
  components: {
    MainGrid,
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "分类",
      isShow: [false, true, false],
    };
    const gridcfg = reactive({
      iconText: [
        ["机器人-未开放", "jiqiren", "/sort"],
        ["焊枪-未开放", "hanzhuang", "/sort"],
        ["其他设备-未开放", "shebei", "/sort"],
        ["申报列表", "shenqing", "/sort/list"],
        ["列表明细", "liebiao", "/sort/detail"],
        ["备件查询-未开放", "kucunguanli", "/sort/parts"],
        ["资料查询-未开放", "ziliao", "/sort"],
        ["故障代码-未开放", "faultcode", "/sort"],
        ["维修专家", "weixiuqiye", "/sort/mtisland"],
      ],
      columnNum: 3,
    });
    return {
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

<template>
  <div id="faultcode">
    <div class="title">查一查</div>
    <van-search v-model="value" disabled placeholder="搜索" />
    <!-- <main-side-bar :sidebarcfg="sidebarcfg" v-show="false" /> -->
    <main-grid :gridcfg="gridcfg" />
  </div>
</template>

<script>
import { toRef, reactive } from "vue";
import { useStore } from "vuex";
import MainGrid from "@/components/content/maingrid/MainGrid";

export default {
  name: "FaultCode",
  components: {
    MainGrid,
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "分类-故障代码",
      isShow: [true, true, true],
    };
    const gridcfg = reactive({
      grid: [
        {
          text: "机器人",
          textcolor: "color:var(--van-primary-color)",
          route: "/sort",
        },
        {
          text: "焊枪",
          textcolor: "color:var(--van-primary-color)",
          route: "",
        },
        {
          text: "其他设备",
          textcolor: "color:var(--van-primary-color)",
          route: "",
        },
        {
          text: "申报列表",
          textcolor: "color:var(--van-primary-color)",
          route: "/sort/list",
        },
        {
          text: "列表明细",
          textcolor: "color:var(--van-primary-color)",
          route: "/sort/detail",
        },
        {
          text: "备件查询",
          textcolor: "color:var(--van-primary-color)",
          route: "/sort/parts",
        },
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
$navbar-height: 44px;
$tabbar-height: 50px;
$sidebar-width: 80px;
#faultcode {
  .title {
    font-size: 20px;
  }
  .van-sidebar {
    float: left;
  }
  .list-card {
    float: left;
    width: 100%;
    height: calc(100vh - #{$navbar-height + $tabbar-height});
    overflow: auto;
  }
}
</style>

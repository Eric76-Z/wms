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
      grid: [
        {
          text: "机器人",
          iconText: "jiqiren",
          route: "/sort",
          tag: {
            text: "未开发",
            textColor: "",
            color: "var(--van-gray-6)",
            show: "true",
          },
        },
        {
          text: "焊枪",
          iconText: "hanzhuang",
          route: "",
          tag: {
            text: "未开发",
            textColor: "",
            color: "var(--van-gray-6)",
            show: "true",
          },
        },
        {
          text: "其他设备",
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
          text: "申报列表",
          iconText: "shenqing",
          route: "/sort/list",
          tag: {
            text: "未开发",
            textColor: "",
            color: "",
            show: "",
          },
        },
        {
          text: "列表明细",
          iconText: "liebiao",
          route: "/sort/detail",
          tag: {
            text: "未开发",
            textColor: "",
            color: "",
            show: "",
          },
        },
        {
          text: "备件查询",
          iconText: "kucunguanli",
          route: "/sort/parts",
          tag: {
            text: "新",
            textColor: "",
            color: "var(--van-green)  ",
            show: "true",
          },
        },
        {
          text: "资料查询",
          iconText: "ziliao",
          route: "",
          tag: {
            text: "未开发",
            textColor: "",
            color: "var(--van-gray-6)",
            show: "true",
          },
        },
        {
          text: "故障代码",
          iconText: "faultcode",
          route: "/sort/faultcode",
          tag: {
            text: "新",
            textColor: "",
            color: "var(--van-green)  ",
            show: "true",
          },
        },
        {
          text: "维修专家",
          iconText: "weixiuqiye",
          route: "/sort/mtisland",
          tag: {
            text: "未开发",
            textColor: "",
            color: "",
            show: "",
          },
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
// .van-nav-bar {
//   background-color: $navbar-color;
// }
</style>

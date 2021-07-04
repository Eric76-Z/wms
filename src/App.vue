<template>
  <div>
    <router-view />
    <main-tab-bar :tabbars="tabbars" />
  </div>
</template>

<script>
import MainTabBar from "@/components/content/maintabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
  data() {
    return {
      tabbars: [
        {
          name: "home",
          title: "首页",
          icon: "home-o",
          path: "/home",
        },
        {
          name: "sort",
          title: "分类",
          icon: "apps-o",
          path: "/sort",
        },
        {
          name: "profile",
          title: "我的",
          icon: "friends-o",
          path: "/profile",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import url(~@/assets/css/base.css);
body {
  // background-color: $theme-color;
  height: 100%;
}
</style>

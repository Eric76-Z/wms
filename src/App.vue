<template>
  <main-nav-bar :navbarcfg="mainnavbarcfg" />
  <!-- vue3.0配置 -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" />
  </router-view>
  <main-tab-bar :tabbars="tabbars" />
</template>

<script>
import { reactive, toRef } from "vue";
import { useStore } from "vuex";
import MainTabBar from "@/components/content/maintabbar/MainTabBar";
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
export default {
  name: "App",
  components: {
    MainTabBar,
    MainNavBar,
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    const mainnavbarcfg = reactive(navbarcfg.value.mainnavbarcfg);
    const tabbars = [
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
    ];
    return {
      mainnavbarcfg,
      tabbars,
    };
  },
};

window.onload = function () {
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
};
</script>

<style lang="scss" scoped>
@import url(~@/assets/css/base.css);
body {
  // background-color: $theme-color;
  height: 100%;
}
</style>

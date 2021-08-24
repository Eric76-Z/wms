<template>
  <main-nav-bar :navbarcfg="navbarcfg" />
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
import { computed, getCurrentInstance, onMounted } from "vue";
import MainTabBar from "@/components/content/maintabbar/MainTabBar";
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
export default {
  name: "App",
  components: {
    MainTabBar,
    MainNavBar,
  },
  setup() {
    const {
      appContext: {
        config: { globalProperties },
      },
    } = getCurrentInstance();
    globalProperties.$mainnavbar = {
      title: " ",
      isShow: [false, false, false],
    };
    const navbarcfg = computed(() => {
      return globalProperties.$mainnavbar;
    });
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
    onMounted(() => {});
    return {
      navbarcfg,
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

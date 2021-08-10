<template>
  <div id="faultlist">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
export default {
  name: "faultlist",
  components: {
    MainNavBar,
  },
  setup() {
    const navbarcfg = {
      title: "故障记录明细",
      isShow: [true, true, true],
    };
    return {
      navbarcfg,
    };
  },
};
</script>

<style lang="scss">
#faultlist {
  position: relative;
  --van-tabs-card-height: 20px;
}
</style>

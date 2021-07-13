<template>
  <div id="faultlist">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-search
      v-model="value"
      @focus="focus"
      :show-action="isShow"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
    />

    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from "vue";
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";

export default {
  name: "faultlist",
  data() {
    return {};
  },
  components: {
    MainNavBar,
  },
  setup() {
    const navbarcfg = {
      title: "历史故障",
      isShow: [true, true, true],
    };
    const value = ref("");
    // const isShow = reactive("false");
    const foucs = () => {
      console.log("wwwww");
    };

    return {
      navbarcfg,
      value,
      foucs,
    };
  },
};
</script>

<style lang="scss"></style>

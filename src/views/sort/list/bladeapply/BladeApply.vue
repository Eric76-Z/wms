<template>
  <div id="bladeapply">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <keep-alive include="bladeapply1, bladeapply2">
      <router-view :listcfg="listcfg" />
    </keep-alive>
  </div>
</template>

<script>
// import { reactive } from "vue";
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
import { getBladeData } from "@/network/sort.js";

export default {
  name: "BladeApply",
  data() {
    return {};
  },
  components: {
    MainNavBar,
  },
  setup() {
    const navbarcfg = {
      title: "表单-刀片申请",
      isShow: [true, true, true],
    };
    const listcfg = {};
    getBladeData()
      .then((res) => {
        listcfg.content = res.callback;
      })
      .catch((err) => {
        console.log(err);
      });

    return {
      navbarcfg,
      listcfg,
    };
  },
};
</script>

<style lang="scss"></style>

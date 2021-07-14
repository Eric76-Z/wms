<template>
  <div id="bladeapply">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <keep-alive include="bladeapply1, bladeapply2">
      <router-view :listcfg="listcfg" />
    </keep-alive>
  </div>
</template>

<script>
import { reactive, toRef } from "vue";
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
// import { getBladeData } from "@/network/sort.js";
import { useStore } from "vuex";

export default {
  name: "BladeApply",
  data() {
    return {};
  },
  components: {
    MainNavBar,
  },
  setup() {
    const store = useStore();
    const navbarcfg = {
      title: "表单-刀片申请",
      isShow: [true, true, true],
    };

    const bladedata = toRef(store.state, "bladedata");

    // console.log(bladedata);
    const {
      getBladedata: [getBladedata],
    } = store._actions;

    const listcfg = reactive({});

    return {
      navbarcfg,
      listcfg,
      bladedata,
      getBladedata,
    };
  },
  beforeCreate() {
    //判断store中有没有数据
    if (this.bladedata !== undefined) {
      //有数据
      this.listcfg.content = this.bladedata;
    } else {
      //没有请求数据
      console.log("重新加载数据");
      this.getBladedata();
      this.listcfg.content = this.bladedata;
    }
    // console.log(this.listcfg.content);
  },
};
</script>

<style lang="scss"></style>

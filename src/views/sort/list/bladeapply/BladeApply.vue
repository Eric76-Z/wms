<template>
  <div id="bladeapply">
    <main-nav-bar :navbarcfg="navbarcfg" />

    <router-view v-slot="{ Component }" :listcfg="listcfg">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- <keep-alive include="bladeapply1, bladeapply2">
      <router-view :listcfg="listcfg" />
    </keep-alive> -->
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

    const listcfg = reactive({ content: bladedata });
    return {
      navbarcfg,
      listcfg,
      bladedata,
      getBladedata,
    };
  },
  beforeCreate() {
    //判断store中有没有数据
    // console.log(this.bladedata);
    // console.log(this.bladedata.checked);
    // console.log(this.bladedata.checked !== undefined);
    if (this.bladedata.checked !== undefined) {
      //有数据
      console.log(this.bladedata);
      // this.listcfg.content = this.bladedata;
    } else {
      //没有请求数据
      console.log("重新加载bladedata");
      this.getBladedata();
    }
  },
};
</script>

<style lang="scss"></style>

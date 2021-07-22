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
    const bladeinfo = toRef(store.state.blade, "bladeinfo");
    console.log(bladeinfo);
    const {
      "blade/getBladedata": [getBladedata],
    } = store._actions;

    const navbarcfg = {
      title: "表单-刀片申请",
      isShow: [true, true, true],
    };
    const listcfg = reactive({ content: bladeinfo });
    console.log(listcfg);
    return {
      navbarcfg,
      listcfg,
      bladeinfo,
      getBladedata,
    };
  },
  beforeCreate() {
    //判断store中有没有数据
    if (this.bladeinfo.checked !== undefined) {
      //有数据
      console.log(this.bladeinfo);
    } else {
      //没有请求数据
      console.log("重新加载bladeinfo");
      const params = {
        target: "getbladeinfo",
      };
      this.getBladedata(params);
    }
  },
};
</script>

<style lang="scss"></style>

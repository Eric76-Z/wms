<template>
  <div id="bladeapply">
    <main-nav-bar :navbarcfg="navbarcfg" />

    <router-view v-slot="{ Component }" :bladeinfo="bladeinfo">
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
import { toRef } from "vue";
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
    const {
      "blade/getBladeInfo": [getBladeInfo],
    } = store._actions;

    const navbarcfg = {
      title: "表单-刀片申请",
      isShow: [true, true, true],
    };

    //判断store中有没有数据
    if (bladeinfo.value.length == 0) {
      //没有数据请求数据
      console.log("重新加载bladeinfo");
      const params = {
        tag: 1,
      };
      getBladeInfo(params);
    }

    return {
      navbarcfg,
      bladeinfo,
      getBladeInfo,
    };
  },
};
</script>

<style lang="scss"></style>

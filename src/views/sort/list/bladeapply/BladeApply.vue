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
import { computed, toRefs } from "vue";
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
    const bladeinfo = computed(() => {
      return store.state.blade.bladeinfo;
    });
    const {
      "blade/getBladeInfo": [getBladeInfo],
    } = store._actions;

    //mapGetters
    const { bladeinfolist, weldinggunNum } = toRefs(store.getters);
    console.log(bladeinfo.value);
    console.log(bladeinfolist);
    console.log(weldinggunNum);

    const navbarcfg = {
      title: "表单-刀片申请",
      isShow: [true, true, true],
    };

    //判断store中有没有数据
    console.log(bladeinfo);
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

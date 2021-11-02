<template>
  <div id="faultlist">
    <!-- vue3.0配置 -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>
  </div>
</template>

<script>
import { toRef } from "vue";
import { useStore } from "vuex";
export default {
  name: "faultlist",
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
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

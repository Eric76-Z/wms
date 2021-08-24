<template>
  <van-nav-bar @click-left="onClickLeft">
    <template #left>
      <van-icon
        v-show="navbarcfg.mainnavbarcfg.isShow[0]"
        name="arrow-left"
        size="18"
      />
      <label v-show="navbarcfg.mainnavbarcfg.isShow[0]">返回</label>
    </template>
    <template #title>
      <div v-show="navbarcfg.mainnavbarcfg.isShow[1]">
        {{ navbarcfg.mainnavbarcfg.title }}
      </div>
    </template>
    <template #right>
      <van-icon
        v-show="navbarcfg.mainnavbarcfg.isShow[2]"
        name="apps-o"
        size="20"
      />
    </template>
  </van-nav-bar>
</template>

<script>
import { toRef } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";

export default {
  name: "MainNavBar",
  data() {
    return {};
  },
  computed: {},
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    const router = useRouter();
    console.log(navbarcfg.value.mainnavbarcfg.isShow[0]);
    // const route = useRoute();
    // console.log(route);
    // console.log(router);
    const onClickLeft = () => {
      router.back();
    };
    const onClickRight = () => Toast("按钮");
    return {
      navbarcfg,
      onClickLeft,
      onClickRight,
    };
  },
};
</script>

<style lang="scss">
.van-nav-bar {
  --van-nav-bar-height: 44px;
  --van-nav-bar-background-color: #10b47d;
  --van-nav-bar-icon-color: var(--van-white);
  --van-nav-bar-text-color: var(--van-white);
  --van-nav-bar-title-text-color: var(--van-white);
  .van-nav-bar__left {
    color: var(--van-nav-bar-text-color);
  }
}
</style>

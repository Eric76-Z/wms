<template>
  <van-nav-bar @click-left="onClickLeft">
    <template #left>
      <van-icon v-show="navbarcfg.isShow[0]" name="arrow-left" size="18" />
      <label v-show="navbarcfg.isShow[0]">返回</label>
    </template>
    <template #title>
      <div v-show="navbarcfg.isShow[1]">
        {{ navbarcfg.title }}
      </div>
    </template>
    <template #right>
      <van-icon v-show="navbarcfg.isShow[2]" name="apps-o" size="20" />
    </template>
  </van-nav-bar>
  <div>{{ navbarcfg }}</div>
</template>

<script>
import { useRouter } from "vue-router";
import { Toast } from "vant";

export default {
  name: "MainNavBar",
  data() {
    return {};
  },
  computed: {},
  props: {
    navbarcfg: {
      type: Object,
    },
  },
  setup() {
    const router = useRouter();
    // const route = useRoute();
    // console.log(route);
    // console.log(router);
    const onClickLeft = () => {
      router.back();
    };
    const onClickRight = () => Toast("按钮");
    return {
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

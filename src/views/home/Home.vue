<template>
  <div id="home">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-notice-bar
      wrapable
      :scrollable="false"
      text="21/05/31:申请列表中填不了姓名，请在首页点击用户界面，在里面完成姓名填写。此后填写表单自动填充姓名。"
    />
    <main-swiper :swipercfg="swipercfg" />
  </div>
</template>

<script>
import { reactive } from "vue";

import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
import MainSwiper from "@/components/content/mainswiper/MainSwiper";

import { NoticeBar } from "vant";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    MainNavBar,
    MainSwiper,
    [NoticeBar.name]: NoticeBar,
  },
  setup() {
    const navbarcfg = reactive({
      title: "myproject-首页",
      isShow: [false, true, false],
    });
    const swipercfg = reactive({
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ],
    });
    return {
      navbarcfg,
      swipercfg,
    };
  },
};
</script>

<style lang="scss"></style>

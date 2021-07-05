<template>
  <div>
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-notice-bar
      wrapable
      :scrollable="false"
      text="21/05/31:申请列表中填不了姓名，请在首页点击用户界面，在里面完成姓名填写。此后填写表单自动填充姓名。"
    />
  </div>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";

import { NoticeBar } from "vant";
export default {
  name: "Home",
  data() {
    return {
      navbarcfg: {
        title: "myproject-首页",
        isShow: [false, true, false],
      },
    };
  },
  components: {
    MainNavBar,
    [NoticeBar.name]: NoticeBar,
  },
};
</script>

<style lang="scss">
// .van-nav-bar {
//   background-color: $navbar-color;
// }
</style>

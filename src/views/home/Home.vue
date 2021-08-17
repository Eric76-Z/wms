<template>
  <div id="home">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-notice-bar
      wrapable
      :scrollable="false"
      text="21/08/17: 版本更迭快速，遇到问题可以试试清除浏览器数据，重新加载！。"
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
      title: "首页",
      isShow: [false, true, false],
    });
    const swipercfg = reactive({
      images: [
        "https://www.kuka.com/-/media/kuka-corporate/images/products/robots/kuka-industrieroboter-2020.jpg?rev=e171cda184c04682ac4afa44958bd6b7&w=767&hash=536DC432A7A64179E6A6A734D61B0728",
        "https://www.kuka.com/-/media/kuka-corporate/images/products/robots/kr-delta/kr-delta_kv.jpg?rev=-1&w=767&hash=484B82F1CE4C775E6B692F901FEB2BC2",
        "http://nimak.cn/static/kindeditor/attached/image/20180827/20180827161937_78354.jpg",
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

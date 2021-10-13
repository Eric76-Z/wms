<template>
  <div id="home">
    <van-notice-bar
      left-icon="volume-o"
      text="21/10/13: 登陆后：我的-app下载中下载app使用，体验更佳。"
    />
    <van-notice-bar
      color="#1989fa"
      left-icon="volume-o"
      scrollable="false"
      text="21/09/03: 重置密码功能已完善，忘记密码请重置密码！。"
    />
    <main-swiper :swipercfg="swipercfg" />
    <main-grid :gridcfg="gridcfg" />
  </div>
</template>

<script>
import { reactive, toRef } from "vue";
import { useStore } from "vuex";
import MainSwiper from "@/components/content/mainswiper/MainSwiper";
import MainGrid from "@/components/content/maingrid/MainGrid";
import { NoticeBar } from "vant";

export default {
  name: "Home",
  components: {
    MainSwiper,
    MainGrid,
    [NoticeBar.name]: NoticeBar,
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "首页",
      isShow: [false, true, false],
    };
    const swipercfg = reactive({
      images: [
        "https://www.kuka.com/-/media/kuka-corporate/images/products/robots/kuka-industrieroboter-2020.jpg?rev=e171cda184c04682ac4afa44958bd6b7&w=767&hash=536DC432A7A64179E6A6A734D61B0728",
        "https://www.kuka.com/-/media/kuka-corporate/images/products/robots/kr-delta/kr-delta_kv.jpg?rev=-1&w=767&hash=484B82F1CE4C775E6B692F901FEB2BC2",
        "http://nimak.cn/static/kindeditor/attached/image/20180827/20180827161937_78354.jpg",
      ],
    });
    const gridcfg = reactive({
      grid: [
        {
          text: "刀片申请",
          iconText: "jiqiren",
          route: "/sort/list/bladeapply",
          tag: {
            text: "",
            textColor: "",
            color: "var(--van-gray-6)",
            show: "true",
          },
        },
        {
          text: "刀片登记详情",
          iconText: "jiqiren",
          route: "/sort/detail/bladedetail",
          tag: {
            text: "",
            textColor: "",
            color: "var(--van-gray-6)",
            show: "true",
          },
        },
      ],
      columnNum: 4,
    });
    return {
      swipercfg,
      gridcfg,
    };
  },
};
</script>

<style lang="scss"></style>

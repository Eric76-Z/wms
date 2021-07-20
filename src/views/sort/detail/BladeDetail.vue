<template>
  <div id="bladedetail">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-search
      v-model="value"
      ref="search"
      :show-action="isShow"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
    />
    <middle-bar></middle-bar>
  </div>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
import MiddleBar from "@/components/content/maintabbar/MiddleBar";

export default {
  name: "BladeDetail",
  data() {
    return {
      navbarcfg: {
        title: "刀片申请明细",
        isShow: [true, true, true],
      },

      listcfg: {
        content: {
          bladeapply: {
            title: "刀片登记详情",
            label: "刀片申请了不知道什么状态，请点击这里......",
          },
          weldingguncls: {
            title: "枪衣状态详情",
            label: "枪衣申报了不知道什么情况，请点击这里",
          },
          tcpmanage: {
            title: "tcp照片查看",
            label: "支持查看现场tcp照片......",
          },
          maintenanceexp: {
            title: "维修记录查看",
            label: "现场维修故障记录，维修经验记录这些都是在这里查看的......",
          },
        },
      },
    };
  },
  components: {
    MainNavBar,
    MiddleBar,
  },
};
</script>

<style lang="scss">
.van-search {
  padding-bottom: 5px;
}
</style>

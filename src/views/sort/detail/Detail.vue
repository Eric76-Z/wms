<template>
  <main-nav-bar :navbarcfg="navbarcfg" />

  <main-side-bar :sidebarcfg="sidebarcfg" v-show="false" />
  <div class="list-card">
    <side-bar-card :listcfg="listcfg" />
  </div>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
import MainSideBar from "@/components/content/mainsidebar/MainSideBar";
import SideBarCard from "@/components/content/mainsidebar/SideBarCard";

export default {
  name: "Detail",
  data() {
    return {
      navbarcfg: {
        title: "分类-列表明细",
        isShow: [true, true, true],
      },
      sidebarcfg: {
        titles: ["备件申领", "设备问题", "现场问题"],
      },
      listcfg: {
        bladeapply: {
          title: "刀片登记详情",
          desc: "刀片申请了不知道什么状态，请点击这里......",
        },
        weldingguncls: {
          title: "枪衣状态详情",
          desc: "枪衣申报了不知道什么情况，请点击这里",
        },
        tcpmanage: {
          title: "tcp照片查看",
          desc: "支持查看现场tcp照片......",
        },
        maintenanceexp: {
          title: "维修记录查看",
          desc: "现场维修故障记录，维修经验记录这些都是在这里查看的......",
        },
      },
    };
  },
  components: {
    MainNavBar,
    MainSideBar,
    SideBarCard,
  },
};
</script>

<style lang="scss">
$navbar-height: 44px;
$tabbar-height: 50px;
$sidebar-width: 80px;
#app {
  height: 100vh;

  .van-sidebar {
    float: left;
  }
  .list-card {
    float: left;
    width: 100%;
    // width: calc(100% - #{$sidebar-width});
    height: calc(100vh - #{$navbar-height + $tabbar-height});
    overflow: auto;
    .van-card {
      .van-card__content {
        min-height: 10px;
        .van-card__title {
          font-size: 18px;
          line-height: 18px;
          font-weight: 1000px;
        }
      }
    }
  }
}
</style>

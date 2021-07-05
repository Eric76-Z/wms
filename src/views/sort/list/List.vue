<template>
  <div>
    <main-nav-bar :navbarcfg="navbarcfg" />
    <div class="list-sidebar">
      <main-side-bar :sidebarcfg="sidebarcfg" />
      <div class="list-card">
        <side-bar-card :listcfg="listcfg" />
      </div>
    </div>
  </div>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
import MainSideBar from "@/components/content/mainsidebar/MainSideBar";
import SideBarCard from "@/components/content/mainsidebar/SideBarCard";

export default {
  name: "List",
  data() {
    return {
      navbarcfg: {
        title: "分类-列表明细",
        isShow: [true, true, true],
      },
      sidebarcfg: {
        titles: ["备件申领", "设备问题", "现场问题"],
      },
      listcfg: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 22, 33, 44],
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
.list-sidebar {
  display: flex;
  .van-sidebar {
    flex: 5;
  }
  .list-card {
    flex: 14;
  }
}
</style>

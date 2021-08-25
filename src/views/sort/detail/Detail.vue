<template>
  <div id="detail">
    <main-side-bar :sidebarcfg="sidebarcfg" v-show="false" />
    <div class="list-card">
      <main-list :listcfg="listcfg">
        <slot>
          <van-cell-group v-for="(item, index) in listcfg.content" :key="index">
            <van-cell
              :title="item.title"
              value="开始"
              :label="item.label"
              is-link
              :to="item.to"
            />
          </van-cell-group>
        </slot>
      </main-list>
    </div>
  </div>
</template>

<script>
import { toRef } from "vue";
import { useStore } from "vuex";
import MainSideBar from "@/components/content/mainsidebar/MainSideBar";
import MainList from "@/components/content/mainlist/MainList";

export default {
  name: "Detail",
  components: {
    MainSideBar,
    MainList,
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "分类-列表明细",
      isShow: [true, true, true],
    };
    const sidebarcfg = {
      titles: ["备件申领", "设备问题", "现场问题"],
    };
    const listcfg = {
      content: {
        bladedetail: {
          title: "刀片登记详情",
          label: "刀片申请了不知道什么状态，请点击这里......",
          to: "/sort/detail/bladedetail",
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
    };
    return {
      sidebarcfg,
      listcfg,
    };
  },
};
</script>

<style lang="scss">
#detail {
  .van-sidebar {
    float: left;
  }
  .list-card {
    float: left;
    width: 100%;
    // width: calc(100% - #{$sidebar-width});
    height: calc(100vh - #{$navbar-height + $tabbar-height});
    overflow: auto;
  }
}
</style>

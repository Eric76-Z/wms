<template>
  <div id="list">
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
  name: "List",
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
        bladeapply: {
          title: "刀片申请",
          label: "填写表单申请领用刀片请点击这里......",
          to: "/sort/list/bladeapply",
          // url: "www.xiuxiu.work/mywork/bladeapply",
        },
        weldingguncls: {
          title: "枪衣损坏申报",
          label: "现场枪衣损坏，需要申报请点击这里......",
        },
        tcpmanage: {
          title: "tcp照片上传",
          label: "现场上传tcp照片请点击这里......",
        },
        maintenanceexp: {
          title: "维修记录",
          label: "现场维修故障记录，维修经验记录请点击这里......",
        },
      },
    };
    return {
      sidebarcfg,
      listcfg,
    };
  },
  data() {
    return {};
  },
  components: {
    MainSideBar,
    MainList,
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
  }
}
</style>

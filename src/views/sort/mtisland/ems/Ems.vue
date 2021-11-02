<template>
  <div id="ems">
    <div class="list-card">
      <main-list :listcfg="listcfg">
        <slot>
          <van-card
            v-for="(item, index) in listcfg.content"
            :key="index"
            :tag="item.tag"
            :title="item.title"
            :price="item.price"
            :desc="item.desc"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
          >
            <template #footer>
              <van-button type="success" size="mini" :to="item.to" round
                >开始申报</van-button
              >
            </template>
          </van-card>
        </slot>
      </main-list>
    </div>
  </div>
</template>

<script>
import { toRef } from "vue";
import { useStore } from "vuex";
import MainList from "@/components/content/mainlist/MainList";
// import { getBladeData } from "@/network/sort.js";
export default {
  name: "Ems",
  data() {
    return {};
  },
  components: {
    MainList,
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "维修岛-EMS",
      isShow: [true, true, true],
    };
    const listcfg = {
      content: {
        type1: {
          title: "EMS小车故障记录",
          desc: "此向导主要针对EMS小车故障记录......",
          to: {
            name: "emsfaultrecord",
            params: { type: 1 },
          },
        },
        type2: {
          title: "EMS小车故障详情",
          desc: "此向导主要针对EMS小车故障详情查看......",
          to: {
            name: "emsfaultlist",
            params: { type: 2 },
          },
        },
      },
    };
    return { navbarcfg, listcfg };
  },
};
</script>

<style lang="scss">
.list-card {
  width: 100%;
  height: calc(100vh - #{$navbar-height + $tabbar-height});
  overflow: auto;
  .van-card {
    .van-card__content {
      min-height: 10px;
      .van-card__title {
        font-size: 16px;
        line-height: 18px;
        font-weight: 1000px;
      }
    }
  }
}
</style>

<template>
  <div id="faultrecord1">
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
import MainList from "@/components/content/mainlist/MainList";
// import { getBladeData } from "@/network/sort.js";
export default {
  name: "FaultRecord1",
  data() {
    return {};
  },
  components: {
    MainList,
  },
  setup() {
    const listcfg = {
      content: {
        type1: {
          title: "设备类故障",
          desc: "此向导主要针对设备类故障，如机器人，焊枪等发生故障......",
          to: {
            name: "faultrecord2",
            params: { type: 1 },
          },
        },
        type2: {
          title: "高频故障",
          desc: "此向导主要针对高频故障，如滞后误差，传感器误感应......",
        },
        type3: {
          title: "截图导入",
          desc: "待开放......",
        },
      },
    };
    return { listcfg };
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

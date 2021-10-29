<template>
  <div id="mainfilter">
    <div class="filter-content">
      <div class="filter-location">
        <van-cell-group inset>
          <van-cell title="区域过滤" value="内容" class="cell-title" />
          <van-cell
            title="一级地点"
            value="展开"
            :is-link="true"
            :arrow-direction="mainfiltercfg.arrowDirection[0]"
            @click="filterLv1"
          />
          <location-filter-card
            :lfcardcfg="lfcardlv1cfg"
          ></location-filter-card>
          <van-cell
            title="二级地点"
            value="展开"
            is-link
            :arrow-direction="mainfiltercfg.arrowDirection[1]"
            @click="filterLv2"
          />
          <location-filter-card
            :lfcardcfg="lfcardlv2cfg"
          ></location-filter-card>
          <van-cell
            title="三级地点"
            value="展开"
            is-link
            :arrow-direction="mainfiltercfg.arrowDirection[2]"
            @click="filterLv3"
          />
          <location-filter-card
            :lfcardcfg="lfcardlv3cfg"
          ></location-filter-card>
        </van-cell-group>
      </div>
      <div class="filter-status">
        <van-cell title="订单状态过滤" class="cell-title" />
        <van-checkbox-group
          v-model="checkboxcfg.checked"
          direction="horizontal"
        >
          <van-checkbox name="1">待审核</van-checkbox>
          <van-checkbox name="2">审核失败</van-checkbox>
          <van-checkbox name="3">待领取</van-checkbox>
          <van-checkbox name="4">待善后</van-checkbox>
        </van-checkbox-group>
      </div>
    </div>
    <div class="filter-operate">
      <van-button square class="reset" type="warning" @click="reset"
        >重置
      </van-button>
      <van-button square class="confirm" type="success" @click="confirm"
        >确认
      </van-button>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useToggle } from "@vant/use";
import LocationFilterCard from "@/components/common/maincard/LocationFilterCard";
import { reqCphLocation } from "@/network/sort";
export default {
  name: "MainFilter",
  components: {
    LocationFilterCard,
  },
  setup(props, context) {
    const locationData = reactive([]);

    reqCphLocation({}).then((res) => {
      // console.log(res);
      const data = res;
      for (let index = 0; index < data.length; index++) {
        locationData.push([
          data[index]["localLv1"],
          data[index]["localLv2"],
          data[index]["localLv3"],
        ]);
      }
      reShow();
    });

    const queryData = reactive({
      localLv1: [],
      localLv2: [],
      localLv3: [],
      orderStatus: 0,
    });
    const toshowData = reactive({
      localLv2: [],
      localLv3: [],
    });
    // 获取已选中的区域信息
    const getSelected = () => {
      queryData.localLv1 = [];
      queryData.localLv2 = [];
      queryData.localLv3 = [];
      for (let index = 0; index < lfcardlv1cfg.selected.length; index++) {
        if (
          lfcardlv1cfg.selected[index] === true &&
          queryData.localLv1.indexOf(lfcardlv1cfg.data[index]) == -1
        ) {
          queryData.localLv1.push(lfcardlv1cfg.data[index]);
        }
      }
      for (let index = 0; index < lfcardlv2cfg.selected.length; index++) {
        if (
          lfcardlv2cfg.selected[index] === true &&
          queryData.localLv2.indexOf(lfcardlv2cfg.data[index]) == -1
        ) {
          queryData.localLv2.push(lfcardlv2cfg.data[index]);
        }
      }
      for (let index = 0; index < lfcardlv3cfg.selected.length; index++) {
        if (
          lfcardlv3cfg.selected[index] === true &&
          queryData.localLv3.indexOf(lfcardlv3cfg.data[index]) == -1
        ) {
          queryData.localLv3.push(lfcardlv3cfg.data[index]);
        }
      }
    };

    // 根据queryData中已选中的区域信息，重组区域筛选模块
    const reShow = () => {
      toshowData.localLv2.length = 0;
      toshowData.localLv3.length = 0;
      // console.log(queryData);
      if (queryData.localLv2.length == 0) {
        if (queryData.localLv1.length == 0) {
          // console.log(locationData);
          for (let item of locationData) {
            if (toshowData.localLv2.indexOf(item[1]) == -1) {
              toshowData.localLv2.push(item[1]);
            }
            if (toshowData.localLv3.indexOf(item[2]) == -1) {
              toshowData.localLv3.push(item[2]);
            }
          }
        } else {
          for (let item of locationData) {
            if (toshowData.localLv2.indexOf(item[1]) == -1) {
              toshowData.localLv2.push(item[1]);
            }
            if (
              toshowData.localLv3.indexOf(item[2]) == -1 &&
              queryData.localLv1.indexOf(item[0]) != -1
            ) {
              toshowData.localLv3.push(item[2]);
            }
          }
        }
      } else {
        if (queryData.localLv1.length == 0) {
          for (let item of locationData) {
            if (toshowData.localLv2.indexOf(item[1]) == -1) {
              toshowData.localLv2.push(item[1]);
            }
            if (
              toshowData.localLv3.indexOf(item[2]) == -1 &&
              queryData.localLv2.indexOf(item[1]) != -1
            ) {
              toshowData.localLv3.push(item[2]);
            }
          }
        } else {
          for (let item of locationData) {
            if (toshowData.localLv2.indexOf(item[1]) == -1) {
              toshowData.localLv2.push(item[1]);
            }
            if (
              toshowData.localLv3.indexOf(item[2]) == -1 &&
              queryData.localLv1.indexOf(item[0]) != -1 &&
              queryData.localLv2.indexOf(item[1]) != -1
            ) {
              // console.log(item);
              toshowData.localLv3.push(item[2]);
            }
          }
        }
      }
    };

    const mainfiltercfg = reactive({
      arrowDirection: ["", "", ""],
    });
    const lfcardlv1cfg = reactive({
      data: ["CPH2.1", "CPH2.2"],
      selected: [],
      isShow: computed(() => {
        return !state1.value;
      }),
      clickBtn: (index) => {
        if (lfcardlv1cfg.selected[index] === undefined) {
          lfcardlv1cfg.selected[index] = true;
        } else {
          lfcardlv1cfg.selected[index] = !lfcardlv1cfg.selected[index];
        }
        getSelected();
        reShow();
      },
    });
    const lfcardlv2cfg = reactive({
      data: toshowData.localLv2,
      selected: [],
      isShow: computed(() => {
        return !state2.value;
      }),
      clickBtn: (index) => {
        if (lfcardlv2cfg.selected[index] === undefined) {
          lfcardlv2cfg.selected[index] = true;
        } else {
          lfcardlv2cfg.selected[index] = !lfcardlv2cfg.selected[index];
        }
        getSelected();
        reShow();
      },
    });
    const lfcardlv3cfg = reactive({
      data: toshowData.localLv3,
      selected: [],
      isShow: computed(() => {
        return !state3.value;
      }),
      clickBtn: (index) => {
        if (lfcardlv3cfg.selected[index] === undefined) {
          lfcardlv3cfg.selected[index] = true;
        } else {
          lfcardlv3cfg.selected[index] = !lfcardlv3cfg.selected[index];
        }
        getSelected();
        reShow();
      },
    });
    //展开后箭头方向转换
    const [state1, toggle1] = useToggle(true);
    const filterLv1 = () => {
      toggle1();
      state1.value
        ? (mainfiltercfg.arrowDirection[0] = "")
        : (mainfiltercfg.arrowDirection[0] = "down");
    };
    const [state2, toggle2] = useToggle(true);
    const filterLv2 = () => {
      toggle2();
      state2.value
        ? (mainfiltercfg.arrowDirection[1] = "")
        : (mainfiltercfg.arrowDirection[1] = "down");
    };
    const [state3, toggle3] = useToggle(true);
    const filterLv3 = () => {
      toggle3();
      state3.value
        ? (mainfiltercfg.arrowDirection[2] = "")
        : (mainfiltercfg.arrowDirection[2] = "down");
    };

    const checkboxcfg = reactive({
      checked: [],
    });

    //重置确认
    const reset = () => {
      lfcardlv1cfg.selected = [];
      lfcardlv2cfg.selected = [];
      lfcardlv3cfg.selected = [];
      getSelected();
      reShow();
    };
    //按键确认
    const confirm = () => {
      getSelected();
      context.emit("queryData", queryData);
    };
    //向父组件传递选中状态
    return {
      filterLv1,
      filterLv2,
      filterLv3,
      lfcardlv1cfg,
      lfcardlv2cfg,
      lfcardlv3cfg,
      mainfiltercfg,
      reset,
      confirm,
      checkboxcfg,
    };
  },
};
</script>

<style lang="scss" scoped>
#mainfilter {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #{$bgcolor-gray-2};
  .filter-content {
    height: calc(100% - 45px);
    .filter-location {
      .van-cell-group {
        margin: 0;
        padding: 8px 0 16px 0;
        .cell-title {
          padding: 0 16px 3px 16px;
          font-size: 15px;
          font-weight: 1200;
          color: #000;
        }
      }
    }
    .filter-status {
      margin-top: 15px;
      width: 100%;
      background-color: var(--van-cell-group-background-color);
      padding-bottom: 16px;
      .van-checkbox-group {
        margin-top: 8px;
        padding-left: 8px;
        .van-checkbox {
          flex: 0 0 calc(50% - 15px);
          &:nth-child(-n + 2) {
            margin-bottom: 5px;
          }
        }
      }
    }
  }
  .filter-operate {
    position: absolute;
    display: flex;
    height: 45px;
    width: 100%;
    bottom: 0;
    text-align: center;
    .reset {
      flex: 1;
    }
    .confirm {
      flex: 1;
    }
  }
}
</style>

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
    </div>
    <div class="filter-operate">
      <van-button square class="reset" type="warning" @click="reset"
        >重置</van-button
      >
      <van-button square class="confirm" type="success" @click="confirm"
        >确认</van-button
      >
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
  // props: {
  //   mainfiltercfg: {
  //     type: Object,
  //   },
  // },
  components: {
    LocationFilterCard,
  },
  setup(props, context) {
    const locationData = reactive([]);
    const Lv2 = reactive([]);
    const Lv3 = reactive([]);
    // const LocationDataShow = reactive([]);

    reqCphLocation({}).then((res) => {
      console.log(res);
      const data = res;
      for (let index = 0; index < data.length; index++) {
        locationData.push([
          data[index]["location_level_1"],
          data[index]["location_level_2"],
          data[index]["location_level_3"],
        ]);
      }
      reShow();
    });
    const queryData = {
      location: {
        Lv1: [],
        Lv2: [],
        Lv3: [],
      },
    };

    const getSelected = () => {
      queryData.location.Lv1 = [];
      queryData.location.Lv2 = [];
      queryData.location.Lv3 = [];
      for (let index = 0; index < lfcardlv1cfg.selected.length; index++) {
        if (
          lfcardlv1cfg.selected[index] === true &&
          queryData.location.Lv1.indexOf(lfcardlv1cfg.data[index]) == -1
        ) {
          queryData.location.Lv1.push(lfcardlv1cfg.data[index]);
        }
      }
      for (let index = 0; index < lfcardlv2cfg.selected.length; index++) {
        if (
          lfcardlv2cfg.selected[index] === true &&
          queryData.location.Lv2.indexOf(lfcardlv2cfg.data[index]) == -1
        ) {
          queryData.location.Lv2.push(lfcardlv2cfg.data[index]);
        }
      }
      for (let index = 0; index < lfcardlv3cfg.selected.length; index++) {
        if (
          lfcardlv3cfg.selected[index] === true &&
          queryData.location.Lv3.indexOf(lfcardlv3cfg.data[index]) == -1
        ) {
          queryData.location.Lv3.push(lfcardlv3cfg.data[index]);
        }
      }
      context.emit("queryData", queryData);
    };

    const reShow = () => {
      const data = queryData.location;
      Lv2.length = 0;
      Lv3.length = 0;
      // console.log(data);
      if (data["Lv2"].length == 0) {
        if (data["Lv1"].length == 0) {
          console.log(locationData);
          for (let item of locationData) {
            if (Lv2.indexOf(item[1]) == -1) {
              Lv2.push(item[1]);
            }
            if (Lv3.indexOf(item[2]) == -1) {
              Lv3.push(item[2]);
            }
          }
        } else {
          for (let item of locationData) {
            if (Lv2.indexOf(item[1]) == -1) {
              Lv2.push(item[1]);
            }
            if (
              Lv3.indexOf(item[2]) == -1 &&
              data["Lv1"].indexOf(item[0]) != -1
            ) {
              Lv3.push(item[2]);
            }
          }
        }
      } else {
        if (data["Lv1"].length == 0) {
          for (let item of locationData) {
            if (Lv2.indexOf(item[1]) == -1) {
              Lv2.push(item[1]);
            }
            if (
              Lv3.indexOf(item[2]) == -1 &&
              data["Lv2"].indexOf(item[1]) != -1
            ) {
              Lv3.push(item[2]);
            }
          }
        } else {
          for (let item of locationData) {
            if (Lv2.indexOf(item[1]) == -1) {
              Lv2.push(item[1]);
            }
            if (
              Lv3.indexOf(item[2]) == -1 &&
              data["Lv1"].indexOf(item[0]) != -1 &&
              data["Lv2"].indexOf(item[1]) != -1
            ) {
              // console.log(item);
              Lv3.push(item[2]);
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
      data: Lv2,
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
      data: Lv3,
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
      console.log(queryData);
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

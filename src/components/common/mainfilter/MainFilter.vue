<template>
  <div id="mainfilter">
    <div class="filter-content">
      <div class="filter-location">
        <van-cell-group inset>
          <van-cell title="选择区域" value="内容" />
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
            arrow-direction
            @click="filterLv2"
          />
          <location-filter-card
            :lfcardcfg="lfcardlv2cfg"
          ></location-filter-card>
          <van-cell
            title="三级地点"
            value="展开"
            is-link
            arrow-direction
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
import { reqLocation } from "@/network/sort";
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
  setup() {
    reqLocation({
      target: "weldinggun",
    });
    const mainfiltercfg = reactive({
      arrowDirection: ["", "", ""],
    });
    const queryData = {
      location: {
        Lv1: [],
        Lv2: [],
        Lv3: [],
      },
    };

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
      },
    });
    const lfcardlv2cfg = reactive({
      data: ["CPH2.1", "CPH2.2"],
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
      },
    });
    const lfcardlv3cfg = reactive({
      data: ["CPH2.1", "CPH2.2"],
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
        ? (mainfiltercfg.arrowDirection[0] = "")
        : (mainfiltercfg.arrowDirection[0] = "down");
    };
    const [state3, toggle3] = useToggle(true);
    const filterLv3 = () => {
      toggle3();
      state3.value
        ? (mainfiltercfg.arrowDirection[0] = "")
        : (mainfiltercfg.arrowDirection[0] = "down");
    };

    //重置确认
    const reset = () => {
      lfcardlv1cfg.selected = [];
      lfcardlv2cfg.selected = [];
      lfcardlv3cfg.selected = [];
      console.log();
    };
    const confirm = () => {
      for (let index = 0; index < lfcardlv1cfg.selected.length; index++) {
        lfcardlv1cfg.selected[index] === true
          ? (queryData.location.Lv1[index] = lfcardlv1cfg.data[index])
          : queryData.location.Lv1[index];
      }
      for (let index = 0; index < lfcardlv2cfg.selected.length; index++) {
        lfcardlv1cfg.selected[index] === true
          ? (queryData.location.Lv1[index] = lfcardlv1cfg.data[index])
          : queryData.location.Lv1[index];
      }
      for (let index = 0; index < lfcardlv3cfg.selected.length; index++) {
        lfcardlv1cfg.selected[index] === true
          ? (queryData.location.Lv1[index] = lfcardlv1cfg.data[index])
          : queryData.location.Lv1[index];
      }
      console.log(queryData);
    };
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

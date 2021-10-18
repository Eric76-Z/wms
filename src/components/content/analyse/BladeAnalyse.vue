<template>
  <div id="bladeanalyse" v-show="true">
    <van-index-bar :index-list="indexbarcfg.indexList" ref="scroll1">
      <div class="index-title"></div>
      <van-index-anchor index="工">工位领用Top</van-index-anchor>
      <div id="topReceive"></div>
      <van-index-anchor index="寿">寿命分析</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-index-anchor index="性">性价比分析</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-index-anchor index="库">库存量</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
    </van-index-bar>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { reqBladeAnalyseData } from "@/network/sort.js";
export default {
  name: "BladeAnalyse",

  setup() {
    const indexbarcfg = reactive({
      indexList: ["工", "寿", "性", "库"],
      // indexList: ["工位领用Top", "寿命分析", "性价比分析", "库存量"],
    });
    const analyseData = reactive({
      top_ten_workstations: [],
      top_ten_workstations_num: [],
    });
    reqBladeAnalyseData().then((res) => {
      analyseData.top_ten_workstations = res.top_ten_workstations;
      analyseData.top_ten_workstations_num = res.top_ten_workstations_num;
    });
    onMounted(() => {
      // 基于准备好的dom，初始化echarts实例
      var echarts = require("echarts");
      const topReceiveChart = echarts.init(
        document.getElementById("topReceive")
      );
      let option1 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          show: true,
        },
        toolbox: {
          show: true,
          showTitle: false, // 隐藏默认文字，否则两者位置会重叠
          feature: {
            restore: {},
            saveAsImage: {
              show: true,
              title: "Save As Image",
            },
          },
        },
        legend: {
          data: ["总", "2021", "2020"],
          selected: {
            2021: false,
            2020: false,
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0],
          name: "次数",
        },
        yAxis: {
          type: "category",
          data: analyseData.top_ten_workstations,
          name: "工位",
        },
        series: [
          {
            name: "总",
            type: "bar",
            data: analyseData.top_ten_workstations_num,
          },
          {
            name: "2021",
            type: "bar",
            data: [25, 42, 52, 10, 2, 52, 24, 47, 75, 58],
          },
          {
            name: "2020",
            type: "bar",
            data: [25, 42, 52, 10, 2, 52, 24, 47, 75, 58],
          },
        ],
      };
      // 绘制图表
      option1 && topReceiveChart.setOption(option1, true);
      setTimeout(() => {
        console.log(analyseData);
      }, 1000);
    });

    return {
      indexbarcfg,
    };
  },
};
</script>

<style lang="scss">
#bladeanalyse {
  width: 100%;

  .van-index-bar {
    height: calc(100vh - #{$navbar-height + $tabbar-height} - 28px);
    overflow: auto;
    overflow-x: hidden;
    .index-title {
      height: 1px;
      width: 100%;
      background-color: var(--van-cell-background-color);
      text-align: center;
      font-size: 18px;
    }
    .van-index-bar__sidebar {
      right: 830px;
      .van-index-bar__index {
        padding-bottom: 8px;
        opacity: 0.6;
      }
    }
    .van-index-anchor--sticky {
      top: -72px;
      left: 414px;
      transform: translate3d(0px, 72px, 0px);
    }
    #topReceive {
      width: 100%;
      height: 70%;
      min-height: 500px;
      background-color: var(--van-cell-background-color);
    }
  }
}
</style>

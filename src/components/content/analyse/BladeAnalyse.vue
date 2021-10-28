<template>
  <div id="bladeanalyse" v-show="true">
    <van-index-bar :index-list="indexbarcfg.indexList" ref="scroll1">
      <div class="index-title"></div>
      <van-index-anchor index="工">工位领用Top</van-index-anchor>
      <div id="topReceive"></div>
      <van-index-anchor index="寿">寿命分析</van-index-anchor>
      <div id="serviceLife"></div>
      <van-index-anchor index="性">性价比分析</van-index-anchor>
      <table id="table">
        <thead>
          <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>11</td>
            <td>22</td>
            <td>33</td>
            <td>44</td>
          </tr>
        </tbody>
      </table>
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
import { reactive } from "vue";
import { reqBladeAnalyseData } from "@/network/sort.js";
export default {
  name: "BladeAnalyse",

  setup() {
    const indexbarcfg = reactive({
      indexList: ["工", "寿", "性", "库"],
      // indexList: ["工位领用Top", "寿命分析", "性价比分析", "库存量"],
    });
    reqBladeAnalyseData().then((res) => {
      console.log(res);
      const option = reactive({
        topReceiveOpt: {
          title: {
            text: "工位领用Top10",
          },
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
          // legend: {
          //   data: ["总"],
          //   selected: {
          //     总: true,
          //   },
          // },
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
            data: res.top_receive.workstations.slice(0, 10).reverse(),
            name: "工位",
          },
          series: [
            {
              name: "总",
              type: "bar",
              data: res.top_receive.workstations_freq.slice(0, 10).reverse(),
            },
          ],
        },
        serviceLifeOpt: {
          title: {
            text: "刀片刀具寿命分析",
          },
          toolbox: {
            show: true,
            feature: {
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          legend: {
            top: "7%",
            data: ["平均寿命", "样本数量"],
          },
          xAxis: {
            data: res.service_life.blade_type.map((x) => x.split("|")[0]),
            axisLabel: {
              show: true,
              // inside: true,
              // color: "#fff",

              interval: 0,
              rotate: 40,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            z: 10,
          },
          yAxis: [
            {
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                color: "#999",
              },
            },
            {
              type: "value",
            },
          ],
          dataZoom: [
            {
              type: "inside",
            },
          ],
          series: [
            {
              name: "平均寿命",
              type: "bar",
              showBackground: true,
              // itemStyle: {
              //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //     { offset: 0, color: "#83bff6" },
              //     { offset: 0.5, color: "#188df0" },
              //     { offset: 1, color: "#188df0" },
              //   ]),
              // },
              // emphasis: {
              //   itemStyle: {
              //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //       { offset: 0, color: "#2378f7" },
              //       { offset: 0.7, color: "#2378f7" },
              //       { offset: 1, color: "#83bff6" },
              //     ]),
              //   },
              // },
              label: {
                show: true,
                position: "insideTop",
                distance: 10,
                align: "right",
                verticalAlign: "middle",
                rotate: 90,
                fontSize: 16,
                rich: {
                  name: {},
                },
              },
              data: res.service_life.average_life,
            },
            {
              name: "样本数量",
              type: "line",
              yAxisIndex: 1,
              label: {
                show: true,
                position: "top",
              },
              data: res.service_life.temple_num,
            },
          ],
        },
      });
      // 基于准备好的dom，初始化echarts实例
      var echarts = require("echarts");
      const topReceiveChart = echarts.init(
        document.getElementById("topReceive")
      );
      const serviceLifeChart = echarts.init(
        document.getElementById("serviceLife")
      );
      // 绘制图表
      console.log(option.serviceLifeOpt);
      option.topReceiveOpt && topReceiveChart.setOption(option.topReceiveOpt);
      option.serviceLifeOpt &&
        serviceLifeChart.setOption(option.serviceLifeOpt);
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
    #serviceLife {
      width: 100%;
      // height: 70%;
      min-height: 500px;
      background-color: var(--van-cell-background-color);
    }
  }
}
</style>

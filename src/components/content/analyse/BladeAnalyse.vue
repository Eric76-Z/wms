<template>
  <div id="bladeanalyse" v-show="true">
    <van-index-bar :index-list="indexbarcfg.indexList" ref="scroll1">
      <div class="index-title"></div>
      <van-index-anchor index="工">工位领用Top</van-index-anchor>
      <div id="topReceive"></div>
      <van-index-anchor index="寿">寿命分析</van-index-anchor>
      <div id="serviceData"></div>
      <van-index-anchor index="性">性价比分析</van-index-anchor>
      <div id="costEffective"></div>
      <van-index-anchor index="库">库存量</van-index-anchor>
      <el-table :data="tableData.data" style="width: 100%">
        <el-table-column prop="blade_spec" label="名称"> </el-table-column>
        <el-table-column prop="total_receive" label="总领用量" width="100">
        </el-table-column>
        <el-table-column prop="blade_stock_nb" label="库存量-宁波" width="120">
        </el-table-column>
      </el-table>
    </van-index-bar>
  </div>
</template>

<script>
import { reactive } from "vue";
import { reqBladeAnalyseData } from "@/network/sort.js";
import { ElTable, ElTableColumn } from "element-plus";
export default {
  name: "BladeAnalyse",
  components: {
    ElTable,
    ElTableColumn,
  },
  setup() {
    const indexbarcfg = reactive({
      indexList: ["工", "寿", "性", "库"],
      // indexList: ["工位领用Top", "寿命分析", "性价比分析", "库存量"],
    });
    const tableData = reactive({
      data: [],
    });
    reqBladeAnalyseData().then((res) => {
      console.log(res);
      tableData.data = res.blade_service_status;
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
        serviceDataOpt: {
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
            data: res.service_data.blade_type.map((x) => x.split("|")[0]),
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
              data: res.service_data.average_life,
            },
            {
              name: "样本数量",
              type: "line",
              yAxisIndex: 1,
              label: {
                show: true,
                position: "top",
              },
              data: res.service_data.temple_num,
            },
          ],
        },
        costEffectiveOpt: {
          title: {
            text: "刀片刀具性价比分析",
          },
          toolbox: {
            show: true,
            feature: {
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          // legend: {
          //   top: "7%",
          //   data: ["性价比"],
          // },
          xAxis: {
            data: res.service_data.blade_type.map((x) => x.split("|")[0]),
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
          ],
          dataZoom: [
            {
              type: "inside",
            },
          ],
          series: [
            {
              name: "性价比",
              type: "bar",
              showBackground: true,
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
              data: res.service_data.cost_effective,
            },
          ],
        },
      });
      // 基于准备好的dom，初始化echarts实例
      var echarts = require("echarts");
      const topReceiveChart = echarts.init(
        document.getElementById("topReceive")
      );
      const serviceDataChart = echarts.init(
        document.getElementById("serviceData")
      );
      const costEffectiveChart = echarts.init(
        document.getElementById("costEffective")
      );
      // 绘制图表
      console.log(option.serviceDataOpt);
      option.topReceiveOpt && topReceiveChart.setOption(option.topReceiveOpt);
      option.serviceDataOpt &&
        serviceDataChart.setOption(option.serviceDataOpt);
      option.costEffectiveOpt &&
        costEffectiveChart.setOption(option.costEffectiveOpt);
    });
    return {
      indexbarcfg,
      tableData,
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
    #serviceData {
      width: 100%;
      // height: 70%;
      min-height: 500px;
      background-color: var(--van-cell-background-color);
    }
    #costEffective {
      width: 100%;
      height: 70%;
      min-height: 500px;
      background-color: var(--van-cell-background-color);
    }
  }
}
</style>

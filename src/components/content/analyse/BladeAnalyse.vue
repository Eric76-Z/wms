<template>
  <div id="bladeanalyse" v-show="true">
    <van-index-bar :index-list="indexbarcfg.indexList">
      <van-index-anchor index="1">标题1</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-index-anchor index="2">标题2</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-index-anchor index="3">标题3</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-index-anchor index="4">标题4</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-index-anchor index="5">标题5</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-index-anchor index="6">标题6</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
    </van-index-bar>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "BladeAnalyse",
  components: {},
  setup() {
    const indexbarcfg = reactive({
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      // indexList: ["工位领用Top", "寿命分析", "性价比分析", "库存量"],
      active: 0,
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
}
</style>

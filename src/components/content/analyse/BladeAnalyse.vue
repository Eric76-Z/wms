<template>
  <div id="bladeanalyse">
    <van-tabs v-model:active="tabscfg.active" scrollspy sticky>
      <van-tab
        v-for="(item, index) in tabscfg.title"
        :title="item"
        :key="index"
      >
        内容 {{ index }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "BladeAnalyse",
  components: {},
  setup() {
    const tabscfg = {
      title: ["工位领用Top", "寿命分析", "性价比分析", "库存量"],
      active: 0,
    };
    return {
      tabscfg,
    };
  },
};
</script>

<style lang="scss"></style>

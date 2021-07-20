<template>
  <div id="faultlist1">
    <van-search
      v-model="value"
      ref="search"
      :show-action="isShow"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
    />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "faultlist1",
  data() {
    return {};
  },
  components: {},
  setup() {
    const navbarcfg = {
      title: "历史故障",
      isShow: [true, true, true],
    };
    const value = ref("");

    return {
      navbarcfg,
      value,
      // foucs
    };
  },
  mounted() {
    console.log(this.$refs.search.focus());
  },
};
</script>
<style lang="scss"></style>

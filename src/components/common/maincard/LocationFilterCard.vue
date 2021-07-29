<template>
  <div id="locationfiltercard" v-show="lfcardcfg.isShow">
    <div class="lf-content">
      <van-button
        v-for="(item, index) in lfcardcfg.data"
        :key="index"
        :plain="!lfcardcfg.selected[index]"
        round
        type="success"
        size="mini"
        @click="lfcardcfg.clickBtn(index)"
        >{{ item }}</van-button
      >
    </div>
  </div>
</template>

<script>
import { toRef } from "vue";
export default {
  name: "LocationFilterCard",
  props: {
    lfcardcfg: {
      type: Object,
    },
  },
  setup(props) {
    // console.log(props.lfcardcfg);
    const listdata = toRef(props, listdata);

    return {};
  },
};
</script>

<style lang="scss" scop>
#locationfiltercard {
  background-color: var(--van-gray-2);
  padding: 5px 8px;
  .lf-content {
    .van-button {
      min-width: 40px;
    }
  }
}
</style>

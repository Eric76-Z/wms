<template>
  <van-list
    v-model:loading="state.loading"
    :finished="state.finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in state.list" :key="item" :title="item" />
    <!-- <van-card
      v-for="(item, index) in listcfg"
      :key="index"
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
    /> -->
  </van-list>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "SideBarCard",
  data() {
    return {
      mylist: [],
    };
  },
  props: {
    listcfg: {
      type: Object,
    },
  },
  setup() {
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
    });

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          state.list.push(state.list.length + 1);
        }

        // 加载状态结束
        state.loading = false;

        // 数据全部加载完成
        if (state.list.length >= 40) {
          state.finished = true;
        }
      }, 1000);
    };

    return {
      state,
      onLoad,
    };
  },
};
</script>

<style></style>

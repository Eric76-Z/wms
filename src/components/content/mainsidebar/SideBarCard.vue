<template>
  <van-list
    v-model:loading="state.loading"
    :finished="state.finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-card
      v-for="(item, index) in listcfg"
      :key="index"
      :desc="item.desc"
      :title="item.title"
    >
      <!-- <template #tags>
        <van-tag plain type="danger">标签</van-tag>
        <van-tag plain type="danger">标签</van-tag>
      </template>
      <template #footer>
        <van-button size="mini">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </template> -->
    </van-card>
  </van-list>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "SideBarCard",
  data() {
    return {};
  },
  props: {
    listcfg: {
      type: Object,
    },
  },
  setup() {
    const state = reactive({
      loading: false, // 是否处在加载状态
      finished: false, // 是否已加载完成
      error: false, // 是否加载失败
      list: [], // 列表
      page: 1, // 分页
      page_size: 10, // 每页条数
      total: 0, // 数据总条数
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

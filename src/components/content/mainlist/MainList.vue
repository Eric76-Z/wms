<template>
  <van-list
    v-model:loading="state.loading"
    :finished="state.finished"
    finished-text="没有更多了"
  >
    <slot></slot>
    <!-- <van-cell-group v-for="(item, index) in listcfg" :key="index">
      <van-cell
        :title="item.title"
        value="内容"
        :label="item.label"
        is-link
        :to="item.to"
      />
    </van-cell-group> -->
  </van-list>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "MainList",
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

    return {
      state,
    };
  },
};
</script>

<style></style>

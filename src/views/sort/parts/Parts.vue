<template>
  <div id="parts">
    <van-search
      v-model="searchcfg.value"
      ref="search"
      placeholder="请输入搜索关键词"
      @search="searchcfg.onSearch"
      @clear="searchcfg.onClear"
    />
  </div>
</template>

<script>
import { toRef, reactive } from "vue";
import { useStore } from "vuex";
export default {
  name: "Parts",
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "分类-备件",
      isShow: [true, true, true],
    };

    const searchcfg = reactive({
      value: "",
      onSearch: () => {
        queryParam.search = searchcfg.value;
        listcfg.list = [];
        listcfg.currPage = 1;
        listcfg.pageSize = 10;
        listcfg.finished = false;
        listcfg.error = false;
        listcfg.onLoad();
      },
      onClear: () => {
        delete queryParam.search;
        listcfg.list = [];
        listcfg.currPage = 1;
        listcfg.pageSize = 10;
        listcfg.finished = false;
        listcfg.error = false;
        listcfg.onLoad();
      },
    });
    const listcfg = reactive({
      loading: false, // 是否处在加载状态
      finished: false, // 是否已加
      error: false, // 是否加载失败
      list: [], // 列表
      // totalPage: 1, // 分页
      pageSize: 10, // 每页条数
      // totalSize: 0, // 数据总条数
      currPage: 1, //从1开始
      onLoad: () => {
        listcfg.loading = true;
        queryParam.page = listcfg.currPage;
        queryParam.pageSize = listcfg.pageSize;
      },
      onRefresh: () => {
        console.log("刷新");
        // 清空列表数据
        listcfg.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        listcfg.loading = true;
        listcfg.onLoad();
      },
    });

    const queryParam = reactive({
      page: listcfg.currPage,
      pageSize: listcfg.pageSize,
    });

    return { searchcfg, listcfg };
  },
};
</script>

<style lang="scss">
#parts {
  .van-search {
    padding: 5px 10px;
    // --van-search-input-height: 20px;
    .van-field__control {
      line-height: 22px;
    }
  }
}
</style>

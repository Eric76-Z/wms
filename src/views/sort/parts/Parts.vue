<template>
  <div id="parts">
    <van-search
      v-model="searchcfg.value"
      ref="search"
      show-action
      placeholder="请输入搜索关键词"
      @search="searchcfg.onSearch"
      @clear="searchcfg.onClear"
      @click-input="searchcfg.clickInput"
    >
      <template #action>
        <div @click="searchcfg.onSearch">搜索</div>
      </template>
    </van-search>
    <main-grid :gridcfg="gridcfg" />
  </div>
</template>

<script>
import { toRef, reactive } from "vue";
import { useStore } from "vuex";
import MainGrid from "@/components/content/maingrid/MainGrid";

export default {
  name: "Parts",
  components: {
    MainGrid,
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "分类-备件",
      isShow: [true, true, true],
    };

    //组件配置
    const tabscfg = reactive({
      title: ["全部", "与我相关", "我的收藏", ""],
      active: 0,
    });
    const searchcfg = reactive({
      value: "",
      showAction: false,
      onSearch: () => {},
      onClear: () => {},
      clickInput: () => {
        console.log("弹出");
        searchcfg.showAction = true;
      },
    });
    const gridcfg = reactive({
      iconText: [
        [
          "我的备件",
          "jiqiren",
          {
            name: "partslist",
            params: { type: "myparts" },
          },
        ],
        ["机器人备件", "hanzhuang", "/sort"],
        ["焊枪备件", "shebei", "/sort"],
        ["修模器", "shenqing", "/sort/list"],
        ["待补库", "liebiao", "/sort/detail"],
        ["备件查询", "kucunguanli", "/sort/parts"],
        ["资料查询", "ziliao", "/sort"],
        ["故障代码", "faultcode", "/sort"],
        ["维修专家", "weixiuqiye", "/sort/mtisland"],
      ],
      columnNum: 4,
    });
    return { searchcfg, tabscfg, gridcfg };
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
  .van-tabs {
    --van-tabs-line-height: 28px;
    .van-tab__pane {
      .page-list {
        position: relative;
        width: 100%;
        height: calc(100vh - #{$navbar-height + $tabbar-height} - 28px - 44px);
        overflow: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch; /* ios5+ */
        .scroll {
          // scroll-behavior: smooth;
          .van-card {
            .van-card__content {
              min-height: 10px;
            }
          }
        }
      }
    }
  }

  .filter {
    display: flex;
    width: 25%;
    line-height: 28px;
    background-color: --van-white;
    position: absolute;
    top: 88px;
    right: 0;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 var(--van-padding-base);
    color: var(--van-tab-text-color);
    font-size: var(--van-tab-font-size);
    font-weight: 800;
    // line-height: var(--van-tab-line-height);
    cursor: pointer;
    z-index: 999px;
    .filter-content {
      span {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }

  .back-top {
    position: absolute;
    right: 22px;
    bottom: 40px;
  }
  .appeal-popup {
    padding-top: 20px;
    background-color: var(--van-gray-1);
    .van-button {
      margin-top: 20px;
    }
  }
}
</style>

<template>
  <div id="parts">
    <van-search
      v-model="searchcfg.value"
      ref="search"
      placeholder="请输入搜索关键词"
      autofocus
      @click-input="searchcfg.clickInput"
    >
    </van-search>
    <main-grid :gridcfg="gridcfg" />
    <van-popup
      v-model:show="popupcfg.show"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <template #default>
        <part-search @onClickLeft="popupcfg.onClickLeft"></part-search>
      </template>
    </van-popup>
  </div>
</template>

<script>
import { toRef, reactive } from "vue";
import { useStore } from "vuex";
import MainGrid from "@/components/content/maingrid/MainGrid";
import PartSearch from "@/components/content/search/PartSearch";

export default {
  name: "Parts",
  components: {
    MainGrid,
    PartSearch,
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
      clickInput: () => {
        console.log("弹出");
        popupcfg.show = true;
      },
    });
    const gridcfg = reactive({
      grid: [
        {
          text: "我的备件",
          iconText: "jiqiren",
          route: {
            name: "partslist",
            params: { type: "myparts" },
          },
          tag: {
            text: "新",
            textColor: "",
            color: "var(--van-green)  ",
            show: "true",
          },
        },
        {
          text: "机器人备件",
          iconText: "hanzhuang",
          route: {
            name: "partslist",
            params: { type: "robot" },
          },
          tag: {
            text: "新",
            textColor: "",
            color: "var(--van-green)  ",
            show: "true",
          },
        },
        {
          text: "焊枪备件",
          iconText: "shebei",
          route: "/sort/parts",
          tag: {
            text: "新",
            textColor: "",
            color: "var(--van-green)  ",
            show: "true",
          },
        },
        {
          text: "修模器",
          iconText: "shenqing",
          route: "/sort/parts",
          tag: {
            text: "新",
            textColor: "",
            color: "var(--van-green)  ",
            show: "true",
          },
        },
        {
          text: "待补库",
          iconText: "liebiao",
          route: "/sort/parts",
          tag: {
            text: "未开发",
            textColor: "",
            color: "var(--van-gray-6)",
            show: "true",
          },
        },
        {
          text: "备件查询",
          iconText: "kucunguanli",
          route: "/sort/parts",
          tag: {
            text: "未开发",
            textColor: "",
            color: "var(--van-gray-6)",
            show: "true",
          },
        },
        {
          text: "分类模块",
          iconText: "ziliao",
          route: {
            name: "sortweb",
          },
          tag: {
            text: "新",
            textColor: "",
            color: "var(--van-green)  ",
            show: "true",
          },
          auth: "super",
        },
        // ["故障代码", "faultcode", "/sort"],
        // ["维修专家", "weixiuqiye", "/sort/mtisland"],
      ],
      columnNum: 4,
    });
    const popupcfg = reactive({
      show: false,
      onClickLeft: () => {
        popupcfg.show = false;
      },
    });
    return { searchcfg, tabscfg, gridcfg, popupcfg };
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

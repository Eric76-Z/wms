<template>
  <div id="partslist">
    <van-search
      v-model="searchcfg.value"
      ref="search"
      placeholder="请输入搜索关键词"
      @search="searchcfg.onSearch"
      @clear="searchcfg.onClear"
      @click-input="searchcfg.clickInput"
    />
    <van-tabs v-model:active="tabscfg.active" animated>
      <van-tab
        v-for="(item, index) in tabscfg.title"
        :title="item"
        :key="index"
      >
        <div class="page-list" ref="scroll" v-if="index === 0">
          <van-list
            v-model:loading="listcfg.loading"
            v-model:error="listcfg.error"
            :finished="listcfg.finished"
            finished-text="没有更多了"
            @load="listcfg.onLoad"
            @refresh="listcfg.onRefresh"
            class="scroll"
          >
            <slot>
              <part-card
                v-for="item in listcfg.list"
                :key="item.id"
                :listdata="item"
              ></part-card>
            </slot>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 筛选器 -->
    <div class="filter" @click="itemFilter">
      <div class="filter-content">
        <span>筛选<van-icon name="filter-o" /> </span>
      </div>
    </div>
    <!-- 过滤弹出层 -->
    <van-popup
      v-model:show="popupcfg.show"
      position="right"
      round
      :style="{ height: '100%', width: '90%' }"
    >
      <!-- <template #default>
        <main-filter ref="MainFilter" @queryData="queryData"></main-filter>
      </template> -->
    </van-popup>
    <back-top v-show="showBackTop" @click="backtop"></back-top>
  </div>
</template>

<script>
import { toRef, reactive, computed, ref, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import BackTop from "@/components/common/BackTop";
import PartCard from "@/components/content/cards/PartCard";
import { listParts } from "@/network/sort.js";
import { debounce } from "@/common/utils.js";
import { sortModel } from "@/common/constant.js";
export default {
  name: "PartsList",
  components: {
    BackTop,
    PartCard,
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    const user = toRef(store.state, "user");
    navbarcfg.value.mainnavbarcfg = {
      title: "分类-备件",
      isShow: [true, true, true],
    };
    //route
    const route = reactive(useRoute());

    let scroll = ref(null);
    let showBackTop = ref(false);
    // console.log(scroll);
    //组件配置
    const tabscfg = reactive({
      title: computed(() => {
        let title = [];
        switch (route.params["type"]) {
          case "myparts":
            title = ["全部", "常用", "我的分组", ""];
            break;
          case "robot":
            title = ["全部", "柜箱及组件", "本体", ""];
            break;
          default:
            break;
        }
        return title;
      }),
      active: 0,
    });

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
      clickInput: () => {
        console.log("弹出");
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
        switch (route.params.type) {
          case "myparts":
            queryParam.users = user.value.userinfo.userId;
            break;
          case "robot":
            queryParam.sort__type_layer = sortModel.type_layer_robot;
            break;
          default:
            break;
        }
        console.log(queryParam);
        listcfg.loading = true;
        queryParam.page = listcfg.currPage;
        queryParam.pageSize = listcfg.pageSize;
        const p = scroll.value.scrollTop;
        listParts(queryParam).then((res) => {
          listcfg.list.push.apply(listcfg.list, res.results);
          const finishFlag = computed(() => {
            if (res.next == null) {
              return true;
            } else {
              return false;
            }
          });
          listcfg.finished = finishFlag;
          listcfg.currPage++;
          listcfg.loading = false;
          scroll.value.scrollTop = p;
        });
      },
      onRefresh: () => {
        // 清空列表数据
        listcfg.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        listcfg.loading = true;
        listcfg.onLoad();
      },
    });
    //查询参数
    const queryParam = reactive({
      page: listcfg.currPage,
      pageSize: listcfg.pageSize,
      // user: user.value.userinfo.userId,
    });

    const popupcfg = reactive({
      show: false,
    });
    const itemFilter = () => {
      popupcfg.show = true;
    };
    const backtop = () => {
      scroll.value.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      showBackTop.value = false;
    };

    const handle = debounce(() => {
      if (scroll.value.scrollTop >= 1000) {
        // console.log(scroll.value.scrollTop);
        // console.log(showBackTop.value);
        showBackTop.value = true;
      } else {
        // console.log(scroll.value.scrollTop);
        // console.log(showBackTop.value);
        showBackTop.value = false;
      }
    }, 100);
    onMounted(() => {
      nextTick(() => {
        document.addEventListener("touchmove", handle);
      });
    });

    return {
      searchcfg,
      listcfg,
      tabscfg,
      popupcfg,
      itemFilter,
      backtop,
      showBackTop,
      scroll,
    };
  },
};
</script>

<style lang="scss">
#partslist {
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
    bottom: 84px;
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

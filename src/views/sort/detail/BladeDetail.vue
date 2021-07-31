<template>
  <div id="bladedetail">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-search
      v-model="searchcfg.value"
      ref="search"
      placeholder="请输入搜索关键词"
      @search="onSearch"
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
              <!-- <van-card
              v-for="item in listcfg.list"
              :key="item"
              :tag="item.tag"
              :title="item.weldinggun_num"
              :price="item.price"
              :desc="item.desc"
              thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
            >
              <template #footer>
                <van-button
                  :to="{
                    name: 'bladeapply2',
                    params: { bladeId: index },
                  }"
                  type="success"
                  size="mini"
                  round
                  >点击领用</van-button
                >
              </template>
            </van-card> -->
              <jp-card
                v-for="item in listcfg.list"
                :key="item.id"
                :listdata="item"
              ></jp-card>
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
    <van-popup
      v-model:show="popupcfg.show"
      position="right"
      round
      :style="{ height: '100%', width: '90%' }"
    >
      <template #default>
        <main-filter ref="MainFilter" @queryData="queryData"></main-filter>
      </template>
    </van-popup>
    <back-top v-show="showBackTop" @click="backtop"></back-top>
  </div>
</template>

<script>
import {
  reactive,
  computed,
  // onActivated,
  // onDeactivated,
  ref,
  toRef,
  nextTick,
  onMounted,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
import MainFilter from "@/components/common/mainfilter/MainFilter";
import BackTop from "@/components/common/BackTop";
import JpCard from "@/components/common/maincard/JpCard";
import { reqBladeItemData } from "@/network/sort.js";
import { debounce } from "@/common/utils.js";

// import MiddleBar from "@/components/content/maintabbar/MiddleBar";

export default {
  name: "BladeDetail",
  data() {
    return {
      navbarcfg: {
        title: "刀片申请明细",
        isShow: [true, true, true],
      },
    };
  },
  components: {
    MainNavBar,
    JpCard,
    BackTop,
    MainFilter,
    // MiddleBar,
    // MainList,
  },

  setup() {
    //vuex数据
    const store = useStore();
    const listOffset = toRef(store.state, "listOffset");
    //路由
    const router = reactive(useRouter());
    console.log(router);

    let scroll = ref(null);
    let showBackTop = ref(false);

    //组件配置
    const tabscfg = reactive({
      title: ["全部", "数据分析", "公告", ""],
      active: 0,
    });
    const searchcfg = reactive({
      value: "",
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
        reqBladeItemData(queryParam)
          .then((res) => {
            console.log(res);

            listcfg.list.push.apply(listcfg.list, res.results);
            // console.log(scroll);
            console.log(listcfg.list);
            const finishFlag = computed(() => {
              if (res.next == null) {
                return true;
              } else {
                return false;
              }
            });
            listcfg.finished = finishFlag;
            // console.log(listcfg.finished);
            listcfg.currPage++;
            listcfg.loading = false;
          })
          .catch((err) => {
            listcfg.error = true;
            console.log(err);
          });
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
    //查询参数
    const queryParam = reactive({
      page: listcfg.currPage,
      pageSize: listcfg.pageSize,
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

    //搜索模块
    let listData = reactive();
    const queryData = (data) => {
      queryParam["localLv1"] = data.localLv1.toString();
      queryParam["localLv2"] = data.localLv2.toString();
      queryParam["localLv3"] = data.localLv3.toString();
      listcfg.list = [];
      listcfg.currPage = 1;
      listcfg.pageSize = 10;
      listcfg.finished = false;
      listcfg.error = false;

      listcfg.onLoad();
    };

    const onSearch = () => {
      listData.queryParam = searchcfg.value;
      console.log(listData);
      reqBladeItemData(listData);
    };

    return {
      tabscfg,
      searchcfg,
      listcfg,
      popupcfg,
      itemFilter,
      scroll,
      showBackTop,
      backtop,
      listOffset,
      onSearch,
      queryData,
    };
  },
  // beforeRouteEnter() {
  //   console.log("激活");
  //   console.log(scroll.value);
  //   console.log(document.getElementsByClassName("scroll"));

  //   // if (scroll.value) {
  //   //   scroll.value.scrollTop = listOffset.value.bladedetail_scrollTop;
  //   // }
  // },
  // beforeRouteLeave() {
  //   console.log("离开");
  //   console.log(scroll.value);
  //   console.log(document.getElementsByClassName("scroll"));
  //   // listOffset.value.bladedetail_scrollTop = scroll.value.scrollTop;
  //   // const payload = {
  //   //   data: listOffset.value,
  //   //   target: "bladedetail_scrollTop",
  //   // };
  //   // store.commit("change_offset", payload);
  //   // //keep-alive 的页面跳转时，移除scroll事件
  //   // document.removeEventListener("touchmove", handle);
  // },
};
</script>

<style lang="scss">
#bladedetail {
  position: relative;
  --van-tabs-card-height: 20px;
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
        overflow-y: auto;
        -webkit-overflow-scrolling: touch; /* ios5+ */
        .scroll {
          // scroll-behavior: smooth;
          .van-card {
            .van-card__content {
              min-height: 10px;
              // .van-card__title {
              //   // font-size: 16px;
              //   // line-height: 18px;
              //   // font-weight: 1000px;
              // }
            }
          }
        }
      }
      // .page-list {
      //   overflow: scroll; /* winphone8和android4+ */
      //   -webkit-overflow-scrolling: touch; /* ios5+ */
      //   overflow-y: auto;
      //   overflow-x: hidden;
      //   z-index: 1;
      //   -webkit-backface-visibility: hidden;
      //   -webkit-transform: translate3d(0, 0, 0);
      // }
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
    font-weight: 500;
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
}
</style>

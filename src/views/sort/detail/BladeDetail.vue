<template>
  <div id="bladedetail">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-search
      v-model="searchcfg.value"
      ref="search"
      placeholder="请输入搜索关键词"
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
    <back-top v-show="showBackTop.value"></back-top>
  </div>
</template>

<script>
import {
  reactive,
  computed,
  onActivated,
  onDeactivated,
  ref,
  watch,
  nextTick,
} from "vue";
// import { useStore } from "vuex";
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
import BackTop from "@/components/common/BackTop";
import JpCard from "@/components/common/maincard/JpCard";
import { reqBladeData } from "@/network/sort.js";

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
    // MiddleBar,
    // MainList,
  },

  setup() {
    const tabscfg = reactive({
      title: ["全部", "数据分析", "公告", ""],
      active: 0,
    });
    const searchcfg = reactive({
      value: "",
    });

    const listcfg = reactive({
      loading: false, // 是否处在加载状态
      finished: false, // 是否已加载完成
      error: false, // 是否加载失败
      list: [], // 列表
      totalPage: 1, // 分页
      pageSize: 10, // 每页条数
      totalSize: 0, // 数据总条数
      currPage: 1, //从1开始
      onLoad: () => {
        listcfg.loading = true;
        reqBladeData({
          target: "getbladeitemdata",
          currPage: listcfg.currPage,
          pageSize: listcfg.pageSize,
        })
          .then((res) => {
            console.log(scroll.value.scrollTop);
            // console.log(res);
            // console.log(res.callback.rows);
            listcfg.list.push.apply(listcfg.list, res.callback.rows);
            console.log(scroll);
            // console.log(listcfg.list);
            const finishFlag = computed(() => {
              if (res.callback.finished === 0) {
                return false;
              } else {
                return true;
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
    const itemFilter = () => {
      // console.log(bladeitemdata.rows);
      console.log(listcfg.list);
      const scrollDom = reactive(document.getElementsByClassName("scroll"));
      console.log(scrollDom);
    };

    // const showBackTop = () => {
    //   const scrollDom = document.getElementsByClassName("scroll");
    //   const scrollTop = scrollDom.scrollTop || console.log(scrollDom.offsetTop);
    //   console.log(scroll.value.scrollTop);
    //   if (scroll.value.scrollTop > 500) {
    //     console.log("出现");
    //   } else {
    //     console.log("隐去");
    //   }
    // };
    // lazyready(() => {
    //   console.log("www");
    // });
    // onLazyready(() => {
    //   console.log("wwwww");
    // });
    let scroll = ref(null);
    let showBackTop = ref(true);
    watch([scroll, showBackTop], () => {
      nextTick(() => {
        document.addEventListener("touchmove", function () {
          if (scroll.value.scrollTop >= 500) {
            console.log("wwwwwwwww");
            console.log(showBackTop);
            showBackTop = false;
          } else {
            console.log("wwwwwwwww11111111w");
            console.log(showBackTop);
            showBackTop = true;
          }
        });
        console.log(showBackTop.value);
      });
    });

    onActivated(() => {
      console.log(scroll);

      console.log("激活");
      //滚动条位置的监听放到activated是因为此页面被keep-alive缓存了
      const scrollDom = reactive(document.getElementsByClassName("scroll"));
      console.log(scrollDom);
      // this.$refs.scroll.scrollTop = this.home_list_top; //this.$refs.scroll拿到滚动的dom，即scrollContainer，this.home_list_top是存入到vuex里的值
      // this.$refs.scroll.addEventListener("scroll", this.operateScrollPosition); //添加绑定事件
    });
    onDeactivated(() => {
      //keep-alive 的页面跳转时，移除scroll事件
      // this.$refs.scroll.removeEventListener(
      //   "scroll",
      //   this.operateScrollPosition
      // ); //清除绑定的scroll事件
      let vanlist = document.getElementsByClassName("page-list");
      console.log(vanlist);
      console.log("wwwwwww");
    });

    return {
      tabscfg,
      searchcfg,
      listcfg,
      itemFilter,
      scroll,
      showBackTop,
    };
  },
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

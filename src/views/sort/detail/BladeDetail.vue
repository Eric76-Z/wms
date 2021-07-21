<template>
  <div id="bladedetail">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-search
      v-model="value"
      ref="search"
      :show-action="isShow"
      placeholder="请输入搜索关键词"
    />
    <van-tabs v-model:active="active" animated>
      <van-tab v-for="item in tabscfg.title" :title="item" :key="item">
        <van-list
          v-model:loading="listcfg.loading"
          :finished="listcfg.finished"
          finished-text="没有更多了"
          @load="onLoad"
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
      </van-tab>
    </van-tabs>
    <div class="filter">
      <div class="filter-content"><van-icon name="filter-o" /> 筛选</div>
    </div>
  </div>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
import JpCard from "@/components/common/maincard/JpCard";
import { reactive } from "vue";
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
    // MiddleBar,
    // MainList,
  },
  setup() {
    const tabscfg = {
      title: ["全部", "数据分析", "公告", ""],
    };
    const listcfg = reactive({
      loading: false, // 是否处在加载状态
      finished: false, // 是否已加载完成
      error: false, // 是否加载失败
      list: [
        {
          location_level_1: "CPH2.1",
          location_level_2: "UB",
          location_level_3: "LTV",
          weldinggun_num: "1030SK1",
          id: 379,
          order_comments: "None",
          repair_order_num: "None",
          order_status: 2,
          receive_time: "None",
          complete_time: "None",
          create_time: "2021-06-04 03:33",
          update_time: "2021-06-04 06:41",
          applicant: "张炯平",
          receiver: "None",
          applyblade: "邺格02G刀片|YGC-6",
          receiveblade: "None",
          sum: 0,
          last_replace: "首次领用",
        },
      ], // 列表
      totalPage: 1, // 分页
      // pageSize: 8, // 每页条数
      totalSize: 0, // 数据总条数
    });
    const mainlistcardcfg = {
      list: listcfg.list,
    };
    const onLoad = () => {
      console.log("wwwwwwwwww");
    };
    return {
      tabscfg,
      listcfg,
      onLoad,
      mainlistcardcfg,
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
  .mainlist {
    width: 100%;
    height: calc(100vh - #{$navbar-height + $tabbar-height} - 28px - 44px);
    overflow: auto;
    .van-card {
      .van-card__content {
        min-height: 10px;
        .van-card__title {
          // font-size: 16px;
          // line-height: 18px;
          // font-weight: 1000px;
        }
      }
    }
  }
  .van-tabs {
    --van-tabs-line-height: 28px;
    .van-tab__pane {
    }
  }

  .filter {
    width: 25%;
    line-height: 28px;
    background-color: --van-white;
    position: absolute;
    top: 88px;
    right: 0;
    padding: 0 4px;
    // align-items: center;
    // justify-content: center;
    // box-sizing: border-box;
    // padding: 0 var(--van-padding-base);
    // color: var(--van-tab-text-color);
    // font-size: var(--van-tab-font-size);
    // line-height: var(--van-tab-line-height);
    // cursor: pointer;
    z-index: 999px;
  }
}
</style>

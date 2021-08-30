<template>
  <div id="bladedetail">
    <van-search
      v-model="searchcfg.value"
      ref="search"
      placeholder="请输入搜索关键词"
      @search="searchcfg.onSearch"
      @clear="searchcfg.onClear"
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
              <blade-card
                v-for="item in listcfg.list"
                :key="item.id"
                :listdata="item"
                @selectedid="selectedid"
                @viewImg="viewImg"
              ></blade-card>
            </slot>
          </van-list>
        </div>
        <div class="analyse" v-if="index === 1">
          <blade-analyse> </blade-analyse>
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
      <template #default>
        <main-filter ref="MainFilter" @queryData="queryData"></main-filter>
      </template>
    </van-popup>
    <back-top v-show="showBackTop" @click="backtop"></back-top>
    <!-- 申诉弹出层 -->
    <van-popup
      class="appeal-popup"
      v-model:show="appealpopupcfg.show"
      closeable
      position="bottom"
      :style="{ height: '60%' }"
    >
      <template #default>
        <van-divider
          :style="{
            color: '#1989fa',
            borderColor: '#1989fa',
            padding: '0 16px',
          }"
        >
          {{ appealpopupcfg.workstation }}
        </van-divider>
        <van-cell-group inset>
          <van-field
            v-model="appealpopupcfg.message"
            rows="6"
            autosize
            label="申诉"
            type="textarea"
            maxlength="150"
            placeholder="有什么想要说的......"
            show-word-limit
          />
        </van-cell-group>
        <van-button
          @click="appealpopupcfg.btnSub"
          type="primary"
          size="normal"
          block
          >提交</van-button
        >
      </template>
    </van-popup>
    <!-- 领取刀片类型选择器 -->
    <van-popup v-model:show="receivepickercfg.show" round position="bottom">
      <van-picker
        title="领取刀片"
        :columns="receivepickercfg.columns"
        @confirm="receivepickercfg.click.onConfirm"
        @cancel="receivepickercfg.show = false"
        :default-index="2"
      />
    </van-popup>
    <!-- 图片预览弹出层 -->
    <van-popup v-model:show="imgpopupcfg.show">
      <van-image :src="imgpopupcfg.img"
    /></van-popup>
  </div>
</template>

<script>
import { reactive, computed, ref, toRef, nextTick, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import MainFilter from "@/components/common/mainfilter/MainFilter";
import BackTop from "@/components/common/BackTop";
import BladeCard from "@/components/content/cards/BladeCard";
import BladeAnalyse from "@/components/content/analyse/BladeAnalyse";
import { Dialog, Toast, Picker } from "vant";
import { reqBladeItemData, partupBladeItemData } from "@/network/sort.js";
import { debounce } from "@/common/utils.js";

// import MiddleBar from "@/components/content/maintabbar/MiddleBar";

export default {
  name: "BladeDetail",
  components: {
    BladeCard,
    BackTop,
    MainFilter,
    [Picker.name]: Picker,
    BladeAnalyse,
  },

  setup() {
    //vuex数据
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "刀片申请明细",
      isShow: [true, true, true],
    };
    const listOffset = toRef(store.state, "listOffset");
    const bladeinfo = computed(() => {
      return store.state.blade.bladeinfo;
    });
    const {
      "blade/getBladeInfo": [getBladeInfo],
    } = store._actions;
    const bladeDataCol = computed(() => {
      return store.getters.bladeDataCol;
    });
    if (bladeinfo.value.length == 0) {
      //没有数据请求数据
      console.log("重新加载bladeinfo");
      const params = {
        tag: 1,
      };
      getBladeInfo(params);
    }

    const user = toRef(store.state, "user");

    //路由
    const router = reactive(useRouter());
    console.log(router);

    let scroll = ref(null);
    let showBackTop = ref(false);
    console.log(scroll);

    //组件配置
    const tabscfg = reactive({
      title: ["全部", "数据分析", "公告", ""],
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
        const p = scroll.value.scrollTop;
        reqBladeItemData(queryParam)
          .then((res) => {
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
    // let listData = reactive();
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
    //申诉模块，子传父
    const appealpopupcfg = reactive({
      label: "",
      show: false,
      message: "",
      workstation: "",
      itemid: 0,
      btnSub: () => {
        Dialog.confirm({
          title: "确认提交",
          message: "确认提交申诉信息？",
        })
          .then(() => {
            partupBladeItemData({
              id: appealpopupcfg.itemid,
              order_status: 1,
              order_comments:
                "[申诉]" +
                "[" +
                user.value.userinfo.realname +
                "]" +
                appealpopupcfg.message,
            }).then((res) => {
              console.log(res);
              Toast.success({
                message: "提交成功",
                duration: 1000,
                onClose: () => {
                  for (let index = 0; index < listcfg.list.length; index++) {
                    if (listcfg.list[index]["id"] == appealpopupcfg.itemid) {
                      listcfg.list[index]["order_status"] = res.order_status;
                    }
                    appealpopupcfg.show = false;
                  }
                },
              });
            });
          })
          .catch(() => {
            // on cancel
          });
      },
    });
    const receivepickercfg = reactive({
      show: false,
      itemid: 0,
      columns: [],
      click: {
        onConfirm: (val) => {
          const recId = bladeDataCol.value.titleToId[val];
          receivepickercfg.show = false;
          Dialog.confirm({
            title: "确认领取",
            message: "确认领取" + val,
          })
            .then(() => {
              partupBladeItemData({
                id: receivepickercfg.itemid,
                order_status: 4,
                bladetype_received_id: recId,
                receiver_id: user.value.userinfo.userId,
              }).then((res) => {
                console.log(res);
                Toast.success({
                  message: "领取成功",
                  duration: 1000,
                  onClose: () => {
                    for (let index = 0; index < listcfg.list.length; index++) {
                      if (
                        listcfg.list[index]["id"] == receivepickercfg.itemid
                      ) {
                        listcfg.list[index]["order_status"] = res.order_status;
                        listcfg.list[index]["bladetype_received"] =
                          res.bladetype_received;
                        listcfg.list[index]["receiver"] = res.receiver;
                        listcfg.list[index] = res;
                      }
                    }
                    appealpopupcfg.show = false;
                  },
                });
              });
            })
            .catch(() => {
              // on cancel
              receivepickercfg.show = true;
            });
        },
      },
    });
    const selectedid = (data) => {
      switch (data.action) {
        case "appeal":
          appealpopupcfg.workstation = data.workstation.weldinggun_num;
          appealpopupcfg.itemid = data.id;
          appealpopupcfg.show = true;
          break;
        case "receive":
          receivepickercfg.columns = bladeDataCol.value.titleCol;
          receivepickercfg.itemid = data.id;
          receivepickercfg.show = true;
          break;
      }
    };

    const imgpopupcfg = reactive({
      show: false,
      img: "",
    });
    const viewImg = (data) => {
      console.log(data);
      if (data.img != undefined) {
        imgpopupcfg.show = true;
        imgpopupcfg.img = data.img;
      }
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
      queryData,
      selectedid,
      appealpopupcfg,
      receivepickercfg,
      imgpopupcfg,
      viewImg,
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
        overflow-x: hidden;
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
    top: 44px;
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

<template>
  <div id="partsearch">
    <pop-nav-bar
      :navbarcfg="navbarcfg.mainnavbarcfg"
      @onClickLeft="popnavcfg.onClickLeft"
    />
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
    <div class="history">
      <div class="title">
        <p>历史搜索</p>
        <van-icon name="delete-o" size="1.1rem" @click="searchcfg.delete" />
      </div>

      <div class="tag">
        <van-tag
          type="primary"
          round
          size="medium"
          color="var(--van-gray-4)"
          text-color="var(--van-gray-7)"
          v-for="(value, index) in searchcfg.history"
          :key="index"
          @click="searchcfg.search(value)"
          >{{ value }}</van-tag
        >
        <van-divider />
      </div>
    </div>
  </div>
</template>

<script>
import { toRef, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import PopNavBar from "@/components/content/mainnavbar/PopNavBar";
import { Dialog } from "vant";

export default {
  name: "PartSearch",
  components: {
    PopNavBar,
  },
  setup(props, context) {
    //vuex
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.popnavbarcfg = {
      title: "备件-搜索",
      isShow: [true, true, true],
    };
    const search = toRef(store.state, "search");
    // router
    const router = useRouter();
    const route = useRoute();
    const querysearch = () => {
      store.commit("set_history", {
        target: "part",
        data: searchcfg.value,
      });
      if (route.name == "partslist") {
        // console.log(searchcfg.value);
        context.emit("reSearch", searchcfg.value);
      } else {
        router.push({
          name: "partslist",
          params: {
            type: "search",
            search: searchcfg.value,
          },
        });
      }
    };
    //组件配置
    const searchcfg = reactive({
      value: "",
      showAction: false,
      onSearch: () => {
        querysearch();
      },
      onClear: () => {},
      clickInput: () => {
        searchcfg.showAction = true;
      },
      history: search.value.partsearch.history,
      search: (val) => {
        searchcfg.value = val;
        querysearch();
      },
      delete: () => {
        Dialog.confirm({
          title: "确认删除",
          message: "确认清空历史搜索记录？",
        })
          .then(() => {
            store.commit("delete_history", {
              target: "part",
            });
          })
          .catch(() => {
            // on cancel
          });
      },
    });
    const popnavcfg = reactive({
      onClickLeft: () => {
        context.emit("onClickLeft");
      },
    });

    return { searchcfg, popnavcfg, navbarcfg };
  },
};
</script>

<style lang="scss">
#partsearch {
  .van-search {
    padding: 5px 10px;
    // --van-search-input-height: 20px;
    .van-field__control {
      line-height: 22px;
    }
  }
  .history {
    margin: 5px 8px;
    max-height: 50px;
    .title {
      font-size: 14px;
      font-weight: 800;
      display: flex;
      /* 元素垂直居中 */
      align-items: center;
      /* 元素平均分配 */
      justify-content: space-between;
    }
    .tag {
      padding: 8px 10px;
      .van-tag {
        display: inline-block;
        margin: 0 5px 5px 0;
        text-align: center;
      }
    }
  }
}
</style>

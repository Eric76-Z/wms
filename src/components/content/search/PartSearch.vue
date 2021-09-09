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
  </div>
</template>

<script>
import { toRef, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import PopNavBar from "@/components/content/mainnavbar/PopNavBar";

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

    // router
    const router = useRouter();
    //组件配置
    const searchcfg = reactive({
      value: "",
      showAction: false,
      onSearch: () => {
        router.push({
          name: "partslist",
          params: {
            type: "search",
            search: searchcfg.value,
          },
        });
      },
      onClear: () => { },
      clickInput: () => {
        console.log("弹出");
        searchcfg.showAction = true;
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

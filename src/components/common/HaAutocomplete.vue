<template>
  <!-- <van-cell-group>
    <van-field v-model="value" label="文本" placeholder="请输入用户名" />
  </van-cell-group> -->
  <div id="hautocomplete">
    <div class="h-autocomplete-label" @click="test">工位</div>
    <el-autocomplete
      class="inline-input"
      v-model="state.value.state.workstation"
      :popper-append-to-body="false"
      :fetch-suggestions="querySearch"
      placeholder="请输入工位号"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import { reactive, toRef } from "vue";
import { ElAutocomplete } from "element-plus";
import { Field, CellGroup } from "vant";

// import "element-plus/packages/theme-chalk/src/base.scss";
export default {
  name: "HAutocomplete",
  components: {
    ElAutocomplete,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
  },
  emits: ["selected"],
  props: {
    autocompletecfg: {
      type: Object,
    },
  },
  setup(props, context) {
    const autocompletecfg = toRef(props, "autocompletecfg");
    const test = () => {
      console.log(autocompletecfg);
      console.log(autocompletecfg.value.state);
      console.log(state);
    };
    // console.log(toShow);
    const querySearch = (queryString, cb) => {
      console.log(autocompletecfg.value.state);
      // state.value = "";
      var results = queryString
        ? autocompletecfg.value.workstation.filter(createFilter(queryString))
        : autocompletecfg.value.workstation;
      // 调用 callback 返回建议列表的数据
      cb(results);
    };
    const createFilter = (queryString) => {
      return (target) => {
        // console.log(target);
        return (
          target.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    };
    const handleSelect = (item) => {
      context.emit("selected", item);
      console.log(autocompletecfg);
    };

    const state = reactive({
      // value: computed(() => {
      //   return autocompletecfg.value.state;
      // }),
      value: autocompletecfg,
    });

    return {
      state,
      querySearch,
      createFilter,
      handleSelect,
      test,
    };
  },
};
</script>

<style lang="scss">
#hautocomplete {
  position: relative;
  display: flex;
  padding: 10px 16px;
  background-color: #fff;
  .h-autocomplete-label {
    width: 6.2em;
    height: 24px;
    line-height: 24px;
    margin-right: 12px;
    font-size: 14px;
  }
  .inline-input {
    flex: 1;
    height: 24px;
    .el-input {
      height: 24px;
      line-height: 24px;
      .el-input__inner {
        height: 100%;
        line-height: 24px;
        padding: 0;
        border: 0;
      }
    }
  }
}
#hautocomplete::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: var(--van-padding-md);
  bottom: 0;
  left: var(--van-padding-md);
  border-bottom: 1px solid var(--van-cell-border-color);
  transform: scaleY(0.5);
}
</style>

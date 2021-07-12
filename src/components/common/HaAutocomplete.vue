<template>
  <!-- <van-cell-group>
    <van-field v-model="value" label="文本" placeholder="请输入用户名" />
  </van-cell-group> -->
  <div id="hautocomplete">
    <div class="h-autocomplete-label">工位</div>
    <el-autocomplete
      class="inline-input"
      v-model="state2"
      :popper-append-to-body="false"
      :fetch-suggestions="querySearch"
      placeholder="请输入工位号"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
import { ref, onMounted, toRef } from "vue";
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
  props: {
    autocompletecfg: {
      type: Object,
    },
  },
  setup(props) {
    const autocompletecfg = toRef(props, "autocompletecfg");
    const loadAll = autocompletecfg.value.loadAll;
    const toShow = ref([]); //需要显示的内容
    const querySearch = (queryString, cb) => {
      var results = queryString
        ? toShow.value.filter(createFilter(queryString))
        : toShow.value;
      // 调用 callback 返回建议列表的数据
      cb(results);
    };
    const createFilter = (queryString) => {
      return (target) => {
        return (
          target.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    };

    const handleSelect = (item) => {
      console.log(item);
    };
    onMounted(() => {
      toShow.value = autocompletecfg.value.loadAll;
    });
    return {
      toShow,
      state1: ref(""),
      state2: ref(""),
      querySearch,
      createFilter,
      loadAll,
      handleSelect,
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

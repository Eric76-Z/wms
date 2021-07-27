<template>
  <div id="mainfilter">
    <div class="filter-content">
      <div class="filter-location">
        <van-cell-group inset>
          <van-cell title="选择区域" value="内容" />
          <van-cell title="一级地点" value="内容" />
          <van-cell title="二级地点" value="内容" />
          <van-cell title="三级地点" value="内容" />
        </van-cell-group>
      </div>
    </div>
    <div class="filter-operate">
      <van-button square class="reset" type="warning">重置</van-button>
      <van-button square class="confirm" type="success">确认</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainFilter",
  props: {
    mainfiltercfg: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
#mainfilter {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #{$bgcolor-gray-2};
  .filter-content {
    height: calc(100% - 45px);
    .filter-location {
      .van-cell-group {
        margin: 0;
      }
    }
  }
  .filter-operate {
    position: absolute;
    display: flex;
    height: 45px;
    width: 100%;
    bottom: 0;
    text-align: center;
    .reset {
      flex: 1;
    }
    .confirm {
      flex: 1;
    }
  }
}
</style>

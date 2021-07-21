<template>
  <div class="jp-card">
    <div class="jp-card__header">
      <a class="jp-card__thumb">
        <van-image fit="fill" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="jp-card__tag">
          <van-tag type="danger" mark>未完成</van-tag>
        </div>
      </a>
      <div class="jp-card__content">
        <div class="jp-card__top">
          <div class="jp-card__title">
            {{ listdata.location_level_1 }}-{{ listdata.location_level_2 }}-{{
              listdata.location_level_3
            }}--{{ listdata.weldinggun_num }}
          </div>
          <div class="jp-card__desc">
            <van-tag color="#7232dd" plain>申</van-tag>
            {{ listdata.applyblade }}
          </div>
        </div>
        <div class="jp-card__middle">
          <div></div>
        </div>
        <div class="jp-card__bottom"></div>
      </div>
    </div>
    <div class="jp-card__footer"></div>
  </div>
</template>

<script>
import { toRef } from "vue";
export default {
  name: "MainListCard",
  props: {
    listdata: {
      type: Object,
    },
  },
  setup(props) {
    const listdata = toRef(props, listdata);
    console.log(listdata);
    return {};
  },
};
</script>

<style lang="scss">
.jp-card {
  position: relative;
  box-sizing: border-box;
  padding: var(--van-card-padding);
  color: var(--van-card-text-color);
  font-size: var(--van-card-font-size);
  background-color: var(--van-card-background-color);
  .jp-card__header {
    display: flex;
    .jp-card__thumb {
      position: relative;
      flex: none;
      width: var(--van-card-thumb-size);
      height: var(--van-card-thumb-size);
      margin-right: var(--van-padding-xs);
      .van-image {
        width: 100%;
        height: 100%;
      }
      .jp-card__tag {
        position: absolute;
        top: 2px;
        left: -3px;
      }
    }

    .jp-card__content {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      min-width: 0;
      min-height: var(--van-card-thumb-size);
      .jp-card__top {
        .jp-card__title {
          font-size: 16px;
          line-height: 18px;
          font-weight: var(--van-font-weight-bold);
        }
        .jp-card__desc {
          max-height: var(--van-card-desc-line-height);
          color: var(--van-card-desc-color);
          line-height: var(--van-card-desc-line-height);
        }
      }
    }
  }
  .jp-card__footer {
    flex: none;
    text-align: right;
  }
}
</style>

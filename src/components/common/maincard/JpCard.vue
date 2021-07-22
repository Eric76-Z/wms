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
          <div class="jp-card__lt">
            <van-tag color="#7232dd" plain>申</van-tag>
            {{ listdata.applicant }}
          </div>
          <div class="jp-card__rt">
            <van-tag color="#7232dd" plain>领</van-tag>
            {{ listdata.receiver }}
          </div>
        </div>
        <div class="jp-card__bottom">
          始于
          <span class="block">21</span>
          <span class="colon">年</span>
          <span class="block">05</span>
          <span class="colon">月</span>
          <span class="block">03</span>
          <span class="colon">日</span>
          ,过去
          <span class="block">20</span>
          天
        </div>
      </div>
    </div>
    <div class="jp-card__footer">
      <van-button
        square
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        size="mini"
        >放弃</van-button
      >
    </div>
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
    // console.log(listdata);
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
      .jp-card__middle {
        display: flex;
        .jp-card__lt {
          flex: 1;
        }
        .jp-card__rt {
          flex: 1;
        }
      }
      .jp-card__bottom {
        font-size: 12px;
        .block {
          display: inline-block;
          width: 22px;
          color: #fff;
          font-size: 12px;
          text-align: center;
          background-color: #ff976a;
          border-radius: 4px;
          &:last-child {
            background-color: #ee0a24;
          }
        }
        .colon {
          display: inline-block;
          margin: 0 4px;
          color: #ff976a;
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

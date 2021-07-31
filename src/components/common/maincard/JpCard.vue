<template>
  <div class="jp-card">
    <div class="jp-card__header">
      <a class="jp-card__thumb">
        <van-image fit="fill" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="jp-card__tag">
          <van-tag :color="jpcardcfg.data.cardTag.tagColor" mark>{{
            jpcardcfg.data.cardTag.tagText
          }}</van-tag>
        </div>
      </a>
      <div class="jp-card__content">
        <div class="jp-card__top">
          <div class="jp-card__title">
            {{ jpcardcfg.data.title }}
          </div>
          <div class="jp-card__desc">
            <van-tag :color="jpcardcfg.data.descTag.tagColor">{{
              jpcardcfg.data.descTag.tagText
            }}</van-tag>
            {{ listdata.bladetype_apply }}
          </div>
        </div>
        <div class="jp-card__middle">
          <div class="jp-card__lt">
            <van-tag color="#1989fa" plain>申</van-tag>
            {{ listdata.applicant }}
          </div>
          <div class="jp-card__md" v-show="listdata.receiver">
            <van-tag color="#07c160" plain>领</van-tag>
            {{ listdata.receiver }}
          </div>
          <div class="jp-card__rt" v-show="false"></div>
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
import { reactive, computed, ref } from "vue";
export default {
  name: "MainListCard",
  props: {
    listdata: {
      type: Object,
    },
  },
  setup(props) {
    const listData = reactive(props.listdata);
    const descTag = ref();
    console.log(listData);
    const jpcardcfg = reactive({
      data: {
        title:
          listData.localLv1 +
          "-" +
          listData.localLv2 +
          "-" +
          listData.localLv3 +
          "--" +
          listData.weldinggun,
        cardTag: {
          tagText: computed(() => {
            let tagText = "";
            switch (listData.order_status) {
              case 1:
                tagText = "等待审核";
                break;
              case 2:
                tagText = "审核失败";
                break;
              case 3:
                tagText = "等待领取";
                break;
              case 4:
                tagText = "订单完成";
                break;
              default:
                break;
            }
            return tagText;
          }),
          tagColor: computed(() => {
            let tagColor = "";
            switch (listData.order_status) {
              case 1:
                tagColor = "#1989fa";
                break;
              case 2:
                tagColor = "#ee0a24";
                break;
              case 3:
                tagColor = "#ff976a";
                break;
              case 4:
                tagColor = "#07c160";
                break;
              default:
                break;
            }
            return tagColor;
          }),
        },
        descTag: {
          tagText: computed(() => {
            let tag = "";
            listData.order_status in [1, 2, 3] ? (tag = "申") : (tag = "领");
            return tag;
          }),
          tagColor: computed(() => {
            let color = "";
            jpcardcfg.data.descTag.tagText == "申"
              ? (color = "#1989fa")
              : (color = "#07c160");
            return color;
          }),
        },
      },
    });
    return { listData, jpcardcfg, descTag };
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
          font-size: 15px;
          line-height: 17px;
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
        .jp-card__md {
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

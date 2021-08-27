<template>
  <div class="jp-card" v-show="partcardcfg.isShow" @click="clickCard">
    <div class="jp-card__header">
      <a class="jp-card__thumb">
        <van-image
          fit="scale-down"
          :src="partcardcfg.data.img"
          lazy-load
          @click="partcardcfg.data.viewImg"
        />
        <div class="jp-card__tag" v-show="partcardcfg.data.cardTag">
          <van-tag type="danger" mark>常用</van-tag>
        </div>
      </a>
      <div class="jp-card__content">
        <div class="jp-card__top">
          <div class="jp-card__title" style="word-break: break-all">
            {{ partcardcfg.data.title }}
          </div>
          <div class="jp-card__desc">{{ partcardcfg.data.desc }}</div>
        </div>
        <div class="jp-card__device">
          <van-tag
            plain
            type="warning"
            v-for="(item, index) in partcardcfg.data.deviceTag"
            :key="index"
            >{{ item }}</van-tag
          >
        </div>
        <div class="jp-card__tag">
          <van-tag
            plain
            type="warning"
            v-for="(item, index) in listData.tag"
            :key="index"
            >{{ item.tag_name }}</van-tag
          >
        </div>

        <div class="jp-card__middle">
          <div class="item">
            <div class="jp-card__item price">
              <p>￥</p>
              {{ partcardcfg.data.price }}
            </div>
            <div class="jp-card__item">
              <van-tag type="warning">品牌</van-tag>
              {{ partcardcfg.data.brand }}
            </div>
          </div>
          <div class="item">
            <div class="jp-card__item">
              <van-tag type="success">物</van-tag>
              {{ partcardcfg.data.part_num }}
            </div>
            <div
              class="jp-card__item"
              v-show="partcardcfg.data.order_num != ''"
            >
              <van-tag type="primary">订</van-tag
              >{{ partcardcfg.data.order_num }}
            </div>
          </div>
        </div>
        <div class="jp-card__bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref, toRef } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Dialog, Grid, GridItem } from "vant";
import { filters } from "@/common/utils.js";

export default {
  name: "PartCard",
  components: {
    [Dialog.Component.name]: Dialog.Component,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  props: {
    listdata: {
      type: Object,
    },
  },
  setup(props, context) {
    const store = useStore();
    const user = toRef(store.state, "user").value;
    //router
    const router = reactive(useRouter());
    const listData = reactive(props.listdata);
    console.log(listData);
    const descTag = ref();
    const partcardcfg = reactive({
      isShow: true,
      data: {
        title: computed(() => {
          if (listData.my_spec != null) {
            return listData.my_spec;
          } else {
            return listData.setech_spec;
          }
        }),
        img: computed(() => {
          let url = [];
          listData.part_img.length == 0
            ? (url = listData.part_img.img)
            : (url = []);
          return url;
        }),
        cardTag: computed(() => {
          for (const iterator of listData.sort) {
            if (iterator.type_layer == "030101") {
              return "常用";
            }
          }
          return false;
        }),
        deviceTag: computed(() => {
          let ret = [];
          for (const iterator of listData.device_type) {
            if (ret.indexOf(iterator.device_sort.type_name) == -1) {
              ret.push(iterator.device_sort.type_name);
            }
          }
          return ret;
        }),
        viewImg: () => {
          let data = {
            id: listData.id,
            img: partcardcfg.data.img[0],
          };
          context.emit("viewImg", data);
        },
        part_num: computed(() => {
          let part_num = "";
          if (listData.part_num != null) {
            return listData.part_num;
          }
          return part_num;
        }),
        price: computed(() => {
          let price = "";
          if (listData.price != null) {
            return filters.numFilter(listData.price);
          }
          return price;
        }),
        order_num: computed(() => {
          let order_num = "";
          if (listData.order_num != null) {
            return listData.order_num;
          }
          return order_num;
        }),
        brand: computed(() => {
          if (listData.brand != null) {
            return listData.brand.abbreviation;
          }
          return "";
        }),
        time: {},
        appeal: {
          show: computed(() => {
            var reg = new RegExp("[申诉]");
            if (reg.test(listData.order_comments)) {
              return true;
            } else {
              return false;
            }
          }),
          message: computed(() => {
            var reg = new RegExp("[申诉]");
            if (reg.test(listData.order_comments)) {
              return true;
            } else {
              return false;
            }
          }),
        },
      },
      btn: {},
    });
    const clickCard = () => {
      console.log("wwwwwwww");
      router.push({
        name: "partdetail",
        params: {
          partId: listData.id,
        },
      });
    };

    return { listData, partcardcfg, descTag, user, clickCard };
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
        left: -5px;
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
          font-size: 14px;
          line-height: 16px;
          font-weight: 1000px;
          color: #000000;
        }
        .jp-card__desc {
          max-height: var(--van-card-desc-line-height);
          color: var(--van-card-desc-color);
          line-height: var(--van-card-desc-line-height);
        }
      }
      .jp-card__device {
        .van-tag {
          margin-right: 3px;
          font-size: 8px;
          color: rgb(226, 142, 31);
          border-color: rgb(223, 113, 11);
        }
      }
      .jp-card__tag {
        .van-tag {
          margin-right: 3px;
          font-size: 8px;
          color: rgb(114, 50, 221);
          border-color: rgb(114, 50, 221);
        }
      }
      .jp-card__middle {
        display: flex;
        flex-wrap: wrap;
        flex-flow: column;
        .item {
          flex: 1;
          display: flex;
          .jp-card__item {
            flex: 1;
          }
          .price {
            flex: 1;
            color: var(--van-red);
            font-size: 13px;
            p {
              display: inline-block;
              font-size: 8px;
            }
          }
        }
      }
      .jp-card__bottom {
        font-size: 10px;
        .start-time {
          display: block;
          .van-tag {
            margin-left: 10px;
            padding: 0 3px;
          }
        }
        .end-time {
          display: inline-block;
        }
        .duration {
          display: inline-block;
          .van-tag {
            display: inline-block;
            padding: 0 3px;
            border-radius: 4px;
          }
        }
        .time {
          display: inline-block;
          font-size: 10px;
          text-align: center;
          color: #ff976a;
          border-radius: 4px;
        }
      }
    }
  }
  .jp-card__footer {
    flex: none;
    text-align: right;
    .van-button {
      margin-left: 5px;
      height: 26px;
      width: 58px;
      padding: 0 10px;
      border-radius: 6px;
      .van-overlay {
        width: 100%;
      }
      .check-dialog {
        width: 100%;
      }
    }
  }
}
</style>

<template>
  <div id="bladeapply1">
    <div class="list-card">
      <main-list :listcfg="listcfg">
        <slot>
          <van-card
            v-for="(item, index) in listcfg.content"
            :key="index"
            :tag="item.tag"
            :title="item.title"
            :price="item.price"
            :desc="item.desc"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
          >
            <template #footer>
              <van-button
                :to="{ name: 'bladeapply2' }"
                type="success"
                size="mini"
                round
                >点击领用</van-button
              >
            </template>
          </van-card>
        </slot>
      </main-list>
    </div>
  </div>
</template>

<script>
import MainList from "@/components/content/mainlist/MainList";

export default {
  name: "BladeApply1",
  data() {
    return {
      listcfg: {
        content: {
          DPLZ02G: {
            title: "02G刀片",
            desc: "车间最常用的刀片，原装进口......",
            price: "1230",
            tag: "常用",
          },
          DJLZ02G: {
            title: "02G刀片",
            desc: "车间最常用的刀片，原装进口......",
            price: "1230",
          },
          DPCC02G: {
            title: "02G刀片",
            desc: "车间最常用的刀片，原装进口......",
            price: "1230",
          },
          DPFX02G: {
            title: "02G刀片",
            desc: "车间最常用的刀片，原装进口......",
            price: "1230",
          },
          DPYG02G: {
            title: "02G刀片",
            desc: "车间最常用的刀片，原装进口......",
            price: "1230",
          },
        },
      },
    };
  },
  components: {
    MainList,
  },
};
</script>

<style lang="scss">
.list-card {
  width: 100%;
  height: calc(100vh - #{$navbar-height + $tabbar-height});
  overflow: auto;
  .van-card {
    .van-card__content {
      min-height: 10px;
      .van-card__title {
        font-size: 16px;
        line-height: 18px;
        font-weight: 1000px;
      }
    }
  }
}
</style>

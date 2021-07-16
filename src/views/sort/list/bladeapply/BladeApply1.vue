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
                :to="{
                  name: 'bladeapply2',
                  params: { bladeId: index },
                }"
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
// import { toRef } from "vue";
import MainList from "@/components/content/mainlist/MainList";

export default {
  name: "BladeApply1",
  data() {
    return {};
  },
  components: {
    MainList,
  },
  props: {
    listcfg: {
      type: Object,
    },
  },
  setup() {},
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

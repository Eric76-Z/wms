<template>
  <div id="bladeapply1">
    <div class="list-card">
      <main-list :listcfg="listcfg">
        <slot>
          <van-card
            v-for="(item, index) in listcfg"
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
                  params: { bladeId: item.id },
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
import { toRef, reactive, computed } from "vue";
import MainList from "@/components/content/mainlist/MainList";

export default {
  name: "BladeApply1",
  components: {
    MainList,
  },
  props: {
    bladeinfo: {
      type: Object,
    },
  },
  setup(props) {
    const bladeinfo = toRef(props, "bladeinfo");
    const listcfg = reactive([]);
    setTimeout(() => {
      console.log(bladeinfo.value.results);
      for (const iterator of bladeinfo.value.results) {
        console.log(iterator);
        const list = reactive({
          id: iterator.id,
          tag: computed(() => {
            if (iterator.part_num == "TV553514") {
              return "常用";
            } else {
              return " ";
            }
          }),
          title: computed(() => {
            if (iterator.my_spec != null) {
              return iterator.my_spec.split("|")[0];
            }
            return iterator.setech_spec.split("|")[0];
          }),
          price: iterator.price,
          desc: computed(() => {
            if (iterator.my_spec != null) {
              return iterator.my_spec.split("|")[1];
            }
            return iterator.setech_spec.split("|")[1];
          }),
        });
        listcfg.push(list);
      }
    }, 500);

    return {
      listcfg,
    };
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

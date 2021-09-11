<template>
  <van-grid :column-num="gridcfg.columnNum">
    <van-grid-item
      v-for="(item, index) in gridcfg.grid"
      :key="index"
      icon="photo-o"
      :to="item.route"
      v-show="tagcfg.show[index]"
    >
      <van-icon
        class="iconfont"
        class-prefix="icon"
        :name="item.iconText"
      ></van-icon>
      <span class="van-grid-item__text">{{ item.text }}</span>
      <div class="tag">
        <van-tag
          :color="item.tag.color"
          :text-color="item.tag.textColor"
          v-show="item.tag.show"
          >{{ item.tag.text }}</van-tag
        >
      </div>
    </van-grid-item>
  </van-grid>
</template>

<script>
import { reactive, toRef, computed } from "vue";
import { useStore } from "vuex";
import { Grid, GridItem } from "vant";
export default {
  name: "MainGrid",
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  props: {
    gridcfg: {
      type: Object,
    },
  },
  setup(props) {
    const gridcfg = toRef(props, "gridcfg");
    const store = useStore();
    const user = toRef(store.state, "user").value;
    const tagcfg = reactive({
      show: computed(() => {
        let ret = [];
        for (const i of gridcfg.value.grid) {
          if (i.auth == undefined) {
            ret.push(true);
          } else {
            switch (i.auth) {
              case "super":
                if (user.userinfo.isSuper == true) {
                  ret.push(true);
                }
                break;
              default:
                ret.push(false);
                break;
            }
          }
        }
        return ret;
      }),
    });
    return {
      tagcfg,
    };
  },
};
</script>

<style lang="scss" scoped>
.van-grid-item {
  position: relative;
  overflow: hidden;
  .iconfont {
    font-size: 30px;
  }
  .tag {
    width: 80px;
    height: 80px;
    overflow: hidden;
    position: absolute;
    top: -3px;
    right: -3px;
    .van-tag {
      font-size: 10px;
      width: 100%;
      display: inline-block;
      text-align: center;
      position: absolute;
      transform: rotate(45deg);
      left: 15px;
      top: 12px;
      overflow: hidden;
    }
  }
}
</style>

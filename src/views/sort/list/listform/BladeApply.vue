<template>
  <div id="bladeapply">
    <main-nav-bar :navbarcfg="navbarcfg" />

    <router-view></router-view>
    <!-- <div class="list-card">
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
              <van-button type="success" size="mini" round>点击领用</van-button>
            </template>
          </van-card>
        </slot>
      </main-list>
    </div> -->
  </div>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";

export default {
  name: "BladeApply",
  data() {
    return {
      navbarcfg: {
        title: "表单-刀片申请",
        isShow: [true, true, true],
      },
    };
  },
  components: {
    MainNavBar,
  },
};
</script>

<style lang="scss"></style>

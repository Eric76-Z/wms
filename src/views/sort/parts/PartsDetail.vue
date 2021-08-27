<template>
  <div id="partdetail">detail</div>
</template>

<script>
import { toRef } from "vue";
import { useStore } from "vuex";
// import { useRouter } from "vue-router";
export default {
  name: "PartDetail",
  components: {},
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    const user = toRef(store.state, "user");
    console.log(user);
    navbarcfg.value.mainnavbarcfg = {
      title: "分类-备件",
      isShow: [true, true, true],
    };
    return {};
  },
};
</script>

<style lang="scss">
#partslist {
}
</style>

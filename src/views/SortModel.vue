<template>
  <div id="sortmodel">
    <div class="block">
      <el-tree
        :data="eltreecfg.data"
        show-checkbox
        node-key="id"
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <a @click="append(data)"> Append </a>
              <a @click="remove(node, data)"> Delete </a>
            </span>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { toRef, reactive } from "vue";
import { useStore } from "vuex";
import { listSort } from "@/network/sort.js";
import { ElTree } from "element-plus";

export default {
  name: "SortModel",
  components: { ElTree },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "分类设置",
      isShow: [true, true, true],
    };
    const sortlist = reactive([]);
    listSort().then((res) => {
      console.log(res);
      for (const i of res) {
        const Lv1 = parseInt(i.type_layer.substring(0, 2));
        const Lv2 = parseInt(i.type_layer.substring(2, 4));
        const Lv3 = parseInt(i.type_layer.substring(4, 6));
        if (Lv3 == 0) {
          if (Lv2 == 0) {
            sortlist[Lv1 - 1] = {
              id: i.id,
              label: i.type_name,
              children: [],
              type_layer: i.type_layer,
            };
          } else {
            sortlist[Lv1 - 1].children[Lv2 - 1] = {
              id: i.id,
              label: i.type_name,
              children: [],
              type_layer: i.type_layer,
            };
          }
        } else {
          sortlist[Lv1 - 1].children[Lv2 - 1].children[Lv3 - 1] = {
            id: i.id,
            label: i.type_name,
            type_layer: i.type_layer,
          };
        }
      }
    });

    let id = 1000;

    const eltreecfg = reactive({
      data: sortlist,
    });
    console.log(sortlist);
    console.log(eltreecfg.data);

    const append = (data) => {
      console.log(data);
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        data.children = [];
      }
      console.log(data);
      data.children.push(newChild);
    };
    const remove = (node, data) => {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    };
    return { eltreecfg, append, remove, id };
  },
};
</script>

<style lang="scss">
// .van-nav-bar {
//   background-color: $navbar-color;
// }
</style>

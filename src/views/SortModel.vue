<template>
  <div id="sortmodel">
    <div class="block">
      <el-tree
        :data="eltreecfg.data"
        show-checkbox
        node-key="id"
        default-expand-all
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

    listSort().then((res) => {
      console.log(res);
    });
    let id = 1000;
    const eltreecfg = reactive({
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
    });

    const append = (data) => {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!eltreecfg.data.children) {
        data.children = [];
      }
      data.children.push(newChild);
      this.data = [...this.data];
    };

    const remove = (node, data) => {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
      this.data = [...this.data];
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

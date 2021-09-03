<template>
  <div class="white-body-view">
    <el-button type="primary" @click="operatecfg.addNewRecord">新增</el-button>
    <custom-tree
      ref="customTree"
      :tree-data="treecfg.treeData"
      :tree-expand-all="treecfg.treeExpandAll"
      :tree-node-key="treecfg.treeNodeKey"
      @addItem="addTreeItem"
      @deleteItem="deleteTreeItem"
      @editItem="editTreeItem"
    />
    <!-- 地点弹窗 -->
    <tree-dialog
      ref="treeDialog"
      :popupcfg="popupcfg"
      @addData="addData"
      @editData="editData"
    />
  </div>
</template>
<script>
import { reactive, toRef } from "vue";
import { useStore } from "vuex";
import { ElButton } from "element-plus";
import CustomTree from "@/components/content/sortweb/Tree";
import TreeDialog from "@/components/content/sortweb/TreeDialog";
import { listSort } from "@/network/sort.js";
export default {
  components: {
    CustomTree,
    TreeDialog,
    ElButton,
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "分类模块",
      isShow: [true, true, true],
    };
    const treecfg = reactive({
      treeData: [],
      treeExpandAll: false,
      treeNodeKey: "id",
    });
    listSort().then((res) => {
      for (const i of res) {
        const Lv1 = parseInt(i.type_layer.substring(0, 2));
        const Lv2 = parseInt(i.type_layer.substring(2, 4));
        const Lv3 = parseInt(i.type_layer.substring(4, 6));
        if (Lv3 == 0) {
          if (Lv2 == 0) {
            treecfg.treeData[Lv1 - 1] = {
              id: i.id,
              label: i.type_name,
              children: [],
              type_layer: i.type_layer,
            };
          } else {
            treecfg.treeData[Lv1 - 1].children[Lv2 - 1] = {
              id: i.id,
              label: i.type_name,
              children: [],
              type_layer: i.type_layer,
            };
          }
        } else {
          treecfg.treeData[Lv1 - 1].children[Lv2 - 1].children[Lv3 - 1] = {
            id: i.id,
            label: i.type_name,
            type_layer: i.type_layer,
          };
        }
      }
      console.log(treecfg.treeData);
    });
    console.log(treecfg.treeData);
    const operatecfg = reactive({
      // 添加新记录
      addNewRecord: () => {
        // popupcfg.show = true;
        // console.log(popupcfg);
      },
    });

    return {
      treecfg,
      operatecfg,
    };
  },

  methods: {
    // 新增表单数据
    addData(data) {
      // 新增树节点
      this.$refs.customTree.treeAddItem(data);
    },

    // 修改表单数据
    editData(data) {
      // 修改树节点
      this.$refs.customTree.treeEditItem(data);
    },

    // 增加树节点
    addTreeItem(data) {
      // 打开地点弹窗，设置默认父级节点
      this.$refs.placeDialog.openDialog(false, data.id);
    },

    // 删除树节点
    deleteTreeItem(data) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除树节点
          this.$refs.customTree.treeDeleteItem(data);
          // 提示
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 修改树节点
    editTreeItem(data) {
      // 打开地点编辑弹窗
      this.$refs.placeDialog.openDialog(true, data.parentId, data);
    },
  },
};
</script>

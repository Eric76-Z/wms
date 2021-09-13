<template>
  <div class="white-body-view">
    <el-tree
      id="my-tree"
      ref="tree"
      class="tree-view structure-tree"
      :data="treeData"
      highlight-current
      :default-expand-all="treeExpandAll"
      :props="defaultProps"
      check-strictly
      :node-key="treeNodeKey"
      :auto-expand-parent="false"
      :expand-on-click-node="false"
      icon-class="icon icon-arrow-right iconfont"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span class="tooltip">
            <span class="add-f-s-14"
              >{{ data.label }} - {{ data.type_layer }}</span
            >
          </span>
          <div v-if="node.isCurrent == true" class="operation-view">
            <van-icon name="plus" size="18px" @click.stop="handleAdd(data)" />
            <van-icon name="edit" size="18px" @click.stop="handleEdit(data)" />
            <van-icon
              name="delete-o"
              size="18px"
              @click.stop="handleDelete(data)"
            />
          </div>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script>
import { ElTree } from "element-plus";

export default {
  props: {
    // 源数据
    treeData: {
      type: Array,
      default: function () {
        return [];
      },
    },

    // 树节点是否默认展开
    treeExpandAll: {
      type: Boolean,
      default: true,
    },

    // 树节点唯一标识
    treeNodeKey: {
      type: String,
      default: "",
    },
  },
  components: {
    ElTree,
  },

  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
      },
      selectItem: {},
    };
  },

  methods: {
    // 添加新增按钮
    handleAdd(data) {
      this.$emit("addItem", data);
    },

    // 点击删除按钮
    handleDelete(data) {
      this.$emit("deleteItem", data);
    },

    // 点击编辑按钮
    handleEdit(data) {
      this.selectItem = data;
      this.$emit("editItem", JSON.parse(JSON.stringify(data)));
    },

    // ============== 组件内事件 结束=============

    // ============== 父组件回调事件 开始=============

    // 添加新记录，树形列表回显
    treeAddItem(data) {
      this.$refs.tree.append(data, data.parentId);
    },

    // 删除节点
    treeDeleteItem(val) {
      this.$refs.tree.remove(val);
    },

    // 修改记录，树形列表回显
    treeEditItem(val) {
      Object.assign(this.selectItem, val);
      this.selectItem = {};
    },

    // ============== 父组件回调事件 结束=============
  },
};
</script>
<style lang="scss">
.structure-tree {
  .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  #my-tree .el-tree > .el-tree-node {
    min-width: 100%;
    display: inline-block;
  }
  .el-tree-node__content {
    margin-bottom: 10px;
    .custom-tree-node {
      .operation-view {
        display: inline-block;
        padding: 0px 5px;
        margin-left: 35px;
        color: #777777;
        .van-icon {
          display: inline-block;
          padding-right: 10px;
        }
      }
    }
  }
  .tooltip {
    margin-right: 5px;
    font-size: 13px;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
    padding: 4px;
  }

  .small-operation-btn {
    margin: 0px 3px;
  }
}
</style>

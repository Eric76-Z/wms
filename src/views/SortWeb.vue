<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%> <%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
  <head>
    <title>分类管理</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <jsp:include page="/WEB-INF/views/include/newhead.jsp" />
    <style type="text/css">
      .selected {
        background-color: #f1dac7;
      }

      .tree-node {
        font-size: 20px;
      }

      .tree-node .node {
        padding: 10px;
        color: #ca5530;
        cursor: pointer;
      }

      #占位 .chanwei {
        margin-left: 20px;
      }
    </style>
  </head>
  <body class="childrenBody site-block">
    <header class="larry-personal-tit">
      <span>
        <!-- baseCat 将user对应替换 -->
        <c:if test="${empty id}">新增</c:if>
        <c:if test="${not empty id}">修改</c:if>
      </span>
    </header>

    <div class="mainCon" id="app" style="display: none">
      <form id="inputForm" autocomplete="off" method="post">
        <sys:message content="${message}" />

        <div class="layui-form-item">
          <div class="layui-inline">
            <label class="layui-form-label"
              ><font color="red">*</font>分类名称
            </label>
            <div class="layui-input-inline layui-input-inline-one">
              <input
                v-model="cat.name"
                placeholder="请输入分类名称 "
                maxlength="64"
                class="layui-input required"
              />
            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-inline">
            <label class="layui-form-label"
              ><font color="red">*</font>分类类型</label
            >
            <div class="layui-input-inline layui-input-inline-one">
              <input
                v-model="cat.catType"
                placeholder="请输入分类类型"
                maxlength="64"
                class="layui-input required"
              />
            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-inline">
            <label class="layui-form-label">排序</label>
            <div class="layui-input-inline layui-input-inline-one">
              <input
                type="number"
                v-model="cat.doSort"
                placeholder="请输入排序 "
                maxlength="11"
                class="layui-input"
              />
            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-inline">
            <label class="layui-form-label">备注信息 </label>
            <div class="layui-input-inline layui-input-inline-one">
              <textarea
                v-model="cat.remarks"
                placeholder="请输入备注信息 "
                rows="4"
                maxlength="255"
                class="layui-textarea"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="layui-form-item bottom_xf" style="z-index: 9999">
          <div class="layui-input-block input500">
            <button
              type="button"
              class="layui-btn layui-btn-primary"
              onclick="gotoView('${ctx}/base/baseCat/');"
            >
              返回
            </button>
            <button class="layui-btn" type="button" @click="saveData()">
              保存
            </button>
          </div>
        </div>
      </form>

      <div class="layui-row" style="background-color: #f5f5f5">
        <div class="layui-col-md12">
          <div class="layui-card" style="margin: 10px">
            <div class="layui-card-header">树结构</div>
            <div class="layui-card-body">
              <div class="row">
                <div class="layui-col-md5">
                  <tree-root
                    @selectChanged="selectChanged1"
                    :node="cat.treeNode"
                    :selectedNode="[]"
                    :selectedId="0"
                  ></tree-root>
                </div>
                <div class="layui-col-md1">
                  <div style="height: 100px"></div>
                </div>

                <div class="layui-col-md6">
                  <!-- 定义一个容器 -->
                  <div style="height: 70px">
                    <blockquote class="layui-elem-quote" id="btnBar">
                      <div class="layui-btn-group">
                        <!-- 增加 字节点-->
                        <button
                          title="增加子节点"
                          :disabled="selectedNode.id == undefined"
                          :class="{
                            'layui-btn-disabled': selectedNode.id == undefined,
                          }"
                          @click="addnode()"
                          type="button"
                          class="layui-btn layui-btn-sm"
                        >
                          <i class="layui-icon">&#xe654;</i>
                        </button>

                        <!-- 上移 -->
                        <button
                          title="向上移动节点"
                          :disabled="
                            selectedNode.id == undefined ||
                            selectedNode.deep == 0
                          "
                          :class="{
                            'layui-btn-disabled':
                              selectedNode.id == undefined ||
                              selectedNode.deep == 0,
                          }"
                          @click="movenode(-1)"
                          type="button"
                          class="layui-btn layui-btn-sm"
                        >
                          <i class="layui-icon">&#xe619;</i>
                        </button>

                        <!-- 下移 -->
                        <button
                          title="向下移动节点"
                          :disabled="
                            selectedNode.id == undefined ||
                            selectedNode.deep == 0
                          "
                          :class="{
                            'layui-btn-disabled':
                              selectedNode.id == undefined ||
                              selectedNode.deep == 0,
                          }"
                          @click="movenode(1)"
                          type="button"
                          class="layui-btn layui-btn-sm"
                        >
                          <i class="layui-icon">&#xe61a;</i>
                        </button>

                        <!-- 删除选中节点 -->
                        <button
                          title="删除选中节点"
                          :disabled="
                            selectedNode.id == undefined ||
                            selectedNode.deep == 0
                          "
                          :class="{
                            'layui-btn-disabled':
                              selectedNode.id == undefined ||
                              selectedNode.deep == 0,
                          }"
                          type="button"
                          @click="removeNode"
                          class="layui-btn layui-btn-sm"
                        >
                          <i class="layui-icon">&#xe640;</i>
                        </button>
                      </div>
                    </blockquote>
                  </div>
                  <form action="" id="">
                    <div class="layui-form-item">
                      <div class="layui-inline">
                        <label class="layui-form-label">节点名称 </label>
                        <div class="layui-input-inline">
                          <input
                            placeholder="请输入名称 "
                            @blur="inputBlur"
                            v-model="selectedNode.name"
                            maxlength="64"
                            class="layui-input"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div class="layui-col-md12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <jsp:include page="/WEB-INF/views/include/pageJs.jsp" />

    <script type="text/javascript">
      var vueMainCon;
      $(document).ready(function () {
        // 定义一个名为 button-counter 的新组件

        var nodeConfig = {
          props: {
            node: {
              type: Object,
              default: {},
            },
            selectedNode: {
              type: Array,
              default: [],
            },
            selectedId: {
              type: String,
              default: "0",
            },
          },
          data: function () {
            return {
              node: this.node,
              selected: this.selectedNode,
              selectedId: this.selectedId,
            };
          },

          template: `
					  <template>
					  <div class="tree-node" style="padding-left:20px;" >
					  	<div @click.stop="select(node)" class="node" v-bind:class="{selected:node.selected}">
					  		<i @click.stop="expand(node)"  style="float: left; margin: 10px;" v-if="!node.isExpand && node.children!= undefined &&node.children.length != 0" class="layui-icon layui-icon-right"></i>
					  		<i @click.stop="expand(node)"  style="float: left; margin: 10px;" v-if="node.isExpand && node.children!= undefined &&node.children.length != 0" class="layui-icon layui-icon-down"></i>
					  		
					  		<!--选中-->
					  		<span v-if="node.children == undefined || node.children.length==0" style="float: left; margin: 8px;"></span>
					  		<div  @click.stop="select(node)" class="">
								<label @click.stop="select(node)" v-bind:for="node.id"></label>
							</div>
							<span @click.stop="select(node)" v-bind:class="{selected:node.selected}">{{node.name}}</span>
					  		
					  	</div>
					 	<tree-node @selectChanged="selectChanged1" v-if="node.isExpand" v-for="(item,index) in node.children" v-bind:node="item"></tree-node>
					  </div>
					  </template>
					  `,
          methods: {
            clickNode: function (node) {
              console.log(node.id);
            },
            expand: function (node) {
              if (node.isExpand == undefined) {
                node.isExpand = true;
              } else {
                node.isExpand = !node.isExpand;
              }

              this.$forceUpdate();
            },
            select: function (node) {
              node.selected = false;
              if (node.selected == undefined) {
                node.selected = true;
              } else {
                node.selected = !node.selected;
              }

              this.selectedId = node.id;

              if (this.node.deep == 0) {
                // 往父节点抛出事件  最后再外层能接受到事件
                this.$parent.$emit("selectChanged", this.selectedId, node);
              } else {
                // 往上一层抛事件  直到根节点 再往上抛事件
                this.$emit("selectChanged", this.selectedId, node);
              }

              this.$forceUpdate();
            },
            selectChanged1: function (id, node) {
              if (this.node.deep == 0) {
                // 往父节点抛出事件  最后再外层能接受到事件
                this.$parent.$emit("selectChanged", id, node);
              } else {
                // 往上一层抛事件  直到根节点 再往上抛事件
                this.$emit("selectChanged", id, node);
              }
            },
          },
        };

        Vue.component("tree-root", nodeConfig);
        Vue.component("tree-node", nodeConfig);

        layui.use(["layer"], function () {
          window.top.layer.closeAll("loading");
          initData();
        });

        $(window).scroll(function () {
          //开始监听滚动条
          //checkHeight("#btnBar", "#detailForm");
        });
      });

      function initData() {
        var index = window.top.layer.load(1, {
          shade: [0.1, "#fff"],
          //0.1透明度的白色背景
        });
        $.get("${ctx}/base/baseCat/getJson?id=${id}", function (data) {
          Vue.component("v-select", VueSelect.VueSelect);

          $("#app").show();

          vueMainCon = new Vue({
            el: "#app",
            data: {
              cat: data, //{name:'',catType:'',doSort:2,remarks:'ss',treeNode:{id:'aa',isExpand:true,selected:false,name:'aa',deep:0,children:[{id:'aabb',isExpand:true,selected:false,name:'aabb',deep:1,children:[{id:'aabbcc',isExpand:true,selected:false,name:'aabbcc',deep:2,},{id:'aabbcca',isExpand:true,selected:false,name:'aabbcc',deep:2,}]},{id:'asdasd',isExpand:true,selected:true,name:'aabb',deep:1,children:[{id:'qwef',isExpand:true,selected:false,name:'aabbcc',deep:2,}]}]}},
              selectedNode: {},
              clickNodes: [],
            },
            methods: {
              selectChanged1: function (selectedNodes) {
                this.selectedNode.pushAll(selectedNodes);
                this.$forceUpdate();
                console.log("选中:" + this.selectedNode);
              },
              addnode: function () {
                if (vueMainCon.selectedNode.children == undefined) {
                  vueMainCon.selectedNode.children = [];
                }
                var newNode = {
                  id: guid(),
                  isExpand: true,
                  selected: true,
                  name: "请输入名称",
                  deep: vueMainCon.selectedNode.deep + 1,
                  children: [],
                };
                newNode.parent = vueMainCon.selectedNode;
                vueMainCon.selectedNode.children.push(newNode);

                this.clickNodes.push(newNode);

                selectNode(newNode);
              },
              inputBlur: function () {
                var name = $.trim(this.selectedNode.name);
                this.selectedNode.name = name == "" ? "请输入名称" : name;
              },
              removeNode: function () {
                if (vueMainCon.selectedNode.parent != undefined) {
                  var index = vueMainCon.selectedNode.parent.children.indexOf(
                    vueMainCon.selectedNode
                  );
                  if (index >= 0) {
                    vueMainCon.selectedNode.parent.children.splice(index, 1);
                    vueMainCon.selectedNode = {};
                  }
                }
              },
              movenode: function (step) {
                var i = this.selectedNode.parent.children.indexOf(
                  this.selectedNode
                );
                var newPos = i + step;
                if (newPos < 0) {
                  newPos = 0;
                }

                if (newPos + 1 > this.selectedNode.parent.children.length) {
                  newPos = this.selectedNode.parent.children.length - 1;
                }
                var tempOption = this.selectedNode.parent.children[newPos];
                this.$set(
                  this.selectedNode.parent.children,
                  newPos,
                  this.selectedNode.parent.children[i]
                );
                this.$set(this.selectedNode.parent.children, i, tempOption);
                this.$forceUpdate();
              },
            },
            watch: {
              selectedNode: {
                deep: true,
                handler: function (newVal, oldVal) {
                  console.log(newVal, oldVal);
                },
              },
            },
          });

          // 监听事件
          vueMainCon.$on("selectChanged", function (id, node) {
            this.selectedId = id;
            this.$forceUpdate();

            if (vueMainCon.clickNodes.indexOf(node) < 0)
              vueMainCon.clickNodes.push(node);

            selectNode(node);
            console.log("选中的节点标记：" + this.selectedId);
          });

          function selectNode(node) {
            var select = node.selected;

            for (var i = 0; i < vueMainCon.clickNodes.length; i++) {
              vueMainCon.clickNodes[i].selected = false;
            }

            node.selected = select;

            vueMainCon.selectedNode = node;

            vueMainCon.$forceUpdate();
          }

          $.get(
            "${ctx}/base/baseCatNode/getJsonList?catId=${id}",
            function (data) {
              var root = data.shift();
              root.children = findChildrenAndSetParent(data, root);

              for (var i = 0; i < data.length; i++) {
                var node = data[i];
                node.children = findChildrenAndSetParent(data, node);
              }

              vueMainCon.cat.treeNode = root;
              window.top.layer.closeAll();
            }
          );
        });
      }

      // 找到孩子节点 并设置它的父节点
      function findChildrenAndSetParent(arr, parent) {
        var children = [];
        for (var i = 0; i < arr.length; i++) {
          if (parent.id == arr[i].parent.id) {
            children.push(arr[i]);
            arr[i].parent = parent;
          }
        }
        return children;
      }

      // 生成uuid
      function guid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            var r = (Math.random() * 16) | 0,
              v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }
        );
      }

      function saveData() {
        var ret = $("#inputForm").valid();
        if (ret == false) {
          return false;
        }

        var index = window.top.layer.load(1, {
          shade: [0.1, "#fff"],
          //0.1透明度的白色背景
        });

        $.ajax({
          type: "post",
          url: "${ctx}/base/baseCat/saveJson",
          dataType: "json",
          data: JSON.stringify(vueMainCon.cat, handlerSubmitData()),
          contentType: "application/json",
          success: function (data) {
            window.top.layer.closeAll();
            if (data.resultCode == "00100") {
              window.top.layer.msg("提交成功");
              window.location.href = "${ctx}/base/baseCat";
            } else {
              window.top.layer.msg(data.resultMsg);
            }
          },
          fail: function (data) {
            window.top.layer.closeAll();
            window.top.layer.msg("系统异常");
          },
        });
      }

      // 解决循环引用对象造成json序列化问题
      const handlerSubmitData = () => {
        const seen = new WeakSet();
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };
    </script>
  </body>
</html>

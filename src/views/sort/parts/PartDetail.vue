<template>
  <div id="partdetail">
    <div class="partdetail">
      <div class="scroll">
        <main-swiper :swipercfg="swipercfg" />
        <van-cell-group inset>
          <div class="head">
            <div class="title" style="word-break: break-all">
              {{ partdetailcfg.title }}
            </div>
            <div class="store" @click="partdetailcfg.click.addStore">
              <van-icon
                :name="partdetailcfg.icon.store.name"
                :color="partdetailcfg.icon.store.color"
              />
              <p>收藏</p>
            </div>
          </div>
          <div class="price">
            <van-cell :title="partdetailcfg.price" />
          </div>
          <van-cell
            title="备件种类"
            :value="partdetailcfg.part_type"
            is-link
            @click="partdetailcfg.click.pickPartType"
          />

          <van-cell
            title="详细信息"
            :value="partdetailcfg.part_num"
            is-link
            @click="partdetailcfg.click.showPartDetail"
          />
          <!-- <van-cell title="单元格" value="内容" label="描述信息" /> -->
        </van-cell-group>
        <van-cell-group inset>
          <van-collapse v-model="collapsecfg.activeNames">
            <van-collapse-item title="所属设备" name="1">
              <van-cell
                v-for="(item, index) in partdetailcfg.device_type"
                :key="index"
                :value="item"
              />
              <van-button
                type="primary"
                size="mini"
                @click="partdetailcfg.click.editDeviceType"
                >编辑</van-button
              >
            </van-collapse-item>
          </van-collapse>
        </van-cell-group>
      </div>
    </div>
    <van-popup
      v-model:show="popupcfg.show"
      round
      position="bottom"
      :style="popupcfg.style"
    >
      <template #default>
        <!-- 备件详情部分 -->
        <div class="partDetail" v-show="popupcfg.partDetail.show">
          <div class="title">备件详情</div>
          <div class="content">
            <van-cell title="物料号" :value="partdetailcfg.part_num" />
            <van-cell title="型号" :value="partdetail.my_spec" />
            <van-cell title="东仓型号" :value="partdetail.setech_spec" />
            <van-cell title="品牌" :value="partdetail.brand.abbreviation" />
            <van-cell title="订货号" :value="partdetail.order_num" />
            <van-cell title="描述" :value="partdetail.desc" />
            <van-cell title="父备件" :value="partdetail.f_part_id" is-link />
            <van-cell title="分类" :value="partdetailcfg.sort" is-link />
            <van-cell title="标签" :value="partdetailcfg.tag" is-link />
            <van-cell title="备注" :value="partdetail.mark" />
          </div>
        </div>

        <!-- 选择备件种类 -->
        <div class="partType" v-show="popupcfg.partType.show">
          <van-picker
            :title="popupcfg.partType.title"
            :columns="popupcfg.partType.columns"
            @confirm="popupcfg.partType.onConfirm"
            @cancel="popupcfg.partType.onCancel"
            @change="popupcfg.partType.onChange"
          />
        </div>

        <!-- 选择备件所属设备类型 -->
        <div class="deviceType" v-show="popupcfg.deviceType.show">
          <div class="title">编辑所属设备</div>
          <div class="content">
            <van-checkbox-group
              v-model="popupcfg.deviceType.checked"
              v-show="popupcfg.deviceType.show"
            >
              <van-cell-group>
                <van-cell
                  v-for="(item, index) in popupcfg.deviceType.list"
                  clickable
                  :key="item"
                  :title="item"
                  @click="popupcfg.deviceType.toggle(index)"
                >
                  <template #right-icon>
                    <van-checkbox
                      :name="item"
                      :ref="
                        (el) => (popupcfg.deviceType.checkboxRefs[index] = el)
                      "
                      @click.stop
                      @click="popupcfg.deviceType.toggle(index)"
                    />
                  </template>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
          </div>
        </div>
      </template>
    </van-popup>
  </div>
</template>

<script>
import { toRef, reactive, computed, onBeforeUpdate } from "vue";
import MainSwiper from "@/components/content/mainswiper/MainSwiper";
import { useStore } from "vuex";
import {
  partupParts,
  listSortDevice,
  listDevicesType,
} from "@/network/sort.js";

export default {
  name: "PartDetail",
  components: {
    MainSwiper,
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    const user = toRef(store.state, "user");
    const partdetail = toRef(store.state, "temp").value.partdetail;
    navbarcfg.value.mainnavbarcfg = {
      title: "备件-详情",
      isShow: [true, true, true],
    };

    const swipercfg = reactive({
      images: [
        "https://www.kuka.com/-/media/kuka-corporate/images/products/robots/kuka-industrieroboter-2020.jpg?rev=e171cda184c04682ac4afa44958bd6b7&w=767&hash=536DC432A7A64179E6A6A734D61B0728",
        "https://www.kuka.com/-/media/kuka-corporate/images/products/robots/kr-delta/kr-delta_kv.jpg?rev=-1&w=767&hash=484B82F1CE4C775E6B692F901FEB2BC2",
        "http://nimak.cn/static/kindeditor/attached/image/20180827/20180827161937_78354.jpg",
      ],
    });

    listSortDevice().then((res) => {
      popupcfg.originData = res.results;
    });
    const partdetailcfg = reactive({
      userIdList: computed(() => {
        let ret = [];
        for (const user of partdetail.users) {
          ret.push(user.id);
        }
        return ret;
      }),
      deviceTypeIdList: computed(() => {
        let ret = [];
        for (const deviceType of partdetail.device_type) {
          ret.push(deviceType.id);
        }
        return ret;
      }),
      title: computed(() => {
        if (partdetail.my_spec != null) {
          return partdetail.my_spec;
        } else {
          return partdetail.setech_spec;
        }
      }),
      part_num: computed(() => {
        let part_num = "";
        if (partdetail.part_num != null) {
          return partdetail.part_num;
        }
        return part_num;
      }),
      part_type: computed(() => {
        let ret = [];
        partdetail.sort.forEach((e) => {
          if (e.type_layer.substring(0, 2) == "02") {
            ret.push(e.type_name);
          }
        });
        return ret.join("；");
      }),
      device_type: computed(() => {
        let ret = [];
        if (partdetail.device_type == null) {
          ret = [];
        } else {
          partdetail.device_type.forEach((e) => {
            ret.push(e.device_sort.type_name + "|" + e.parameter_1);
          });
        }
        return ret;
      }),

      sort: computed(() => {
        let ret = [];
        partdetail.sort.forEach((e) => {
          if (e.type_layer.substring(0, 2) == "02") {
            ret.push(e.type_name);
          }
        });
        return ret.join("；");
      }),
      tag: computed(() => {
        let ret = [];
        partdetail.tag.forEach((e) => {
          ret.push(e.tag_name);
        });
        return ret.join("；");
      }),
      price: computed(() => {
        let ret = "";
        if (partdetail.price == null) {
          ret = "";
        } else {
          ret = "￥ " + partdetail.price;
        }
        if (partdetail.unit != null) {
          ret = "￥ " + partdetail.price + "/" + partdetail.unit;
        }
        return ret;
      }),
      icon: {
        store: {
          name: computed(() => {
            if (
              partdetailcfg.userIdList.indexOf(user.value.userinfo.userId) != -1
            ) {
              return "star";
            } else {
              return "star-o";
            }
          }),
          color: computed(() => {
            if (partdetailcfg.icon.store.name == "star") {
              return "#f2140c";
            } else {
              return "#000";
            }
          }),
        },
      },
      click: {
        addStore: () => {
          if (partdetailcfg.icon.store.name == "star") {
            partdetailcfg.userIdList.splice(
              partdetailcfg.userIdList.indexOf(user.value.userinfo.userId),
              1
            );
          } else {
            partdetailcfg.userIdList.push(user.value.userinfo.userId);
          }
          partupParts({
            id: partdetail.id,
            action: "users",
            users: partdetailcfg.userIdList,
          }).then((res) => {
            const payload = {
              target: "partdetail",
              data: res,
            };
            store.commit("change_temp", payload);
            partdetail.users = res.users;
          });
        },
        showPartDetail: () => {
          popupcfg.style.height = "80%";
          popupcfg.show = true;
          popupcfg.partDetail.show = true;
          popupcfg.partType.show = false;
          popupcfg.deviceType.show = false;
        },
        pickPartType: () => {
          popupcfg.style.height = "40%";
          popupcfg.show = true;
          popupcfg.partDetail.show = false;
          popupcfg.partType.show = true;
          popupcfg.deviceType.show = false;
        },
        editDeviceType: () => {
          popupcfg.style.height = "80%";
          popupcfg.show = true;
          popupcfg.partDetail.show = false;
          popupcfg.partType.show = false;
          popupcfg.deviceType.show = true;

          let cur_type_layer = "";
          for (const i of popupcfg.originData) {
            if (i.type_name == partdetailcfg.part_type) {
              cur_type_layer = i.type_layer;
            }
          }
          listDevicesType({
            device_sort__type_layer: cur_type_layer,
          }).then((res) => {
            popupcfg.deviceType.list = [];
            popupcfg.deviceType.checked = [];
            popupcfg.deviceType.parameter1toid = {};
            res.forEach((e) => {
              if (
                partdetailcfg.device_type.indexOf("机器人|" + e.parameter_1) !=
                -1
              ) {
                popupcfg.deviceType.checked.push(e.parameter_1);
              }
              popupcfg.deviceType.list.push(e.parameter_1);
              popupcfg.deviceType.parameter1toid[e.parameter_1] = e.id;
            });
          });
        },
      },
    });
    const popupcfg = reactive({
      partDetail: {
        show: false,
      },
      partType: {
        title: "",
        show: false,
        columns: computed(() => {
          let ret = [];
          for (const i of popupcfg.originData) {
            if (i.type_layer != "020000") {
              ret.push(i.type_name + "-" + i.type_layer);
            }
          }
          return ret;
        }),
        onConfirm: (val) => {
          let t = val.split("-");
          let sort_id = 0;
          for (const i of popupcfg.originData) {
            console.log(i);
            if (i.type_layer == t[1]) {
              sort_id = i.id;
            }
          }
          partupParts({
            id: partdetail.id,
            action: "sorts_device",
            sort_id: sort_id,
          }).then((res) => {
            console.log(res);
            partdetail.sort = res.sort;
            popupcfg.show = false;
          });
        },
        onCancel: () => {
          popupcfg.show = false;
        },
        onChange: () => {},
      },
      deviceType: {
        checked: [],
        checkboxRefs: [],
        parameter1toid: {},
        list: ["a", "b"],
        toggle: (index) => {
          let curr_checked_name = popupcfg.deviceType.checkboxRefs[index].name;
          // console.log(index);
          // console.log(popupcfg.deviceType.checked);
          // console.log(popupcfg.deviceType.checkboxRefs[index]);
          // console.log(popupcfg.deviceType.parameter1toid);
          // console.log(partdetailcfg.deviceTypeIdList);
          // console.log(popupcfg.deviceType.parameter1toid[curr_checked_name]);
          let curr_checked_index = partdetailcfg.deviceTypeIdList.indexOf(
            popupcfg.deviceType.parameter1toid[curr_checked_name]
          );
          if (curr_checked_index != -1) {
            partdetailcfg.deviceTypeIdList.splice(curr_checked_index, 1);
          } else {
            partdetailcfg.deviceTypeIdList.push(
              popupcfg.deviceType.parameter1toid[curr_checked_name]
            );
          }
          partupParts({
            id: partdetail.id,
            action: "device_type",
            device_types: partdetailcfg.deviceTypeIdList,
          }).then((res) => {
            const payload = {
              target: "partdetail",
              data: res,
            };
            store.commit("change_temp", payload);
            partdetail.device_type = res.device_type;
          });
          popupcfg.deviceType.checkboxRefs[index].toggle();
        },
      },
      originData: [],
      style: {
        height: "40%",
      },
      show: false,
    });
    onBeforeUpdate(() => {
      popupcfg.partType.checkboxRefs = [];
    });
    const collapsecfg = reactive({
      activeNames: [],
    });

    return {
      swipercfg,
      partdetailcfg,
      popupcfg,
      partdetail,
      collapsecfg,
    };
  },
};
</script>

<style lang="scss">
#partdetail {
  .partdetail {
    // position: relative;
    width: 100%;
    height: calc(100vh - #{$navbar-height + $tabbar-height});
    overflow: auto;
    // overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* ios5+ */
    .scroll {
      margin-bottom: 30px;
      .van-cell-group {
        margin: 8px 10px;
        .head {
          display: flex;
          position: relative;
          padding: 10px 16px;
          min-height: 30px;
          .title {
            flex: 10;
            font-size: 16px;
            font-weight: 700;
            line-height: 21px;
          }
          .store {
            flex: 1;
            margin-left: 10px;
            border-left: 1px solid #ddd;
            .van-icon {
              padding: 0 12px;
              font-size: 20px;
            }
            p {
              padding-left: 9px;
            }
          }
        }
        .price {
          .van-cell {
            font-size: 18px;
            font-weight: 700;
            color: var(--van-red);
          }
        }
        .van-collapse {
          .van-collapse-item {
            .van-collapse-item__wrapper {
              .van-collapse-item__content {
                .van-cell__title {
                  flex: 0;
                }
                .van-button {
                  margin: 5px 0;
                  float: right;
                }
              }
            }
          }
        }
      }
    }
  }

  .van-popup {
    .partDetail {
      .title {
        padding: 5px 5px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        color: var(--van-gray-7);
      }
      .content {
        height: calc(100% - 54px);
        overflow: auto;
        padding: 10px 0;
        .van-cell {
          .van-cell__title {
            flex: 1;
            font-size: 12px;
          }
          .van-cell__value {
            flex: 4;
            text-align: left;
          }
        }
      }
    }
    .deviceType {
      height: 100%;

      .title {
        padding: 5px 5px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        color: var(--van-gray-7);
        height: 25px;
      }
      .content {
        height: calc(100% - 35px);
        overflow: hidden;
        overflow-y: auto;
      }
    }
  }
}
</style>

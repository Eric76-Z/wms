<template>
  <div id="partdetail">
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
        title="详细信息"
        :value="partdetailcfg.part_num"
        is-link
        @click="partdetailcfg.click.showpopup"
      />
      <!-- <van-cell title="单元格" value="内容" label="描述信息" /> -->
    </van-cell-group>
    <van-popup
      v-model:show="popupcfg.show"
      round
      position="bottom"
      :style="{ height: '80%' }"
    >
      <template #default>
        <div class="title">备件详情</div>
        <div class="content">
          <van-cell title="物料号" :value="partdetailcfg.part_num" />
          <van-cell title="型号" :value="partdetail.my_spec" />
          <van-cell title="东仓型号" :value="partdetail.setech_spec" />
          <van-cell title="品牌" :value="partdetail.brand.abbreviation" />
          <van-cell title="订货号" :value="partdetail.order_num" />
          <van-cell title="描述" :value="partdetail.desc" />
          <van-cell title="所属设备" :value="partdetailcfg.device_type" />
          <van-cell title="父备件" :value="partdetail.f_part_id" />
          <van-cell title="分类" :value="partdetailcfg.sort" />
          <van-cell title="标签" :value="partdetailcfg.tag" />
          <van-cell title="备注" :value="partdetail.mark" />
          <van-cell title="描述" :value="partdetail.desc" />
          <van-cell title="所属设备" :value="partdetailcfg.device_type" />
          <van-cell title="父备件" :value="partdetail.f_part_id" />
          <van-cell title="分类" :value="partdetailcfg.sort" />
          <van-cell title="标签" :value="partdetailcfg.tag" />
          <van-cell title="备注" :value="partdetail.mark" />
        </div>
      </template>
    </van-popup>
  </div>
</template>

<script>
import { toRef, reactive, computed } from "vue";
import MainSwiper from "@/components/content/mainswiper/MainSwiper";
import { useStore } from "vuex";
import { partupParts } from "@/network/sort.js";

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
    console.log(user);
    console.log(partdetail);
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

    const partdetailcfg = reactive({
      userIdList: computed(() => {
        let ret = [];
        for (const user of partdetail.users) {
          ret.push(user.id);
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
      device_type: computed(() => {
        let ret = [];
        partdetail.sort.forEach((e) => {
          if (e.f_type_id == 11) {
            ret.push(e.type_name);
          }
        });
        return ret.join("；");
      }),
      sort: computed(() => {
        let ret = [];
        partdetail.sort.forEach((e) => {
          if (e.f_type_id != 11) {
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
            users: partdetailcfg.userIdList,
          }).then((res) => {
            console.log(res);
            const payload = {
              target: "partdetail",
              data: res,
            };
            store.commit("change_temp", payload);
            partdetail.users = res.users;
          });
        },
        showpopup: () => {
          popupcfg.show = true;
        },
      },
    });
    const popupcfg = reactive({
      show: false,
    });
    return { swipercfg, partdetailcfg, popupcfg, partdetail };
  },
};
</script>

<style lang="scss">
#partdetail {
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
  }
  .van-popup {
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
}
</style>

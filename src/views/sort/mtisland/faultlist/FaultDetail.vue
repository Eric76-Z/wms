<template>
  <div id="faultdetail">
    <van-collapse v-model="collapsecfg.activeNames">
      <van-collapse-item name="1">
        <template #title>
          <div>基本信息 <van-icon name="question-o" /></div>
        </template>
        <template #value>
          <div>{{ collapsecfg.basic.title }}</div>
        </template>
        <template #default>
          <div class="row">
            <div class="lf">
              <label>故障类型：</label>
              {{ collapsecfg.basic.sort }}
            </div>
            <div class="rt">
              <label>故障设备：</label>
              {{ collapsecfg.basic.device_type }}
            </div>
          </div>
          <div class="row">
            <div class="lf">
              <label>车型：</label>
              {{ collapsecfg.basic.car_model }}
            </div>
            <div class="rt">
              <label>上传人：</label>
              {{ collapsecfg.basic.applicant }}
            </div>
          </div>
          <div class="row time">
            <div class="lf">
              <label>开始：</label>
              {{ collapsecfg.basic.createTime }}
            </div>
            <div class="rt">
              <label>历时：</label>
              {{ collapsecfg.basic.duration }} min
            </div>
          </div>
          <div class="row">
            <div class="lf">
              <label>主修：</label>
              张三；李四；王五
            </div>
            <div class="rt">
              <label>状态：</label>
              {{ collapsecfg.basic.faultState }}
            </div>
          </div>
        </template>
      </van-collapse-item>
      <van-collapse-item title="故障描述" name="2">
        <p style="white-space: pre-wrap">
          {{ collapsecfg.record.maintenance_record }}
        </p>
      </van-collapse-item>
      <van-collapse-item title="经验总结" name="3">
        <div class="add">
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="tianjia"
            @click="collapsecfg.click.addSummary"
            v-show="!collapsecfg.summary.isAdd"
            v-if="
              collapsecfg.summary.experience_summary == null &&
              collapsecfg.summary.isEdit == 0
            "
          ></van-icon>
          <van-cell-group inset v-show="collapsecfg.summary.isEdit">
            <van-field
              v-model="collapsecfg.summary.title"
              label="标题"
              placeholder="请输入标题"
            />
            <van-field
              v-model="collapsecfg.summary.experience_summary.body"
              rows="5"
              autosize
              label="正文"
              type="textarea"
              maxlength="1000"
              placeholder="请输入经验总结"
              show-word-limit
            />
          </van-cell-group>
        </div>
        <div
          v-if="
            collapsecfg.summary.experience_summary != null &&
            collapsecfg.summary.isEdit == 0
          "
        >
          <h2 style="text-align: center">
            {{ collapsecfg.summary.experience_summary.title }}
          </h2>
          <p style="white-space: pre-wrap">
            {{ collapsecfg.summary.experience_summary.body }}
          </p>
        </div>
        <van-button
          type="success"
          size="small"
          block
          @click="collapsecfg.click.operate"
          >{{ collapsecfg.click.btnVal }}</van-button
        >
      </van-collapse-item>

      <!-- <van-collapse-item title="经验总结" name="4">内容</van-collapse-item> -->
    </van-collapse>
  </div>
</template>

<script>
// import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
// import MainGrid from "@/components/content/maingrid/MainGrid";
import { reactive, toRef, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {
  readMaintenanceRecords,
  partupMaintenanceRecords,
} from "@/network/sort.js";
import { formatDate } from "@/common/utils";

export default {
  name: "FaulyDetail",
  props: {
    faultdetail: {
      type: Object,
    },
  },
  components: {},
  setup(props) {
    const store = useStore();
    const user = toRef(store.state, "user").value;
    const faultdetail = toRef(props, "faultdetail");
    console.log(faultdetail);
    const route = reactive(useRoute());

    const maintenceItem = reactive({
      data: {},
    });
    readMaintenanceRecords({
      id: route.params["maintenanceId"],
    }).then((res) => {
      console.log(res);
      maintenceItem.data = res;
    });
    const collapsecfg = reactive({
      id: computed(() => {
        return maintenceItem.data.id;
      }),
      activeNames: [1],
      basic: {
        title: computed(() => {
          let title = "";
          if (maintenceItem.data.localLv1 != undefined) {
            title =
              maintenceItem.data.localLv1 +
              "-" +
              maintenceItem.data.localLv2 +
              "-" +
              maintenceItem.data.localLv3 +
              "-" +
              maintenceItem.data.workstation;
          }

          return title;
        }),
        sort: computed(() => {
          return maintenceItem.data.sort;
        }),
        device_type: computed(() => {
          return maintenceItem.data.device_type;
        }),
        car_model: computed(() => {
          return maintenceItem.data.car_model;
        }),
        applicant: computed(() => {
          return (
            maintenceItem.data.applicant.last_name +
            maintenceItem.data.applicant.first_name
          );
        }),
        createTime: computed(() => {
          return formatDate.format2(maintenceItem.data.create_time);
        }),
        duration: computed(() => {
          // console.log(listData.duration);
          return maintenceItem.data.duration;
        }),
        faultState: computed(() => {
          if (maintenceItem.data.maintenance_status == 1) {
            return "完全修复";
          } else {
            return "临时修复";
          }
        }),
      },
      record: {
        maintenance_record: computed(() => {
          return maintenceItem.data.maintenance_record;
        }),
      },
      summary: {
        experience_summary: computed(() => {
          if (
            maintenceItem.data.experience_summary == null ||
            maintenceItem.data.experience_summary == ""
          ) {
            return null;
          } else {
            return maintenceItem.data.experience_summary;
          }
        }),
        message: computed({
          get: () => {
            if (collapsecfg.summary.experience_summary == null) {
              return "";
            } else {
              return collapsecfg.summary.experience_summary.body;
            }
          },
          set: (val) => {
            collapsecfg.summary.experience_summary.body = val;
          },
        }),
        title: computed({
          get: () => {
            if (collapsecfg.summary.experience_summary == null) {
              return "";
            } else {
              return collapsecfg.summary.experience_summary.title;
            }
          },
          set: (val) => {
            collapsecfg.summary.experience_summary.title = val;
          },
        }),
        // messageVal: "",
        // titleVal: "",
        isEdit: 0,
      },
      click: {
        btnVal: computed(() => {
          if (
            collapsecfg.summary.experience_summary != null &&
            collapsecfg.summary.isEdit == 0
          ) {
            return "编辑";
          } else {
            return "提交";
          }
        }),
        addSummary: () => {
          console.log(maintenceItem);
          collapsecfg.summary.isEdit = !collapsecfg.summary.isEdit;
        },
        operate: () => {
          if (collapsecfg.click.btnVal == "提交") {
            partupMaintenanceRecords({
              id: collapsecfg.id,
              userId: user.userinfo.userId,
              title: collapsecfg.summary.experience_summary.title,
              experience_summary: collapsecfg.summary.experience_summary.body,
            }).then((res) => {
              console.log(res);
              maintenceItem.data = res;
              collapsecfg.summary.isEdit = 0;
            });
          } else if (collapsecfg.click.btnVal == "编辑") {
            // collapsecfg.summary.messageVal = collapsecfg.summary.message;
            // collapsecfg.summary.titleVal = collapsecfg.summary.title;
            collapsecfg.summary.isEdit = 1;
          }
        },
      },
    });
    return {
      collapsecfg,
    };
  },
};
</script>

<style lang="scss">
#faultdetail {
  position: relative;
  height: calc(100vh - #{$tabbar-height + $navbar-height});
  overflow: auto;
  .van-collapse {
    .van-collapse-item {
      .van-cell__value {
        flex: 2;
      }
    }
    .van-collapse-item__wrapper {
      .van-collapse-item__content {
        padding: 6px, 8px;
        font-size: 12px;
        .row {
          display: flex;
          .lf {
            flex: 1;
          }
          .rt {
            flex: 1;
          }
        }
        .time {
          display: flex;
          .lf {
            flex: 5;
          }
          .rt {
            flex: 3;
          }
        }
      }
      .add {
        text-align: center;
        .iconfont {
          font-size: 38px;
        }
        &::before {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 2px;
          background: repeating-linear-gradient(
            -45deg,
            #ff6c6c 0,
            #ff6c6c 20%,
            transparent 0,
            transparent 25%,
            var(--van-primary-color) 0,
            var(--van-primary-color) 45%,
            transparent 0,
            transparent 50%
          );
          background-size: 80px;
          content: "";
        }
      }
    }
  }
}
</style>

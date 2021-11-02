<template>
  <div id="emsfaultrecord">
    <van-form @submit="formData.onSubmit">
      <van-cell-group inset>
        <!-- <van-field name="localLv1" label="车间">
          <template #input>
            <van-radio-group v-model="formData.localLv1" direction="horizontal">
              <van-radio name="CPH2.1">CPH2.1</van-radio>
              <van-radio name="CPH2.2">CPH2.2</van-radio>
            </van-radio-group>
          </template>
        </van-field> -->
        <van-field
          v-model="formData.CarModel.value"
          readonly
          clickable
          required
          name="car_model"
          label="车型"
          placeholder="选择发生故障时车型......"
          @click="formData.CarModel.showPicker = true"
          :rules="[{ required: true, message: '请填写车型' }]"
        />
        <van-field name="localLv2" label="区域">
          <template #input>
            <van-radio-group v-model="formData.localLv2" direction="horizontal">
              <van-radio name="ST">侧围</van-radio>
              <van-radio name="AB">总拼</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="localLv3" label="小区">
          <template #input>
            <van-radio-group v-model="formData.localLv3" direction="horizontal">
              <van-radio name="维修区">维修区</van-radio>
              <van-radio name="9米平台区">9米平台区</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="formData.NGCar.data"
          name="ng_car"
          label="NG小车"
          placeholder="请输入NG小车号码"
          type="digit"
          :rules="[
            { required: true, message: '请输入NG小车号码' },
            {
              pattern: formData.NGCar.pattern,
              message: '小车号在1-50之间',
            },
          ]"
        />
        <van-field
          v-model="formData.closingDate.data"
          is-link
          readonly
          name="closing_date"
          label="节点"
          placeholder="点击选择日期"
          @click="formData.closingDate.showCalendar = true"
        />
        <van-field
          v-model="formData.MaintenanceRecord"
          name="maintenance_record"
          required
          rows="5"
          autosize
          label="故障记录"
          type="textarea"
          maxlength="250"
          placeholder="请输入故障记录......"
          show-word-limit
          :rules="[{ required: true, message: '请填写故障记录' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-popup v-model:show="formData.CarModel.showPicker" position="bottom">
      <van-picker
        title="选择车型"
        :columns="formData.CarModel.columns"
        @confirm="formData.CarModel.onConfirm"
        @cancel="formData.CarModel.showPicker = false"
      />
    </van-popup>
    <van-calendar
      v-model:show="formData.closingDate.showCalendar"
      :show-confirm="false"
      @confirm="formData.closingDate.onConfirm"
    />
  </div>
</template>

<script>
import { reactive, toRef } from "vue";
import { useStore } from "vuex";
import { carModel } from "@/common/constant.js";
import { createEmsMaintenanceRecords } from "@/network/sort.js";
import { Toast } from "vant";

// import { formatDate } from "@/common/utils";
export default {
  name: "EmsFaultRecord",
  components: {},
  setup() {
    //vuex数据
    const store = useStore();
    const user = toRef(store.state, "user");
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "EMS-小车故障记录",
      isShow: [true, true, true],
    };
    const formData = reactive({
      localLv1: "CPH2.1",
      localLv2: "ST",
      localLv3: "维修区",
      NGCar: {
        data: "",
        pattern: /(^[1-9]$)|(^[1-4][0-9]$)|(^[5][0]$)/,
      },
      CarModel: {
        value: "",
        showPicker: false,
        onConfirm: (value) => {
          // console.log(value);
          formData.CarModel.value = value[1];
          formData.localLv1 = value[0]["text"];
          formData.CarModel.showPicker = false;
        },
        columns: carModel,
      },
      closingDate: {
        data: "",
        showCalendar: false,
        formatDate: (date) =>
          `${date.getYear() + 1900}/${date.getMonth() + 1}/${date.getDate()}`,
        onConfirm: (date) => {
          console.log(date.getYear() + 1900);
          formData.closingDate.data = formData.closingDate.formatDate(date);
          formData.closingDate.showCalendar = false;
        },
      },
      MaintenanceRecord: "",
      onSubmit: (values) => {
        values.localLv1 = formData.localLv1;
        values.applicant_id = user.value.userinfo.userId;
        values.order_status = 1;
        createEmsMaintenanceRecords(values)
          .then(() => {
            Toast.success({
              message: "提交成功",
              duration: 1000,
              onClose: () => {
                // 命名的路由，并加上参数，让路由建立 url
                // router.push({ name: "bladedetail" });
                console.log("跳转详情");
              },
            });
          })
          .catch(() => {
            Toast.fail({
              message: "提交失败，请重新检查表单",
              duration: 1000,
            });
          });
        console.log(values);
      },
    });
    return {
      formData,
    };
  },
};
</script>

<style lang="scss">
// #emsfaultrecord {
// }
</style>

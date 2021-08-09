<template>
  <div id="bladeapply2">
    <h-autocomplete
      v-model="formData.weldinggunnum"
      :autocompletecfg="autocompletecfg"
      @selected="selected"
    />
    <van-form @submit="formData.onSubmit">
      <van-field
        readonly
        required
        v-model="formData.MyLocation"
        name="MyLocation"
        label="区域"
      />
      <van-field
        v-model="popupcfg.state.value"
        readonly
        clickable
        required
        name="BladeType"
        label="刀片类型"
        placeholder="点击选择要申请的刀片类型......"
        @click="popupcfg.state.showPicker = true"
      />
      <van-field
        v-model="formData.repair_order_num"
        required
        type="digit"
        name="repair_order_num"
        label="维修单编号"
        placeholder="请输入维修单编号......"
        :rules="[{ required: true, message: '请填写区域' }]"
      />
      <van-field
        v-model="formData.cycle_num"
        type="digit"
        name="cycle_num"
        label="修磨圈数"
        placeholder="请输入修磨圈数......"
        :rules="[{ required: true, message: '请输入修磨圈数' }]"
      />
      <van-field
        v-model="formData.pressure"
        type="number"
        name="pressure"
        label="修磨压力"
        placeholder="请输入修磨压力......"
        :rules="[{ required: true, message: '请输入修磨压力' }]"
      />
      <van-field
        v-model="formData.order_comments"
        name="order_comments"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="请输入备注......"
        show-word-limit
      />
      <div style="margin: 16px">
        <van-button round block type="success" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <van-popup v-model:show="popupcfg.state.showPicker" position="bottom">
      <van-picker
        :columns="popupcfg.columns"
        @confirm="popupcfg.onConfirm"
        @cancel="popupcfg.state.showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { onActivated, reactive, toRef, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { Form, Field, Picker, Popup, Toast } from "vant";
import HAutocomplete from "@/components/common/HaAutocomplete";
import { createBladeItemData } from "@/network/sort.js";
// import LoginVue from "../../../profile/Login.vue";
export default {
  name: "BladeApply2",
  data() {},
  components: {
    HAutocomplete,
    [Form.name]: Form,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  props: {
    bladeinfo: {
      type: Object,
    },
  },
  setup(props) {
    //vuex数据
    const store = useStore();
    const location = toRef(store.state, "location");
    const {
      getLocation: [getLocation],
    } = store._actions;
    //route
    const route = reactive(useRoute());
    const router = reactive(useRouter());
    //props
    const bladeinfo = toRef(props, "bladeinfo");
    //表单相关数据
    const formData = reactive({
      weldinggunnum: "",
      MyLocation: "",
      selectedBladeId: route.params["bladeId"],
      repair_order_num: "",
      cycle_num: "",
      pressure: "",
      order_comments: "",
      //提交表单
      onSubmit: (values) => {
        values.weldinggunnum = formData.weldinggunnum;
        values.bladetype_apply_id = formData.selectedBladeId;
        values.order_status = 1;
        createBladeItemData(values).then(() => {
          // console.log(res);
          Toast.success({
            message: "提交成功",
            duration: 1000,
            onClose: () => {
              // 命名的路由，并加上参数，让路由建立 url
              router.push({ name: "bladedetail" });
            },
          });
        });
        console.log("submit", values);
      },
    });
    const popupcfg = reactive({
      //刀片类型选择器
      columns: [],
      state: {
        value: "",
        showPicker: false,
      },
      //点击确定按钮触发
      onConfirm: (value) => {
        // console.log(value);
        for (const iterator of bladeinfo.value) {
          console.log(iterator.my_spec.indexOf(value));
          if (iterator.my_spec.indexOf(value) != -1) {
            formData.selectedBladeId = iterator.id;
          }
        }
        popupcfg.state.value = value;
        popupcfg.state.showPicker = false;
      },
    });
    //autocomplete相关数据
    const autocompletecfg = reactive({
      workstation: computed(() => {
        return location.value["weldinggun"];
      }),
      state: formData,
    });

    //autocomplete 选择后赋值
    const selected = (val) => {
      formData.weldinggunnum = val.value;
      formData.MyLocation = val.area;
      return true;
    };

    onActivated(() => {
      console.log(bladeinfo);
      for (let i of bladeinfo.value) {
        console.log(i);
        popupcfg.columns.push(i["my_spec"].split("|")[0]);
        if (i["id"] == route.params["bladeId"]) {
          popupcfg.state.value = i["my_spec"].split("|")[0];
        }
      }
      console.log(popupcfg.columns);
    });

    return {
      location,
      getLocation,
      popupcfg,
      autocompletecfg,
      selected,
      formData,
    };
  },
  mounted() {
    //判断store中有没有数据
    // console.log(this.location);
    if (this.location.length !== 0) {
      //有数据
      console.log(this.location);
      // this.autocompletecfg.loadAll = this.location[0];
    } else {
      //没有请求数据
      console.log("重新加载数据location");
      this.getLocation({ location: "all", querytype: "weldinggun" });
    }
  },
};
</script>

<style lang="scss">
.ha-autocomplete {
  display: flex;
  .ha-autocomplete-label {
    width: 6.2em;
  }
  .inline-input {
    flex: 1;
  }
}
</style>

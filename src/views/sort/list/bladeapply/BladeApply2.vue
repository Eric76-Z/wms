<template>
  <div id="bladeapply2">
    <h-autocomplete :autocompletecfg="autocompletecfg" @selected="selected" />
    <van-form @submit="onSubmit">
      <van-field
        readonly
        required
        v-model="formData.MyLocation"
        name="MyLocation"
        label="区域"
      />
      <van-field
        v-model="state.value"
        readonly
        clickable
        required
        name="BladeType"
        label="刀片类型"
        placeholder="点击选择要申请的刀片类型......"
        @click="state.showPicker = true"
      />
      <van-field
        v-model="formData.RepairOrderNum"
        required
        type="digit"
        name="RepairOrderNum"
        label="维修单编号"
        placeholder="请输入维修单编号......"
        :rules="[{ required: true, message: '请填写区域' }]"
      />
      <van-field
        v-model="formData.CycleNum"
        type="digit"
        name="CycleNum"
        label="修磨圈数"
        placeholder="请输入修磨圈数......"
        :rules="[{ required: true, message: '请输入修磨圈数' }]"
      />
      <van-field
        v-model="formData.Pressure"
        type="number"
        name="Pressure"
        label="修磨压力"
        placeholder="请输入修磨压力......"
        :rules="[{ required: true, message: '请输入修磨压力' }]"
      />
      <van-field
        v-model="formData.Comments"
        name="Comments"
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
    <van-popup v-model:show="state.showPicker" position="bottom">
      <van-picker
        :columns="columns"
        @confirm="onConfirm"
        @cancel="state.showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { onActivated, reactive, toRef } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { Form, Field, Picker, Popup } from "vant";
import HAutocomplete from "@/components/common/HaAutocomplete";
import { postForm } from "@/network/sort.js";
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
    listcfg: {
      type: Object,
    },
  },
  setup(props) {
    //vuex数据
    const store = useStore();
    const bladedata = toRef(store.state, "bladedata");
    console.log(bladedata);
    const location = toRef(store.state, "location");
    const {
      getLocation: [getLocation],
    } = store._actions;
    //表单相关数据
    const formData = reactive({
      WeldingGun: "",
      MyLocation: "",
      RepairOrderNum: "",
      CycleNum: "",
      Pressure: "",
      Comments: "",
    });
    //autocomplete相关数据
    // const loadAll = reactive(location.value);
    const autocompletecfg = reactive(location);
    const listcfg = toRef(props, "listcfg");
    const bladeDatas = reactive(listcfg.value.content);
    const route = reactive(useRoute());
    let state = reactive({
      value: "",
      showPicker: false,
    });
    // console.log(bladeDatas);
    //刀片类型选择器
    const columns = [];
    for (let bladeData in bladeDatas) {
      columns.push(bladeDatas[bladeData]["title"]);
    }
    //点击确定按钮触发
    const onConfirm = (value) => {
      console.log(value);
      state.value = value;
      state.showPicker = false;
    };

    //autocomplete 选择后赋值
    const selected = (val) => {
      formData.WeldingGun = val.value;
      formData.MyLocation = val.area;
      return true;
    };

    //提交表单
    const onSubmit = (values) => {
      values.WeldingGun = formData.WeldingGun;
      values.BladeTypeId = route.params["bladeId"];
      postForm(values);
      console.log("submit", values);
    };

    onActivated(() => {
      state.value = bladeDatas[route.params["bladeId"]]["title"];
    });

    return {
      location,
      getLocation,
      state,
      columns,
      onConfirm,
      autocompletecfg,
      selected,
      formData,
      onSubmit,
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
  activated() {},
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

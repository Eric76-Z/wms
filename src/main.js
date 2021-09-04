import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Tabbar, TabbarItem } from "vant";
import { NavBar, Sidebar, SidebarItem } from "vant";
import { Icon, Toast, Card, List, Dialog } from "vant";
import { Tab, Tabs, Tag } from "vant";
import { Cell, CellGroup, Form, Field } from "vant";
import { Image as VanImage } from "vant";
import { Button } from "vant";
import { DatetimePicker } from "vant";
import { Search, Lazyload } from "vant";
import { ConfigProvider } from "vant";
import { Popup, Divider } from "vant";
import {
  DropdownMenu,
  DropdownItem,
  Popover,
  Collapse,
  CollapseItem,
} from "vant";
import { Grid, GridItem } from "vant";
import { Uploader } from "vant";
import { Step, Steps } from "vant";
import { RadioGroup, Radio } from "vant";
import { Checkbox, CheckboxGroup } from "vant";
import { ContactCard } from "vant";

const app = createApp(App);
app.use(store);
app.use(router);

app.use(ContactCard);
app.use(Checkbox);
app.use(CheckboxGroup);
app.use(RadioGroup);
app.use(Radio);
app.use(Step);
app.use(Steps);
app.use(Uploader);
app.use(Grid, GridItem);
app.use(Divider);
app.use(Collapse);
app.use(CollapseItem);
app.use(Popover);
app.use(DropdownMenu, DropdownItem);
app.use(Tabbar);
app.use(TabbarItem);
app.use(NavBar);
app.use(Icon);
app.use(Toast);
app.use(Dialog);
app.use(Sidebar);
app.use(SidebarItem);
app.use(Card);
app.use(List);
app.use(Tab);
app.use(Tabs);
app.use(VanImage);
app.use(Cell);
app.use(CellGroup);
app.use(Form);
app.use(Field);
app.use(Button);
app.use(DatetimePicker);
app.use(Search);
app.use(Lazyload);
app.use(ConfigProvider);
app.use(Tag);
app.use(Popup);

app.config.devtools = true;

app.mount("#app");
// createApp(App).use(store).use(router).mount("#app");

// // 注册一个全局自定义指令 `v-lazydom`
// app.directive("lazydom", {
//   mounted(el, binding, vnode) {
//     console.log("eeeeeeee");
//     console.log(el);
//     console.log(binding);
//     console.log(vnode);
//     var context = vnode.appContext;
//     console.log(context);
//     if (context && typeof context.lazyready == "function") {
//       setTimeout(() => {
//         context.lazyready(el);
//       }, 10);
//     }
//   },
// });

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  const type = to.meta.type;
  const realname = to.meta.realname;
  // 判断该路由是否需要登录权限
  if (type === "login") {
    if (store.state.user.userState !== 200) {
      next({ name: "login" });
    } else {
      next();
    }
  } else if (realname == "realname") {
    if (
      store.state.user.userinfo.last_name == "" ||
      store.state.user.userinfo.last_name == ""
    ) {
      Toast.fail({
        message: "未实名！跳转到个人信息页面实名！",
        duration: 1000,
        onClose: () => {
          next({ name: "userinfo" });
        },
      });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要有next()被调用
  }
});

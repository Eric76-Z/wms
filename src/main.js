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
const app = createApp(App);
app.use(store);
app.use(router);

app.use(Tabbar);
app.use(TabbarItem);
app.use(NavBar);
app.use(Icon);
app.use(Toast, Dialog);
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

app.config.devtools = true;

app.mount("#app");
// createApp(App).use(store).use(router).mount("#app");

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  const type = to.meta.type;
  // 判断该路由是否需要登录权限
  if (type === "login") {
    if (store.state.user.userState !== 200) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要有next()被调用
  }
});

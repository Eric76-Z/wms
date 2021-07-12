import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import store from "./store";

import { Tabbar, TabbarItem } from "vant";
import { NavBar, Sidebar, SidebarItem } from "vant";
import { Icon, Toast, Card, List } from "vant";
import { Tab, Tabs } from "vant";
import { Cell, CellGroup } from "vant";
import { Image as MyImage } from "vant";
import { Button } from "vant";
import { DatetimePicker } from "vant";

const app = createApp(App);
app.use(store);
app.use(router);

app.use(Tabbar);
app.use(TabbarItem);
app.use(NavBar);
app.use(Icon);
app.use(Toast);
app.use(Sidebar);
app.use(SidebarItem);
app.use(Card);
app.use(List);
app.use(Tab);
app.use(Tabs);
app.use(MyImage);
app.use(Cell);
app.use(CellGroup);
app.use(Button);
app.use(DatetimePicker);

app.config.devtools = true;

app.mount("#app");
// createApp(App).use(store).use(router).mount("#app");

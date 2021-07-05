import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Tabbar, TabbarItem } from "vant";
import { NavBar, Sidebar, SidebarItem } from "vant";
import { Icon, Toast, Card, List } from "vant";

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

app.config.devtools = true;

app.mount("#app");
// createApp(App).use(store).use(router).mount("#app");

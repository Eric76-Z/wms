import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Tabbar, TabbarItem } from "vant";
import { NavBar } from "vant";
import { Icon } from "vant";

const app = createApp(App);
app.use(store);
app.use(router);

app.use(Tabbar);
app.use(TabbarItem);
app.use(NavBar);
app.use(Icon);

app.config.devtools = true;

app.mount("#app");
// createApp(App).use(store).use(router).mount("#app");

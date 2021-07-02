import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // {
  //   name: "notFound",
  //   path: "/:path(.*)+",
  //   redirect: {
  //     name: "home",
  //   },
  // },
  {
    name: "home",
    path: "",
    redirect: "/home",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

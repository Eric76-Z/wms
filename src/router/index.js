import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/home/Home");
const Sort = () => import("@/views/sort/Sort");
const Profile = () => import("@/views/profile/Profile");

const routes = [
  // {
  //   name: "notFound",
  //   path: "/:path(.*)+",
  //   redirect: {
  //     name: "home",
  //   },
  // },
  {
    name: "/",
    path: "",
    redirect: "/sort",
  },
  {
    name: "home",
    path: "/home",
    component: Home,
  },
  {
    name: "sort",
    path: "/sort",
    component: Sort,
  },
  {
    name: "profile",
    path: "/profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

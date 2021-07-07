import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/home/Home");
const Sort = () => import("@/views/sort/Sort");
const Profile = () => import("@/views/profile/Profile");

const List = () => import("@/views/sort/list/List");
const Detail = () => import("@/views/sort/detail/Detail");
const routes = [
  {
    name: "notFound",
    path: "/:path(.*)+",
    redirect: {
      name: "home",
    },
  },
  {
    name: "/",
    path: "",
    redirect: "/home",
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
  {
    name: "list",
    path: "/sort/list",
    component: List,
  },
  {
    name: "detail",
    path: "/sort/detail",
    component: Detail,
    // meta: {
    //   title: "分类-列表明细",
    // },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export default router;

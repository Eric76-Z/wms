import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/home/Home");
const Sort = () => import("@/views/sort/Sort");
const Profile = () => import("@/views/profile/Profile");

const List = () => import("@/views/sort/list/List");
const Detail = () => import("@/views/sort/detail/Detail");
const BladeApply = () => import("@/views/sort/list/listform/BladeApply");
const BladeApply1 = () => import("@/views/sort/list/listform/BladeApply1");
const BladeApply2 = () => import("@/views/sort/list/listform/BladeApply2");

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
  {
    name: "bladeapply",
    path: "/sort/list/bladeapply",
    component: BladeApply,
    children: [
      {
        name: "baldeapply1",
        path: "bladeapply1",
        component: BladeApply1,
      },
      {
        name: "baldeapply2",
        path: "bladeapply2/:bladeId",
        component: BladeApply2,
      },
      {
        path: "",
        component: BladeApply1,
      },
    ],
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

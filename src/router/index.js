import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/home/Home");
const Sort = () => import("@/views/sort/Sort");
const Profile = () => import("@/views/profile/Profile");
const Login = () => import("@/views/profile/Login");
const Register = () => import("@/views/profile/Register");
const UserInfo = () => import("@/views/profile/UserInfo");

const List = () => import("@/views/sort/list/List");

const BladeApply = () => import("@/views/sort/list/bladeapply/BladeApply");
const BladeApply1 = () => import("@/views/sort/list/bladeapply/BladeApply1");
const BladeApply2 = () => import("@/views/sort/list/bladeapply/BladeApply2");
const MtIsland = () => import("@/views/sort/mtisland/MtIsland");
const FaultRecord = () =>
  import("@/views/sort/mtisland/faultrecord/FaultRecord");
const FaultRecord1 = () =>
  import("@/views/sort/mtisland/faultrecord/FaultRecord1");
const FaultRecord2 = () =>
  import("@/views/sort/mtisland/faultrecord/FaultRecord2");

const Detail = () => import("@/views/sort/detail/Detail");
const BladeDetail = () => import("@/views/sort/detail/BladeDetail");

const FaultList = () => import("@/views/sort/mtisland/faultlist/FaultList");
const FaultList1 = () => import("@/views/sort/mtisland/faultlist/FaultList1");
const FaultListSearch = () =>
  import("@/views/sort/mtisland/faultlist/FaultListSearch");

const FaultDetail = () => import("@/views/sort/mtisland/faultlist/FaultDetail");

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
  //用户模块
  {
    name: "profile",
    path: "/profile",
    component: Profile,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name: "register",
    path: "/register",
    component: Register,
  },
  {
    name: "userinfo",
    path: "/profile/userinfo",
    component: UserInfo,
  },
  // sort下相关模块
  {
    name: "sort",
    path: "/sort",
    component: Sort,
  },
  {
    name: "list",
    path: "/sort/list",
    component: List,
    meta: {
      type: "login",
    },
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
    name: "bladedetail",
    path: "/sort/detail/bladedetail",
    component: BladeDetail,
    meta: {
      keepAlive: true,
    },
  },
  {
    name: "bladeapply",
    path: "/sort/list/bladeapply",
    component: BladeApply,

    children: [
      {
        name: "bladeapply1",
        path: "bladeapply1",
        component: BladeApply1,
        props: true,
        alias: "",
      },
      {
        name: "bladeapply2",
        path: "bladeapply2/:bladeId",
        component: BladeApply2,
      },
    ],
  },
  {
    name: "mtisland",
    path: "/sort/mtisland",
    component: MtIsland,
  },
  {
    name: "faultrecord",
    path: "/sort/mtisland/faultrecord",
    component: FaultRecord,
    children: [
      {
        name: "faultrecord1",
        path: "faultrecord1",
        component: FaultRecord1,
        props: true,
        alias: "",
      },
      {
        name: "faultrecord2",
        path: "faultrecord2",
        component: FaultRecord2,
        props: true,
      },
    ],
  },
  {
    name: "faultlist",
    path: "/sort/mtisland/faultlist",
    component: FaultList,
    children: [
      {
        name: "faultlist1",
        path: "faultlist1",
        component: FaultList1,
        props: true,
        alias: "",
      },
      {
        name: "faultdetail",
        path: "faultdetail/:maintenanceId",
        component: FaultDetail,
        props: true,
      },
      {
        name: "faultlistsearch",
        path: "faultlistsearch",
        component: FaultListSearch,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  base: "/",
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export default router;

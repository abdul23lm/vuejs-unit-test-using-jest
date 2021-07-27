import Vue from "vue";
import VueRouter from "vue-router";
import vuejs_unit_test_using_jest from "../views/vuejs_unit_test_using_jest.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "vuejs_unit_test_using_jest",
    component: vuejs_unit_test_using_jest,
  },
  {
    path: "/detail/:id",
    name: "DetailTodo",
    component: () =>
      import(/* webpackChunkName: "DetailTodo" */ "../views/DetailTodo.vue"),
  },
  {
    path: "/new",
    name: "NewTodo",
    component: () =>
      import(/* webpackChunkName: "NewTodo" */ "../views/NewTodo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

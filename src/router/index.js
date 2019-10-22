import Vue from "vue";
import VueRouter from "vue-router";
//import Home from '../views/Home.vue'
import Search from "../views/Search.vue";
import Profile from "../views/Profile.vue";
import Repo from "../views/Repo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "search",
    component: Search
  },
  {
    path: "/:username/:repo",
    name: "repo",
    component: Repo
  },
  {
    path: "/:username",
    name: "profile",
    component: Profile
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

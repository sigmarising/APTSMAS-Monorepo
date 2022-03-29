import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/original-data" },
  // route level code-splitting
  // belows will generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  {
    path: "/original-data",
    name: "OriginalData",
    component: () => import("../views/VOriginalData.vue"),
  },
  {
    path: "/trajectory-olam",
    name: "TrajectoryOLAM",
    component: () => import("../views/VTrajectoryOLAM.vue"),
  },
  {
    path: "/time-variant",
    name: "TimeVariant",
    component: () => import("../views/VTimeVariant.vue"),
  },
  {
    path: "/trajectory-embedding",
    name: "TrajectoryEmbedding",
    component: () => import("../views/VTrajectoryEmbedding.vue"),
  },
  {
    path: "/space-scale-visualization",
    name: "SpaceScaleVisualization",
    component: () => import("../views/VSpaceScaleVisualization.vue"),
  },
  // the 404
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

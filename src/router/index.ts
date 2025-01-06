/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import authProvider from "@/provider/authProviders";

/**
 * Front End Page
 */

/**
 * Backend Page
 */
import Backend from "../layouts/backend/index.vue";
import Dashboard from "../pages/backend/dashboard.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "auth",
    component: Backend,

    children: [
      {
        path: "",
        name: "auth",
        redirect: { name: "dashboard" },
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation Guard for authentication
router.beforeEach((to, from, next) => {
  const auth = new authProvider();

  const requiresAuth = to.matched.some((record) => record.meta.auth);

  if (requiresAuth) {
    if (!auth.logged) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

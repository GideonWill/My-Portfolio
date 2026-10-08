const routeLoaders = {
  "/": () => import("./pages/Home"),
  "/about": () => import("./pages/About"),
  "/projects": () => import("./pages/Projects"),
  "/resume": () => import("./pages/Resume"),
  "/contact": () => import("./pages/Contact"),
};

export const loadRoute = (path) => routeLoaders[path]?.();

import {
  Refine,
  Authenticated,
  AuthPage,
  ErrorComponent,
} from "@refinedev/core";

import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
} from "@refinedev/react-router-v6";
import {
  BlogPostList,
  BlogPostCreate,
  BlogPostEdit,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryList,
  CategoryCreate,
  CategoryEdit,
  CategoryShow,
} from "./pages/categories";
import { Layout } from "./components/layout";
import "./App.css";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgotPassword";
import { authProvider } from "./authProvider";
import { ThemeProvider } from "@/components/theme-provider"
import DashboardPage from "./pages/dashboard";
import SettingsPage from "./pages/settings";
import ProfilePage from "./pages/profile";
import OrderPage from "./pages/order";
import CalendarPage from "./pages/calendar";
import { DataTablePage } from "./pages/datatable";
import { NuqsAdapter } from 'nuqs/adapters/react'
import ResourcePlanner from "./pages/resource-planner";
import { RoomAvailability } from "./pages/room/RoomAvailability";
import { User } from "lucide-react";
import { UserPage } from "./pages/users";


function App() {
  return (
    <NuqsAdapter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerBindings}
            authProvider={authProvider}
            resources={[
              {
                name: "dashboard",
                list: "/dashboard",
              },
              {
                name: "settings",
                list: "/settings",
              },
              {
                name: "calendar",
                list: "/calendar",
              },
              {
                name: "profile",
                list: "/profile",
              },
              {
                name: "restdatatable",
                list: "/restdatatable",
              },
              {
                name: "orders",
                list: "/orders",
              },
              {
                name: "users",
                list: "/users",
              },
              {
                name: "resources",
                list: "/resource-planner",
              },
              {
                name: "Room Planner",
                list: "/room-planner",
              },
              {
                name: "blog_posts",
                list: "/blog-posts",
                create: "/blog-posts/create",
                edit: "/blog-posts/edit/:id",
                show: "/blog-posts/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "categories",
                list: "/categories",
                create: "/categories/create",
                edit: "/categories/edit/:id",
                show: "/categories/show/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "VHATS2-PecHcr-wD0PyP",
              disableTelemetry: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-inner"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="dashboard" />}
                />
                <Route path="/blog-posts">
                  <Route index element={<BlogPostList />} />
                  <Route path="create" element={<BlogPostCreate />} />
                  <Route path="edit/:id" element={<BlogPostEdit />} />
                  <Route path="show/:id" element={<BlogPostShow />} />
                </Route>
                <Route path="/dashboard">
                  <Route index handle={{
                    breadcrumb: "Dashboard",
                  }} element={<DashboardPage />} />
                </Route>
                <Route path="/calendar">
                  <Route index element={<CalendarPage />} />
                </Route>
                <Route path="/room-planner">
                  <Route index element={<RoomAvailability />} />
                </Route>
                <Route path="/resource-planner">
                  <Route index element={<ResourcePlanner />} />
                </Route>
                <Route path="/profile">
                  <Route index element={<ProfilePage />} />
                </Route>
                <Route path="/orders">
                  <Route index element={<OrderPage />} />
                </Route>
                <Route path="/settings">
                  <Route index element={<SettingsPage />} />
                </Route>
                <Route path="/users">
                  <Route index element={<UserPage />} />
                </Route>
                <Route path="/restdatatable">
                  <Route index element={<DataTablePage />} />
                </Route>
                <Route path="/categories">
                  <Route index element={<CategoryList />} />
                  <Route path="create" element={<CategoryCreate />} />
                  <Route path="edit/:id" element={<CategoryEdit />} />
                  <Route path="show/:id" element={<CategoryShow />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated
                    key="authenticated-outer"
                    fallback={<Outlet />}
                  >
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
            </Routes>
          </Refine>
        </BrowserRouter>
      </ThemeProvider>
      </NuqsAdapter>
  );
}

export default App;

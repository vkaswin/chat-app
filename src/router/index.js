import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { useAuth } from "hooks";
import { routes } from "router/Routes";
import { ProtectedRoute } from "./ProtectedRoute";
const PageNotFound = lazy(() => import("../pages/404"));

export const Router = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate replace to="/chats" />
              //   <Navigate replace to={user ? "/chats" : "/auth/login"} />
            }
          />
          {routes.map(({ path, component, layout, auth }) => {
            const Layout = lazy(() => import(`../${layout}`));
            const Component = lazy(() => import(`../${component}`));
            return (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute
                    auth={auth}
                    component={
                      <Layout>
                        <Component />
                      </Layout>
                    }
                  />
                }
              />
            );
          })}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HashRouter>
    </Suspense>
  );
};

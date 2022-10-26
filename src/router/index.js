import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { ProvideAuth } from "hooks";
import { routes } from "router/Routes";
import { ProtectedRoute } from "./ProtectedRoute";
import { cookies } from "utils";
import { Loader } from "./Loader";

const PageNotFound = lazy(() => import("../pages/404"));

export const Router = () => {
  const cookie = cookies();

  const authToken = cookie.get("auth_token");

  return (
    <Suspense fallback={<Loader />}>
      <HashRouter>
        <ProvideAuth>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate replace to={authToken ? "/chats" : "/auth/login"} />
              }
            />
            {routes.map(({ path, component, children = [], auth }) => {
              if (children.length === 0) {
                const PageComponent = lazy(() => import(`../${component}`));
                return (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <ProtectedRoute
                        auth={auth}
                        component={<PageComponent />}
                      />
                    }
                  />
                );
              } else {
                const LayoutComponent = lazy(() => import(`../${component}`));
                return (
                  <Route key={path} path={path} element={<LayoutComponent />}>
                    {children.map(({ path, component, auth }) => {
                      const Component = lazy(() => import(`../${component}`));
                      return (
                        <Route
                          key={path}
                          path={path}
                          element={
                            <ProtectedRoute
                              auth={auth}
                              component={<Component />}
                            />
                          }
                        />
                      );
                    })}
                  </Route>
                );
              }
            })}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ProvideAuth>
      </HashRouter>
    </Suspense>
  );
};

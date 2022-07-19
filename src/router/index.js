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
          {routes.map(({ path, component, children = [], auth }) => {
            if (children.length === 0) {
              const PageComponent = lazy(() => import(`../${component}`));
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <ProtectedRoute auth={auth} component={<PageComponent />} />
                  }
                />
              );
            } else {
              const LayoutComponent = lazy(() => import(`../${component}`));
              return (
                <Route key={path} path={path} element={<LayoutComponent />}>
                  {children.map(
                    ({
                      path: childPath,
                      component: childComponent,
                      auth: childAuth,
                    }) => {
                      const ChildComponent = lazy(() =>
                        import(`../${childComponent}`)
                      );
                      return (
                        <Route
                          key={childPath}
                          path={childPath}
                          element={
                            <ProtectedRoute
                              auth={childAuth}
                              component={<ChildComponent />}
                            />
                          }
                        />
                      );
                    }
                  )}
                </Route>
              );
            }
          })}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HashRouter>
    </Suspense>
  );
};

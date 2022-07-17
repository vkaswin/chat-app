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
          {routes.map(
            ({
              path,
              componentPath,
              children = [],
              isAuthenticated = false,
              isAuthPage = false,
            }) => {
              if (children.length === 0) {
                const PageComponent = lazy(() => import(`../${componentPath}`));
                return (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        isAuthPage={isAuthPage}
                        component={<PageComponent />}
                      />
                    }
                  />
                );
              } else {
                const LayoutComponent = lazy(() =>
                  import(`../${componentPath}`)
                );
                return (
                  <Route key={path} path={path} element={<LayoutComponent />}>
                    {children.map(
                      ({
                        path: childPath,
                        componentPath: childComponentPath,
                        isAuthenticated: isChildAuthenticated,
                        isAuthPage: isChildAuthPage,
                      }) => {
                        const ChildComponent = lazy(() =>
                          import(`../${childComponentPath}`)
                        );
                        return (
                          <Route
                            key={childPath}
                            path={childPath}
                            element={
                              <ProtectedRoute
                                isAuthenticated={isChildAuthenticated}
                                isAuthPage={isChildAuthPage}
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
            }
          )}
          <Route
            path="/"
            element={
              <Navigate replace to={user ? "/profile" : "/auth/login"} />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HashRouter>
    </Suspense>
  );
};

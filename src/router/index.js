import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
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
                    <SwitchTransition mode="out-in">
                      <CSSTransition
                        key={path}
                        timeout={300}
                        classNames={{
                          enterActive: "router-enter",
                          exitActive: "router-exit",
                        }}
                      >
                        <ProtectedRoute
                          auth={auth}
                          component={<PageComponent />}
                        />
                      </CSSTransition>
                    </SwitchTransition>
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
                            <SwitchTransition mode="out-in">
                              <CSSTransition
                                key={childPath}
                                timeout={300}
                                classNames={{
                                  enterActive: "router-enter",
                                  exitActive: "router-exit",
                                }}
                              >
                                <ProtectedRoute
                                  auth={childAuth}
                                  component={<ChildComponent />}
                                />
                              </CSSTransition>
                            </SwitchTransition>
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

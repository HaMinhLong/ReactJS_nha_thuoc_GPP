import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import PrivateRoute from "@/components/PrivateRoute";
import { AuthProvider } from "@/components/AuthProvider";
import { MessageProvider } from "@/context/MessageContext";
import PublicRoute from "@/components/PublicRoute";

import HomePage from "@/pages/HomePage";
import UserGroupPage from "@/pages/AccountSetting/UserGroup";
import UserPage from "@/pages/AccountSetting/User";
import PermissionPage from "@/pages/AccountSetting/Permission";
import UpdatePermission from "@/pages/AccountSetting/Permission/components/UpdatePermission";

import CabinetPage from "@/pages/SystemSetting/Cabinet";

import LoginPage from "@/pages/LoginPage";
import { useLazyGetMeQuery } from "./api/auth";

const App = () => {
  const dispatch = useDispatch();
  const [getMe] = useLazyGetMeQuery();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMe();

      const permission = res?.data?.data?.permission || [];
      const user = res?.data?.data?.user || {};

      dispatch({
        type: "auth/updatePermission",
        payload: permission,
      });
      dispatch({
        type: "auth/updateUserProfile",
        payload: user,
      });
    };
    fetchData();
  }, []);

  return (
    <AuthProvider>
      <MessageProvider>
        <Router>
          <Routes>
            {/* Login Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            {/* User Group Routes */}
            <Route element={<PrivateRoute />}>
              <Route
                path="/account-setting/user-group"
                element={<UserGroupPage />}
              />
            </Route>
            {/* User Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/account-setting/user" element={<UserPage />} />
            </Route>
            {/* Permission Routes */}
            <Route element={<PrivateRoute />}>
              <Route
                path="/account-setting/permission"
                element={<PermissionPage />}
              />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route
                path="/account-setting/permission/:id"
                element={<UpdatePermission />}
              />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/system-setting/cabinet" element={<CabinetPage />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Router>{" "}
      </MessageProvider>
    </AuthProvider>
  );
};

export default App;

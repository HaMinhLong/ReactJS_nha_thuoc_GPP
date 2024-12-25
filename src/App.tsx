import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./components/AuthProvider";
import { MessageProvider } from "./context/MessageContext";
import PublicRoute from "./components/PublicRoute";

import HomePage from "./pages/HomePage";
import UserGroupPage from "./pages/SystemSetting/UserGroup";

import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <AuthProvider>
      <MessageProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route
                path="/system-setting/user-group"
                element={<UserGroupPage />}
              />
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

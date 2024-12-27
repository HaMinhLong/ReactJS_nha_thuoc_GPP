import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";

import logoPage from "../assets/image/logo_page.svg";

import "./index.css";

const { Header } = Layout;

const HeaderPage = () => {
  const menuItems = [
    {
      key: "dashboard",
      label: <Link to="/">Tổng quan</Link>,
      icon: <SettingOutlined />,
    },
    {
      key: "thuoc",
      label: <Link to="/">Đơn thuốc</Link>,
    },
    {
      label: "Cài đặt hệ thống",
      key: "system_setting",
      icon: <SettingOutlined />,
      children: [
        {
          label: <Link to="/system-setting/user-group">Nhóm tài khoản</Link>,
          key: "user_group",
          authorities: ["user_group_getList"],
        },
        {
          label: <Link to="/system-setting/user">Tài khoản</Link>,
          key: "user",
          authorities: ["user_getList"],
        },
        {
          label: "Phân quyền",
          key: "permission",
        },
      ],
    },
  ];

  return (
    <div>
      <div className="h-[50px] px-10 flex items-center justify-between bg-[#fff]">
        <Link to="/">
          <img width="150" height="50" className="logo" src={logoPage} alt="" />
        </Link>
      </div>

      <Header style={{ display: "flex", alignItems: "center", height: 50 }}>
        <Menu mode="horizontal" items={menuItems} style={{ height: 50 }} />
      </Header>
    </div>
  );
};

export default HeaderPage;

import React from "react";
import { Avatar, Dropdown, Layout, Menu, MenuProps, Space } from "antd";
import { Link } from "react-router-dom";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

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
      label: "Cài đặt tài khoản",
      key: "account_setting",
      icon: <SettingOutlined />,
      children: [
        {
          label: <Link to="/account-setting/user-group">Nhóm tài khoản</Link>,
          key: "user_group",
          authorities: ["user_group_getList"],
        },
        {
          label: <Link to="/account-setting/user">Tài khoản</Link>,
          key: "user",
          authorities: ["user_getList"],
        },
        {
          label: <Link to="/account-setting/permission">Phân quyền</Link>,
          key: "permission",
        },
      ],
    },
    {
      label: "Cài đặt hệ thống",
      key: "system_setting",
      icon: <SettingOutlined />,
      children: [
        {
          label: <Link to="/system-setting/cabinet">Tủ/Ngăn tủ</Link>,
          key: "user_group",
          authorities: ["user_group_getList"],
        },
      ],
    },
  ];

  const items: MenuProps["items"] = [
    {
      label: "Cài đặt doanh nghiệp",
      key: "1",
      icon: <SettingOutlined />,
    },
    {
      label: "Cài đặt tài khoản",
      key: "2",
      icon: <SettingOutlined />,
    },
    {
      label: "Đăng xuất",
      key: "3",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <div>
      <div className="h-[50px] px-10 flex items-center justify-between bg-[#fff]">
        <Link to="/">
          <img width="150" height="50" className="logo" src={logoPage} alt="" />
        </Link>

        <div className="flex flex-end p-[10px] z-[1001] cursor-pointer">
          <Dropdown menu={{ items }} placement="bottom">
            <Space>
              <Avatar icon={<UserOutlined />} />
              <span style={{ cursor: "pointer" }}>Vũ Hưng</span>
            </Space>
          </Dropdown>
        </div>
      </div>

      <Header style={{ display: "flex", alignItems: "center", height: 50 }}>
        <Menu mode="horizontal" items={menuItems} style={{ height: 50 }} />
      </Header>
    </div>
  );
};

export default HeaderPage;

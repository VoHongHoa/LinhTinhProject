// components/Header.tsx
import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header className="header" style={{ color: "white" }}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Trang Chủ</Menu.Item>
        <Menu.Item key="2">Giới Thiệu</Menu.Item>
        <Menu.Item key="3">Liên Hệ</Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;

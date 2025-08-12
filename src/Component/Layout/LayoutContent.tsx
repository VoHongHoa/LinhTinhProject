import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, MenuProps } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import "./Layout.css";

const { Header, Content, Sider } = Layout;

export default function LayoutContent(): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key); // Điều hướng đến đường dẫn được lưu trong key
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
        <PlusCircleOutlined />
          <span> {collapsed ? "" : "LOGO"}</span>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={onClick}
          items={[
            {
              key: "/xuat-du-lieu",
              icon: <UserOutlined />,
              label: "Xuất dữ liệu",
            },
            {
              key: "/get-user-one-health-inf",
              icon: <VideoCameraOutlined />,
              label: "Người dùng One Health",
            },
            {
              key: "/so-sanh-thong-tin",
              icon: <VideoCameraOutlined />,
              label: "So sánh thông tin",
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

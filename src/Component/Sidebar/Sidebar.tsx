// components/Sidebar.tsx
import React, { useState } from "react";
import { Button, Layout, Menu, MenuProps } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];
const { Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Xuất dữ liệu", "/xuat-du-lieu", <MailOutlined />, [
    getItem("Khám sức khỏe", "/xuat-du-lieu/kham-suc-khoe"),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const AppSidebar: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const navigate = useNavigate();

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key); // Điều hướng đến đường dẫn được lưu trong key
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      onClick={onClick}
      style={{ width: 256 }}
      items={items}
    />
  );
};

export default AppSidebar;

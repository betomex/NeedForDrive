import {Button, Layout, Menu} from "antd";
import {CloseOutlined, MenuOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import './SideMenu.css'

export const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(true)

  return <Layout.Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={"60px"}>
    <Menu theme="dark" mode="inline" className={"sideMenu"}>
      <Button icon={collapsed ? <MenuOutlined/> : <CloseOutlined/>} onClick={() => {
        setCollapsed(!collapsed)
      }}/>
      {!collapsed
        && <Menu.ItemGroup>
          <Menu.Item key="1">
            ПАРКОВКА
          </Menu.Item>
          <Menu.Item key="2">
            СТРАХОВКА
          </Menu.Item>
          <Menu.Item key="3">
            БЕНЗИН
          </Menu.Item>
          <Menu.Item key="4">
            ОБСЛУЖИВАНИЕ
          </Menu.Item>
        </Menu.ItemGroup>
      }
      <Button shape={"circle"}>Eng</Button>
    </Menu>
  </Layout.Sider>
}
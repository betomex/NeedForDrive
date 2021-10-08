import {Button, Grid, Layout, Menu, Space} from "antd";
import {CloseOutlined, FacebookOutlined, InstagramOutlined, LinkedinOutlined, MenuOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import './SideMenu.css'

export const SideMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isLangChangerVisible, setIsLangChangerVisible] = useState(true)
  const pageSize = Grid.useBreakpoint()

  useEffect(() => {
    setIsLangChangerVisible(true)
    if (pageSize.xs) {
      setIsLangChangerVisible(false)
    }
  }, [pageSize])

  return <Layout.Sider
    collapsed={isCollapsed}
    collapsedWidth={"60px"}
    width={"100%"}
    className={"sideMenu"}
  >
    <Menu
      theme="dark"
      className={isCollapsed ? "closedSideMenu" : "openedSideMenu"}
    >
      <Button
        icon={isCollapsed ? <MenuOutlined/> : <CloseOutlined/>}
        onClick={() => {
          setIsCollapsed(!isCollapsed)
        }}
      />
      {!isCollapsed &&
      <Menu.ItemGroup>
        <Menu.Item key="1" className={"menuItem"}>
          Парковка
        </Menu.Item>
        <Menu.Item key="2" className={"menuItem"}>
          Страховка
        </Menu.Item>
        <Menu.Item key="3" className={"menuItem"}>
          Бензин
        </Menu.Item>
        <Menu.Item key="4" className={"menuItem"}>
          Обслуживание
        </Menu.Item>
        <Space className={"socialGroup"}>
          <FacebookOutlined className={"menuItem"}/>
          <LinkedinOutlined className={"menuItem"}/>
          <InstagramOutlined className={"menuItem"}/>
        </Space>
      </Menu.ItemGroup>
      }
      {(isLangChangerVisible || !isCollapsed) &&
      <Button
        shape={"circle"}
        className={"langChanger"}
      >Eng</Button>
      }
    </Menu>
  </Layout.Sider>
}
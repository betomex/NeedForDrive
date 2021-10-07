import {Button, Carousel, Col, Grid, Layout, Menu, Row, Space} from "antd";
import {
  CloseOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MenuOutlined
} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import './StartPage.css'
import './Slider.css'
import './SideMenu.css'

const {Header, Content, Footer} = Layout

export const StartPage = () => {
  const [collapsed, setCollapsed] = useState(true)
  const [collapsedWidth, setCollapsedWidth] = useState("48%")
  const pageSize = Grid.useBreakpoint()

  useEffect(() => {
    if (pageSize.xl) {
      setCollapsedWidth("48%")
    } else if (pageSize.lg) {
      setCollapsedWidth("30%")
    }
  }, [pageSize])

  return <Layout>
    <Layout.Sider collapsed={collapsed} collapsedWidth={"60px"} width={"100%"} style={{
      position: "absolute", top: 0, left: 0, zIndex: 20, height: "100%"
    }}>
      <Menu theme="dark" className={collapsed ? "closedSideMenu" : "openedSideMenu"}>
        <Button icon={collapsed ? <MenuOutlined/> : <CloseOutlined/>} onClick={() => {
          setCollapsed(!collapsed)
        }}/>
        {!collapsed
        && <Menu.ItemGroup>
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
          <Space style={{marginTop: '30px'}}>
            <FacebookOutlined className={"menuItem"}/>
            <LinkedinOutlined className={"menuItem"}/>
            <InstagramOutlined className={"menuItem"}/>
          </Space>
        </Menu.ItemGroup>
        }
        <Button shape={"circle"} className={"langChanger"}>Eng</Button>
      </Menu>
    </Layout.Sider>

    <Layout className="site-layout">
      <Header className="mainPageHeader">
        <Row align={"middle"}>
          <Col offset={2} span={8} xs={{span: 24}} sm={{span: 8}} md={{span: 8}} lg={{span: 13}} xl={{span: 8}}>
            <p className={"mainPageCompany"}>Need For Drive</p>
          </Col>
          <Col xs={{offset: 2}} md={{offset: 9}} lg={{offset: 5}} xl={{offset: 10}}>
            <div className={"cityContent"}>
              <EnvironmentOutlined className={"locationIcon"}/>
              <p className={"cityText"}>Ульяновск</p>
            </div>
          </Col>
        </Row>
      </Header>
      <Content className="site-layout-background">
        <div>
          <h1 className={"mainPageCompanyTitleOne"}>Каршеринг</h1>
          <p className={"mainPageCompanyTitleTwo"}>Need For Drive</p>
          <p className={"mainPageCompanySlogan"}>Поминутная аренда авто твоего города</p>
          <button className={"defaultButton mainPageToBookButton"}>Забронировать</button>
        </div>
      </Content>
      <Footer>
        <Row>
          <Col offset={2} xs={{}} sm={{}} md={{span: 8}} lg={{span: 11}} xl={{span: 8}}>
            © 2016-2019 «Need for drive»
          </Col>
          <Col xs={{offset: 2}} sm={{}} md={{offset: 9}} lg={{offset: 6}} xl={{offset: 9}}>
            8 (495) 234-22-44
          </Col>
        </Row>
      </Footer>
    </Layout>

    {pageSize.lg && <Layout.Sider collapsed collapsedWidth={collapsedWidth}>
      <Carousel autoplay>
        <Row>
          <div className={"slide slide1"}>
            <div className={"slideContent"}>
              <h1 className={"sliderTitle"}>Бесплатная парковка</h1>
              <p className={"sliderText"}>Оставляйте машину на платных городских парковках и разрешенных местах, не
                нарушая ПДД, а также в аэропортах</p>
              <button className={"defaultButton mainPageDescButton buttonGreenGradient"}>Подробнее</button>
            </div>
          </div>
        </Row>

        <Row>
          <div className={"slide slide2"}>
            <div style={{width: "53%"}}>
              <h1 className={"sliderTitle"}>Cтраховка</h1>
              <p className={"sliderText"}>Полная страховка автомобиля</p>
              <button className={"defaultButton mainPageDescButton buttonBlueGradient"}>Подробнее</button>
            </div>
          </div>
        </Row>

        <Row>
          <div className={"slide slide3"}>
            <div style={{width: "53%"}}>
              <h1 className={"sliderTitle"}>Бензин</h1>
              <p className={"sliderText"}>Полный бак на любой заправке города за наш счёт</p>
              <button className={"defaultButton mainPageDescButton buttonRedGradient"}>Подробнее</button>
            </div>
          </div>
        </Row>

        <Row>
          <div className={"slide slide4"}>
            <div style={{width: "53%"}}>
              <h1 className={"sliderTitle"}>Обслуживание</h1>
              <p className={"sliderText"}>Автомобиль проходит еженедельное ТО</p>
              <button className={"defaultButton mainPageDescButton buttonPurpleGradient"}>Подробнее</button>
            </div>
          </div>
        </Row>
      </Carousel>
    </Layout.Sider>}
  </Layout>
}
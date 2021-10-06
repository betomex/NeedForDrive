import React from "react";
import {Col, Layout, Row} from "antd";
import {EnvironmentOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';
import './App.css'
import {SideMenu} from "./components/startPage/SideMenu";
import {Slider} from "./components/startPage/Slider";

const {Header, Content, Footer} = Layout;

const App = () => {
  return <Layout>
    <SideMenu/>

    <Layout className="site-layout">
      <Header className="mainPageHeader">
        <Row align="middle">
          <Col span={10}>
            <p className={"mainPageCompany"}>Need For Drive</p>
          </Col>
          <Col offset={4} span={10}>
            <div className={"cityContent"}>
              <EnvironmentOutlined/>
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
          <Col span={10}>
            © 2016-2019 «Need for drive»
          </Col>
          <Col span={10} offset={4}>
            8 (495) 234-22-44
          </Col>
        </Row>
      </Footer>
    </Layout>

    <Slider/>
  </Layout>
}

export default App;

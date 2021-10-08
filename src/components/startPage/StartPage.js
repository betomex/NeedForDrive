import {Col, Layout, Row} from "antd";
import {EnvironmentOutlined} from "@ant-design/icons";
import React from "react";
import './StartPage.css'
import {SideMenu} from "./SideMenu";
import {Slider} from "./Slider";

const {Header, Content, Footer} = Layout

export const StartPage = () => {
  return <Layout>
    <SideMenu/>
    <Layout className="site-layout">
      <Header className="mainPageHeader">
        <Row
          align={"middle"}
        >
          <Col
            xs={{offset: 4, span: 24}}
            md={{offset: 2, span: 8}}
            lg={{span: 10}}
            xl={{span: 10}}
          >
            <div className={"mainPageCompany"}>Need For Drive</div>
          </Col>
          <Col
            xs={{offset: 16, span: 12}}
            md={{offset: 10, span: 4}}
            lg={{offset: 8}}
            xl={{offset: 8}}
          >
            <div className={"cityContent"}>
              <EnvironmentOutlined className={"locationIcon"}/>
              <div className={"cityText"}>Ульяновск</div>
            </div>
          </Col>
        </Row>
      </Header>
      <Content className="site-layout-background">
        <div className={"mainPageContent"}>
          <h1 className={"mainPageCompanyTitleOne"}>Каршеринг</h1>
          <p className={"mainPageCompanyTitleTwo"}>Need For Drive</p>
          <p className={"mainPageCompanySlogan"}>Поминутная аренда авто твоего города</p>
          <button className={"defaultButton mainPageToBookButton"}>Забронировать</button>
        </div>
      </Content>
      <Footer className={"mainPageFooter"}>
        <Row>
          <Col
            xs={{offset: 6, span: 22}}
            md={{offset: 2, span: 8}}
            lg={{span: 11}}
            xl={{span: 8}}
          >
            <div>© 2016-2019 «Need for drive»</div>
          </Col>
          <Col
            xs={{offset: 14, span: 14}}
            md={{offset: 9, span: 5}}
            lg={{offset: 6}}
            xl={{offset: 9}}
          >
            <div className={"phone"}>8 (495) 234-22-44</div>
          </Col>
        </Row>
      </Footer>
    </Layout>
    <Slider/>
  </Layout>
}
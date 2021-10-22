import {Col, Layout, Row} from "antd";
import React from "react";
import './StartPage.css'
import {SideMenu} from "../common/SideMenu";
import {Slider} from "./components/Slider";
import {Header} from "../common/Header";
import {Link} from "react-router-dom";

const {Content, Footer} = Layout

export const StartPage = () => {
  return <Layout>
    <SideMenu/>
    <Layout className="site-layout">
      <Header/>
      <Content className="site-layout-background">
        <div className={"mainPageContent"}>
          <h1 className={"mainPageCompanyTitleOne"}>Каршеринг</h1>
          <p className={"mainPageCompanyTitleTwo"}>Need For Drive</p>
          <p className={"mainPageCompanySlogan"}>Поминутная аренда авто твоего города</p>
          <Link to="/orderPage">
            <button className={"defaultButton mainPageToBookButton"}>Забронировать</button>
          </Link>
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
import {Col, Layout, Row} from "antd";
import {EnvironmentOutlined} from "@ant-design/icons";
import React from "react";
import './Header.css'

export const Header = () => {
  return <Layout.Header className="mainPageHeader">
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
  </Layout.Header>
}
import {Input, Layout, Row, Space, Steps} from 'antd';
import {Header} from "../common/Header";
import {SideMenu} from "../common/SideMenu";
import './OrderPage.css'
import {useState} from "react";
import {Map, Placemark, YMaps} from "react-yandex-maps";

export const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(0)

  return <Layout>
    <SideMenu/>
    <Layout>
      <Header/>
      <Steps current={currentStep} className={"orderPageStepper"}>
        <Steps.Step title="Местоположение"/>
        <Steps.Step title="Модель"/>
        <Steps.Step title="Дополнительно"/>
        <Steps.Step title="Итого"/>
      </Steps>
      <Layout>
        <Layout.Content className={"orderPageContent"}>
          {currentStep === 0 &&
          <div>
            <div className={"locationGroup"}>
              <div className={"locationItem"}>
                <Space>
                  Город
                  <Input allowClear placeholder={"Начните вводить город"} style={{width: 300}}/>
                </Space>
              </div>
              <div className={"locationItem"}>
                <Space>
                  Пункт выдачи
                  <Input allowClear placeholder={"Начните вводить пункт"} style={{width: 300}}/>
                </Space>
              </div>
            </div>

            <YMaps>
              <Map defaultState={{center: [45.057008, 38.966096], zoom: 13}} width={"90%"} height={"600px"}>
                <Placemark geometry={[45.053424, 38.967237]}/>
                <Placemark geometry={[45.055857, 38.968707]}/>
                <Placemark geometry={[45.059707, 38.964920]}/>
                <Placemark geometry={[45.058245, 38.961605]}/>
              </Map>
            </YMaps>
          </div>
          }
        </Layout.Content>
        <Layout.Sider width={"35%"} className={"orderPageSider"}>
          <div className={"cheque"}>
            <b className={"chequeTitle"}>Ваш заказ:</b>
            <Row align={"middle"}>
              <p>Пункт выдачи</p>
              <div className={"chequeDots"}>{}</div>
              <p className={"chequeValue"}>Такой-то адрес в таком-то городе</p>
            </Row>
            <button className={"defaultButton orderPageButton"}>Выбрать модель</button>
          </div>
        </Layout.Sider>
      </Layout>
    </Layout>
  </Layout>
}
import {Grid, Layout, Row, Steps} from 'antd';
import {Header} from "../common/Header";
import {SideMenu} from "../common/SideMenu";
import './OrderPage.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLocations, getPoints} from "../../redux/locationReducer";
import {LocationStep} from "./stepTabs/LocationStep";

export const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [cityValue, setCityValue] = useState("")
  const [pointValue, setPointValue] = useState("")
  const [isMobile, setIsMobile] = useState(true)

  const pageSize = Grid.useBreakpoint()

  const locations = useSelector(state => state.orderPageLocation.locations)
  const points = useSelector(state => state.orderPageLocation.points)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLocations())
    dispatch(getPoints())
  }, [])

  useEffect(() => {
    if (pageSize.sm) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }, [pageSize])

  const updateCityValue = (value) => {
    setCityValue(value)
  }

  const updatePointValue = (value) => {
    setPointValue(value)
  }

  return <Layout className={"layout"}>
    <SideMenu/>
    <Layout>
      <Header/>
      <Steps
        current={currentStep}
        size={isMobile && "small"}
        className={"orderPageStepper"}
      >
        <Steps.Step title={isMobile ? "Место" : "Местоположение"}/>
        <Steps.Step title="Модель"/>
        <Steps.Step title={isMobile ? "Доп." : "Дополнительно"}/>
        <Steps.Step title="Итого"/>
      </Steps>
      <Layout>
        <Layout.Content className={"orderPageContent"}>
          {currentStep === 0 &&
          <LocationStep
            points={points}
            locations={locations}
            isMobile={isMobile}
            cityValue={cityValue}
            pointValue={pointValue}
            updateCityValue={updateCityValue}
            updatePointValue={updatePointValue}
          />
          }
        </Layout.Content>
        {!isMobile &&
        <Layout.Sider
          width={"35%"}
          className={"orderPageSider"}
        >
          <div className={"cheque"}>
            <b className={"chequeTitle"}>Ваш заказ:</b>
            <Row align={"middle"}>
              <p>Пункт выдачи</p>
              <div className={"chequeDots"}>{}</div>
              <div className={"chequeValue"}>
                {!!cityValue && !!pointValue && <p>{pointValue}, {cityValue}</p>}
              </div>
            </Row>
            <button className={"defaultButton orderPageButton"}>Выбрать модель</button>
          </div>
        </Layout.Sider>
        }
      </Layout>
    </Layout>
  </Layout>
}
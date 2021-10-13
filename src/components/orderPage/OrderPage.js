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
  const [isTablet, setIsTablet] = useState(true)

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
    if (pageSize.lg) {
      setIsTablet(false)
    } else {
      setIsTablet(true)
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
        responsive
        className={"orderPageStepper"}
      >
        <Steps.Step title="Местоположение"/>
        <Steps.Step title="Модель"/>
        <Steps.Step title="Дополнительно"/>
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
          {currentStep === 1 && <div>Модель</div>}
          {currentStep === 2 && <div>Дополнительно</div>}
          {currentStep === 3 && <div>Итого</div>}
        </Layout.Content>
        {!isMobile &&
        <Layout.Sider
          className={"orderPageSider"}
          width={isTablet ? "40%" : "35%"}
        >
          <div className={"cheque"}>
            <b className={"chequeTitle"}>Ваш заказ:</b>
            <Row align={"middle"}>
              <p className="chequeOption">Пункт выдачи</p>
              <div className={"chequeDots"}>{}</div>
              <div className={"chequeValue"}>
                {!!cityValue && !!pointValue && <p>{pointValue}, {cityValue}</p>}
              </div>
            </Row>
            {currentStep === 0 && <button
              className={"defaultButton orderPageButton"}
              disabled={!cityValue && !pointValue}
              onClick={() => setCurrentStep(currentStep + 1)}
            >Выбрать модель</button>}
            {currentStep === 1 && <button
              className={"defaultButton orderPageButton"}
              onClick={() => setCurrentStep(currentStep + 1)}
            >Доп опции</button>}
            {currentStep === 2 && <button
              className={"defaultButton orderPageButton"}
              onClick={() => setCurrentStep(currentStep + 1)}
            >Подтвердить заказ</button>}
            {currentStep === 3 && <button
              className={"defaultButton orderPageButton"}
            >Та да!</button>}
          </div>
        </Layout.Sider>
        }
      </Layout>
    </Layout>
  </Layout>
}
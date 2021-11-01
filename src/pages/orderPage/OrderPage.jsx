import React from "react";
import {Grid, Layout, Steps} from 'antd';
import {Header} from "../common/Header";
import {SideMenu} from "../common/SideMenu";
import './OrderPage.css'
import {useEffect, useState} from "react";
import {LocationStep} from "./stepTabs/locationStep/LocationStep";
import {Cheque} from "./components/cheque/Cheque";
import {CarStep} from "./stepTabs/carStep/CarStep";
import {AddonStep} from "./stepTabs/addonStep/AddonStep";
import {InTotalStep} from "./stepTabs/inTotalStep/InTotalStep";
import {ConfirmOrder} from "./components/ConfirmOrder";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOrderByID} from "../../redux/chequeReducer";

export const OrderPage = () => {
  const urlParams = useParams()
  const history = useHistory()
  const pageSize = Grid.useBreakpoint()
  const dispatch = useDispatch()

  const [currentStep, setCurrentStep] = useState(0)
  const [lastActualStep, setLastActualStep] = useState(0)
  const [isMobile, setIsMobile] = useState(true)
  const [isTablet, setIsTablet] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const myOrder = useSelector(state => state.cheque.order)
  const cheque = useSelector(state => state.cheque.chequeData)

  useEffect(() => {
    dispatch(getOrderByID(urlParams.orderID))
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

  useEffect(() => {
    if (myOrder) {
      history.push(`/orderPage/${myOrder?.id}`)
      setCurrentStep(3)
      setLastActualStep(3)
    }
  }, [myOrder])

  const stepsOnChangeHandler = (step) => {
    if (
      (step <= currentStep) ||
      (step === 1 && cheque.city && cheque.address) ||
      (step === 2 && cheque.car) ||
      (step === 3 && cheque.color && cheque.date && cheque.tariff)
    ) {
      setCurrentStep(step)
    }

    if (
      (step === lastActualStep + 1) && (
        (lastActualStep === 0 && cheque.city && cheque.address) ||
        (lastActualStep === 1 && cheque.car) ||
        (lastActualStep === 2 && cheque.color && cheque.date && cheque.tariff)
      )
    ) {
      setLastActualStep((step))
    }
  }

  return <Layout className={"layout"}>
    <SideMenu/>
    <Layout>
      <Header/>
      {urlParams.orderID
        ? <p className={"orderNumber"}>Заказ номер {urlParams.orderID}</p>
        : <Steps
          current={currentStep}
          responsive
          className={"orderPageStepper"}
          onChange={stepsOnChangeHandler}
        >
          <Steps.Step title="Местоположение"/>
          <Steps.Step title="Модель"/>
          <Steps.Step title="Дополнительно"/>
          <Steps.Step title="Итого"/>
        </Steps>
      }
      <Layout>
        <Layout.Content className={"orderPageContent"}>
          {currentStep === 0 && <LocationStep/>}
          {currentStep === 1 && <CarStep/>}
          {currentStep === 2 && <AddonStep isMobile={isMobile}/>}
          {currentStep === 3 && <InTotalStep/>}
        </Layout.Content>
        {!isMobile &&
        <Layout.Sider
          className={"orderPageSider"}
          width={isTablet ? "40%" : "35%"}
        >
          <Cheque
            currentStep={currentStep}
            lastActualStep={lastActualStep}
            updateCurrentStep={setCurrentStep}
            setLastActualStep={setLastActualStep}
            setIsModalOpen={setIsModalOpen}
          />
        </Layout.Sider>
        }
      </Layout>
      {isMobile &&
      <Cheque
        currentStep={currentStep}
        lastActualStep={lastActualStep}
        updateCurrentStep={setCurrentStep}
        setLastActualStep={setLastActualStep}
        setIsModalOpen={setIsModalOpen}
      />}
    </Layout>
    {isModalOpen && <ConfirmOrder setIsModalOpen={setIsModalOpen}/>}
  </Layout>
}
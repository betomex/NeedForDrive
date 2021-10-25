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

  const [currentStep, setCurrentStep] = useState(0)
  const [isMobile, setIsMobile] = useState(true)
  const [isTablet, setIsTablet] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const myOrder = useSelector(state => state.cheque.order)
  const cheque = useSelector(state => state.cheque.chequeData)

  const pageSize = Grid.useBreakpoint()
  const dispatch = useDispatch()

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
    if (myOrder !== null) {
      history.push(`/orderPage/${myOrder?.id}`)
      setCurrentStep(3)
    }
  }, [myOrder])

  const stepsOnChangeHandler = (step) => {
    if ((step <= currentStep) ||
      (step === 1 && cheque.city && cheque.address) ||
      (step === 2 && cheque.car) ||
      (step === 3 && cheque.color && cheque.date && cheque.tariff)
    ) {
      setCurrentStep(step)
    }
  }

  return <Layout className={"layout"}>
    <SideMenu/>
    <Layout>
      <Header/>
      {!!urlParams.orderID
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
          {currentStep === 3 && <InTotalStep urlParams={urlParams}/>}
        </Layout.Content>
        {!isMobile &&
        <Layout.Sider
          className={"orderPageSider"}
          width={isTablet ? "40%" : "35%"}
        >
          <Cheque
            currentStep={currentStep}
            updateCurrentStep={setCurrentStep}
            setIsModalOpen={setIsModalOpen}
            urlParams={urlParams}
          />
        </Layout.Sider>
        }
      </Layout>
      {isMobile &&
      <Cheque
        currentStep={currentStep}
        updateCurrentStep={setCurrentStep}
        setIsModalOpen={setIsModalOpen}
        urlParams={urlParams}
      />}
    </Layout>
    {isModalOpen && <ConfirmOrder setIsModalOpen={setIsModalOpen}/>}
  </Layout>
}
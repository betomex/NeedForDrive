import {Grid, Layout, Steps} from 'antd';
import {Header} from "../common/Header";
import {SideMenu} from "../common/SideMenu";
import './OrderPage.css'
import {useEffect, useState} from "react";
import {LocationStep} from "./stepTabs/locationStep/LocationStep";
import {Cheque} from "./components/Cheque";
import {CarStep} from "./stepTabs/carStep/CarStep";
import {AddonStep} from "./stepTabs/addonStep/AddonStep";
import {InTotalStep} from "./stepTabs/inTotalStep/InTotalStep";
import {ConfirmOrder} from "./components/ConfirmOrder";

export const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isMobile, setIsMobile] = useState(true)
  const [isTablet, setIsTablet] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const pageSize = Grid.useBreakpoint()

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

  const updateCurrentStep = (step) => {
    setCurrentStep(step)
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
            updateCurrentStep={updateCurrentStep}
            setIsModalOpen={setIsModalOpen}
          />
        </Layout.Sider>
        }
      </Layout>
      {isMobile &&
      <Cheque
        currentStep={currentStep}
        updateCurrentStep={updateCurrentStep}
        setIsModalOpen={setIsModalOpen}
      />}
    </Layout>
    {isModalOpen && <ConfirmOrder setIsModalOpen={setIsModalOpen}/>}
  </Layout>
}
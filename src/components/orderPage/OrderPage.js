import {Grid, Layout, Steps} from 'antd';
import {Header} from "../common/Header";
import {SideMenu} from "../common/SideMenu";
import './OrderPage.css'
import {useEffect, useState} from "react";
import {LocationStep} from "./stepTabs/LocationStep";
import {Cheque} from "./Cheque";
import {CarStep} from "./stepTabs/CarStep";

export const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isMobile, setIsMobile] = useState(true)
  const [isTablet, setIsTablet] = useState(true)

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
          {currentStep === 2 && <div>Дополнительно</div>}
          {currentStep === 3 && <div>Итого</div>}
        </Layout.Content>
        {!isMobile &&
        <Layout.Sider
          className={"orderPageSider"}
          width={isTablet ? "40%" : "35%"}
        >
          <Cheque
            currentStep={currentStep}
            updateCurrentStep={updateCurrentStep}
          />
        </Layout.Sider>
        }
      </Layout>
      {isMobile && <Cheque
        currentStep={currentStep}
        updateCurrentStep={updateCurrentStep}/>
      }
    </Layout>
  </Layout>
}
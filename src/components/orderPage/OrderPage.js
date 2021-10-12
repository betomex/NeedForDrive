import {AutoComplete, Layout, Row, Space, Steps} from 'antd';
import {Header} from "../common/Header";
import {SideMenu} from "../common/SideMenu";
import './OrderPage.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {getLocations, getPoints} from "../../redux/locationReducer";

export const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [cityValue, setCityValue] = useState("")
  const [pointValue, setPointValue] = useState("")
  const [pointOptions, setPointOptions] = useState([])

  const locations = useSelector(state => state.orderPageLocation.locations)
  const points = useSelector(state => state.orderPageLocation.points)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLocations())
    dispatch(getPoints())
  }, [])

  useEffect(() => {
    let options = points.filter(p => p.cityId?.name === cityValue).map(p => ({"value": p.address}))
    setPointOptions(options)
  }, [cityValue])

  const locationOptions = locations.map(l => ({"value": l.name}))

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
                  <AutoComplete style={{width: 300}} allowClear options={locationOptions} value={cityValue}
                                onChange={(e) => {
                                  setCityValue(e)
                                }}
                                placeholder="Начните вводить город"
                                filterOption={(inputValue, option) =>
                                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                  />
                </Space>
              </div>
              <div className={"locationItem"}>
                <Space>
                  Пункт выдачи
                  <AutoComplete style={{width: 300}} allowClear options={pointOptions} value={pointValue}
                                onChange={(e) => {
                                  setPointValue(e)
                                }}
                                disabled={!cityValue || pointOptions.length === 0}
                                placeholder="Начните вводить пункт"
                                filterOption={(inputValue, option) =>
                                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                  />
                </Space>
              </div>
            </div>

            <YMaps>
              <Map defaultState={{center: [45.057008, 38.966096], zoom: 13}} className={"map"}>
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
              <div className={"chequeValue"}>{!!cityValue && !!pointValue && <p>{pointValue} {cityValue}</p>}</div>
            </Row>
            <button className={"defaultButton orderPageButton"}>Выбрать модель</button>
          </div>
        </Layout.Sider>
      </Layout>
    </Layout>
  </Layout>
}
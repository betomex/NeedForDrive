import {AutoComplete, Grid, Layout, Row, Space, Steps} from 'antd';
import {Header} from "../common/Header";
import {SideMenu} from "../common/SideMenu";
import './OrderPage.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {getLocations, getPoints} from "../../redux/locationReducer";

export const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [cityValue, setCityValue] = useState("")
  const [pointValue, setPointValue] = useState("")
  const [pointOptions, setPointOptions] = useState([])
  const [isMobile, setIsMobile] = useState(true)
  const [ymaps, setYmaps] = useState(null)
  const [coords, setCoords] = useState([45.053424, 38.967237])

  const pageSize = Grid.useBreakpoint()
  const map = useRef();

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

    if (!!cityValue) {
      ymaps?.geocode(cityValue).then(r => {
        setCoords(r.geoObjects.get(0).geometry.getCoordinates())
      })
    }
  }, [cityValue])

  useEffect(() => {
    if (pageSize.sm) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }, [pageSize])

  useEffect(() => {
    myPanTo(coords)
  }, [coords])

  const locationOptions = locations.map(l => ({"value": l.name}))

  const myPanTo = coordinates => {
    map.current?.panTo(coordinates);
  };

  return <Layout className={"layout"}>
    <SideMenu/>
    <Layout>
      <Header/>
      <Steps current={currentStep} size={isMobile && "small"} className={"orderPageStepper"}>
        <Steps.Step title={isMobile ? "Место" : "Местоположение"}/>
        <Steps.Step title="Модель"/>
        <Steps.Step title={isMobile ? "Доп." : "Дополнительно"}/>
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
                  <AutoComplete className={"autocomplete"} allowClear options={locationOptions} value={cityValue}
                                onChange={(e) => {
                                  setCityValue(e)
                                  setPointValue("")
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
                  <AutoComplete className={"autocomplete"} allowClear options={pointOptions} value={pointValue}
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

            <YMaps query={{
              lang: "ru_RU",
              ns: "geocode",
              apikey: "fc475af3-70e8-49b3-b7fe-ddca506b0367",
              load: ["geocode"]
            }}>
              <Map defaultState={{center: [45.053424, 38.967237], zoom: 11}} className={"map"} instanceRef={map}
                   onLoad={ymaps => setYmaps(ymaps)}>
                <Placemark geometry={[45.053424, 38.967237]}/>
                <Placemark geometry={[45.055857, 38.968707]}/>
                <Placemark geometry={[45.059707, 38.964920]}/>
                <Placemark geometry={[45.058245, 38.961605]}/>
              </Map>
            </YMaps>

            {isMobile && <button className={"defaultButton orderPageButton mobileButton"}>Выбрать модель</button>}
          </div>
          }
        </Layout.Content>
        {!isMobile &&
        <Layout.Sider width={"35%"} className={"orderPageSider"}>
          <div className={"cheque"}>
            <b className={"chequeTitle"}>Ваш заказ:</b>
            <Row align={"middle"}>
              <p>Пункт выдачи</p>
              <div className={"chequeDots"}>{}</div>
              <div className={"chequeValue"}>{!!cityValue && !!pointValue && <p>{pointValue}, {cityValue}</p>}</div>
            </Row>
            <button className={"defaultButton orderPageButton"}>Выбрать модель</button>
          </div>
        </Layout.Sider>
        }
      </Layout>
    </Layout>
  </Layout>
}
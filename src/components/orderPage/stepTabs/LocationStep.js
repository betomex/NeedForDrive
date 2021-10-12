import {useEffect, useRef, useState} from "react";
import {AutoComplete, Space} from "antd";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import './LocationStep.css'

export const LocationStep = ({
                               points,
                               locations,
                               isMobile,
                               cityValue,
                               pointValue,
                               updateCityValue,
                               updatePointValue
                             }) => {
  const [pointOptions, setPointOptions] = useState([])
  const [ymaps, setYmaps] = useState(null)
  const [coords, setCoords] = useState([45.053424, 38.967237])

  const map = useRef();

  useEffect(() => {
    let options = points
      .filter(p => p.cityId?.name === cityValue)
      .map(p => ({"value": p.address}))
    setPointOptions(options)

    if (!!cityValue) {
      ymaps?.geocode(cityValue).then(r => {
        setCoords(r.geoObjects.get(0).geometry.getCoordinates())
      })
    }
  }, [cityValue])

  useEffect(() => {
    myPanTo(coords)
  }, [coords])

  const locationOptions = locations.map(l => ({"value": l.name}))

  const myPanTo = coordinates => {
    map.current?.panTo(coordinates);
  };

  return <div>
    <div className={"locationGroup"}>
      <div className={"locationItem"}>
        <Space>
          Город
          <AutoComplete
            className={"autocomplete"}
            allowClear
            options={locationOptions}
            value={cityValue}
            onChange={(e) => {
              updateCityValue(e)
              updatePointValue("")
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
          <AutoComplete
            className={"autocomplete"}
            allowClear
            options={pointOptions}
            value={pointValue}
            onChange={(e) => {
              updatePointValue(e)
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
      <Map
        defaultState={{center: [45.053424, 38.967237], zoom: 11}}
        className={"map"}
        instanceRef={map}
        onLoad={ymaps => setYmaps(ymaps)}
      >
        <Placemark geometry={[45.053424, 38.967237]}/>
        <Placemark geometry={[45.055857, 38.968707]}/>
        <Placemark geometry={[45.059707, 38.964920]}/>
        <Placemark geometry={[45.058245, 38.961605]}/>
      </Map>
    </YMaps>

    {isMobile && <button className={"defaultButton orderPageButton mobileButton"}>Выбрать модель</button>}
  </div>
}
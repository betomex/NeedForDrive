import {useEffect, useState} from "react";
import {AutoComplete, Space} from "antd";
import './LocationStep.css'
import {MyMap} from "../../common/MyMap";

export const LocationStep = (props) => {
  const {points, locations, cityValue, pointValue, updateCityValue, updatePointValue} = props

  const [pointOptions, setPointOptions] = useState([])

  useEffect(() => {
    const options = points
      .filter(p => p.cityId?.name === cityValue)
      .map(p => ({"value": p.address}))
    setPointOptions(options)
  }, [cityValue])

  const locationOptions = locations.map(l => ({"value": l.name}))

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
            onChange={updatePointValue}
            disabled={!cityValue || pointOptions.length === 0}
            placeholder="Начните вводить пункт"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        </Space>
      </div>
    </div>

    <MyMap
      cityValue={cityValue}
      points={points}
      pointValue={pointValue}
      updatePointValue={updatePointValue}
    />
  </div>
}
import {useEffect, useState} from "react";
import {AutoComplete, Space} from "antd";
import './LocationStep.css'
import {MyMap} from "./MyMap";
import {useDispatch, useSelector} from "react-redux";
import {updateChequePoint} from "../../../../redux/chequeReducer";
import {getLocations, getPoints} from "../../../../redux/locationReducer";

export const LocationStep = () => {
  const [pointOptions, setPointOptions] = useState([])

  const dispatch = useDispatch()
  const locations = useSelector(state => state.orderPageLocation.locations)
  const points = useSelector(state => state.orderPageLocation.points)
  const chequeData = useSelector(state => state.cheque.chequeData)
  const {city, address} = chequeData

  useEffect(() => {
    dispatch(getLocations())
    dispatch(getPoints())
  }, [])

  useEffect(() => {
    const options = points
      .filter(point => point.cityId?.name === city)
      .map(point => ({"value": point.address}))
    setPointOptions(options)
  }, [city])

  const locationOptions = locations.map(location => ({"value": location.name}))

  return <div>
    <div className={"locationGroup"}>
      <div className={"locationItem"}>
        <Space>
          Город
          <AutoComplete
            className={"autocomplete"}
            allowClear
            options={locationOptions}
            value={city}
            onChange={(e) => dispatch(updateChequePoint(e, ""))}
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
            value={address}
            onChange={(e) => dispatch(updateChequePoint(city, e))}
            disabled={!city || pointOptions.length === 0}
            placeholder="Начните вводить пункт"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        </Space>
      </div>
    </div>

    <MyMap
      cityValue={city}
      points={points}
      pointValue={address}
    />
  </div>
}
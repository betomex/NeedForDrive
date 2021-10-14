import {useEffect, useState} from "react";
import {AutoComplete, Space} from "antd";
import './LocationStep.css'
import {MyMap} from "../../common/MyMap";
import {useDispatch, useSelector} from "react-redux";
import {updateChequePoint} from "../../../redux/chequeReducer";
import {getLocations, getPoints} from "../../../redux/locationReducer";

export const LocationStep = () => {
  const [pointOptions, setPointOptions] = useState([])

  const dispatch = useDispatch()
  const locations = useSelector(state => state.orderPageLocation.locations)
  const points = useSelector(state => state.orderPageLocation.points)
  const cityValue = useSelector(state => state.cheque.chequeData.city.value)
  const pointValue = useSelector(state => state.cheque.chequeData.address.value)

  useEffect(() => {
    dispatch(getLocations())
    dispatch(getPoints())
  }, [])

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
            value={pointValue}
            onChange={(e) => dispatch(updateChequePoint(cityValue, e))}
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
    />
  </div>
}
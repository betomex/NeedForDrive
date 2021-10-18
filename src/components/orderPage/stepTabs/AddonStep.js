import './AddonStep.css'
import {Checkbox, ConfigProvider, DatePicker, Radio, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import locale from 'antd/es/date-picker/locale/ru_RU';
import {getTariff} from "../../../redux/addonReducer";
import {
  updateChequeIsFullTank,
  updateChequeIsNeedChildChair,
  updateChequeIsRightWheel,
  updateChequeColor, updateChequeDate,
  updateChequeTariff
} from "../../../redux/chequeReducer";

export const AddonStep = (props) => {
  const {isMobile} = props

  const [radioColor, setRadioColor] = useState(null)
  const [radioTariff, setRadioTariff] = useState(null)
  const [tankChecked, setTankChecked] = useState(false)
  const [childChairChecked, setChildChairChecked] = useState(false)
  const [rightWheelChecked, setRightWheelChecked] = useState(false)

  const chequeData = useSelector(state => state.cheque.chequeData)
  const tariffs = useSelector(state => state.orderPageAddons.tariffs)
  const {car} = chequeData

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTariff())
  }, [])

  useEffect(() => {
    dispatch(updateChequeTariff(radioTariff))
  }, [radioTariff])

  useEffect(() => {
    dispatch(updateChequeColor(radioColor))
  }, [radioColor])

  useEffect(() => {
    const tankPrice = tankChecked ? 500 : 0
    dispatch(updateChequeIsFullTank(tankPrice))
  }, [tankChecked])

  useEffect(() => {
    const childChairPrice = childChairChecked ? 200 : 0
    dispatch(updateChequeIsNeedChildChair(childChairPrice))
  }, [childChairChecked])

  useEffect(() => {
    const rightWheelPrice = rightWheelChecked ? 1600 : 0
    dispatch(updateChequeIsRightWheel(rightWheelPrice))
  }, [rightWheelChecked])

  return <div>
    <p className={"pickerTitle"}>Цвет</p>
    <Radio.Group>
      {car?.colors.map((color, index) =>
        <Radio
          value={color}
          key={index}
          onClick={() => setRadioColor(color)}
        >{color}</Radio>)}
    </Radio.Group>

    <p className={"pickerTitle"}>Дата аренды</p>
    <ConfigProvider locale={locale}>
      <DatePicker.RangePicker
        className={"dateTimePicker"}
        size={isMobile && "small"}
        showTime
        placeholder={["Дата-время С", "Дата-время До"]}
        onChange={(e) => {
          dispatch(updateChequeDate(e))
        }}
      />
    </ConfigProvider>

    <p className={"pickerTitle"}>Тариф</p>
    <Radio.Group>
      <Space direction="vertical">
        {tariffs.map(tariff =>
          <Radio
            value={tariff.rateTypeId.name}
            key={tariff.id}
            onClick={() => setRadioTariff(tariff)}
          >
            {tariff.rateTypeId.name}, {tariff.price}₽/{tariff.rateTypeId.unit}
          </Radio>
        )}
      </Space>
    </Radio.Group>

    <p className={"pickerTitle"}>Доп услуги</p>
    <Checkbox.Group>
      <Space direction={"vertical"}>
        <Checkbox
          value={1}
          checked={tankChecked}
          onChange={() => setTankChecked(!tankChecked)}
        >Полный бак, 500р</Checkbox>
        <Checkbox
          value={2}
          checked={childChairChecked}
          onChange={() => setChildChairChecked(!childChairChecked)}
        >Детское кресло, 200р</Checkbox>
        <Checkbox
          value={3}
          checked={rightWheelChecked}
          onChange={() => setRightWheelChecked(!rightWheelChecked)}
        >Правый руль, 1600р</Checkbox>
      </Space>
    </Checkbox.Group>
  </div>
}
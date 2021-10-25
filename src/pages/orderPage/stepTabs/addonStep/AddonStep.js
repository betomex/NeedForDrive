import './AddonStep.css'
import {Checkbox, ConfigProvider, DatePicker, Radio, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import locale from 'antd/es/date-picker/locale/ru_RU';
import {getTariff} from "../../../../redux/addonReducer";
import {
  updateChequeColor,
  updateChequeDate,
  updateChequeIsFullTank,
  updateChequeIsNeedChildChair,
  updateChequeIsRightWheel,
  updateChequeTariff
} from "../../../../redux/chequeReducer";
import {childChairPrice, fullTankPrice, rightWheelPrice} from "../../../../lib/constants";

export const AddonStep = (props) => {
  const {isMobile} = props

  const chequeData = useSelector(state => state.cheque.chequeData)
  const tariffs = useSelector(state => state.orderPageAddons.tariffs)
  const {car, isFullTank, isNeedChildChair, isRightWheel} = chequeData

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTariff())
  }, [])

  console.log(isFullTank, isNeedChildChair, isRightWheel)

  return <div>
    <p className={"pickerTitle"}>Цвет</p>
    <Radio.Group>
      {car?.colors.map((color, index) =>
        <Radio
          value={color}
          key={index}
          onClick={() => dispatch(updateChequeColor(color))}
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
            onClick={() => dispatch(updateChequeTariff(tariff))}
          >
            {tariff.rateTypeId.name}, {tariff.price}₽/{tariff.rateTypeId.unit}
          </Radio>
        )}
      </Space>
    </Radio.Group>

    <p className={"pickerTitle"}>Доп услуги</p>
    <Space direction={"vertical"}>
      <Checkbox
        value={1}
        checked={isFullTank}
        onChange={(e) => {
          const price = e.target.checked ? fullTankPrice : 0
          dispatch(updateChequeIsFullTank(price))
        }}
      >Полный бак, {fullTankPrice}р</Checkbox>
      <Checkbox
        value={2}
        checked={isNeedChildChair}
        onChange={(e) => {
          const price = e.target.checked ? childChairPrice : 0
          dispatch(updateChequeIsNeedChildChair(price))
        }}
      >Детское кресло, {childChairPrice}р</Checkbox>
      <Checkbox
        value={3}
        checked={isRightWheel}
        onChange={(e) => {
          const price = e.target.checked ? rightWheelPrice : 0
          dispatch(updateChequeIsRightWheel(price))
        }}
      >Правый руль, {rightWheelPrice}р</Checkbox>
    </Space>
  </div>
}
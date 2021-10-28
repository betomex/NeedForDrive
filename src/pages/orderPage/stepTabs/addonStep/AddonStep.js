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
  const {car, color, date, tariff, isFullTank, isNeedChildChair, isRightWheel} = chequeData

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTariff())
  }, [])

  return <div>
    <p className={"pickerTitle"}>Цвет</p>
    {car?.colors.map((colorOption, index) =>
      <Radio
        checked={color === colorOption}
        value={colorOption}
        key={index}
        onClick={() => dispatch(updateChequeColor(colorOption))}
      >{colorOption}</Radio>)
    }

    <p className={"pickerTitle"}>Дата аренды</p>
    <ConfigProvider locale={locale}>
      <DatePicker.RangePicker
        value={date}
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
    <Space direction="vertical">
      {tariffs.map(tariffOption =>
        <Radio
          checked={tariff?.rateTypeId.name === tariffOption.rateTypeId.name}
          value={tariffOption.rateTypeId.name}
          key={tariffOption.id}
          onClick={() => dispatch(updateChequeTariff(tariffOption))}
        >
          {tariffOption.rateTypeId.name}, {tariffOption.price}₽/{tariffOption.rateTypeId.unit}
        </Radio>
      )}
    </Space>

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
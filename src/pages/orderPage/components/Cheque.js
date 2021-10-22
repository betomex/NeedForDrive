import {Row} from "antd";
import './Cheque.css'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {dateFormat} from "../../../lib/utils";

export const Cheque = (props) => {
  const {currentStep, updateCurrentStep, setIsModalOpen} = props

  const [times, setTimes] = useState(null)
  const [timeDif, setTimeDif] = useState(null)

  const chequeData = useSelector(state => state.cheque.chequeData)
  const chequePrices = useSelector(state => state.cheque.chequePrices)
  const {city, address, car, tariff, color, date, isFullTank, isNeedChildChair, isRightWheel} = chequeData
  const {carPrice, tankPrice, childChairPrice, rightWheelPrice} = chequePrices
  const chequeFinalPrice = carPrice + tankPrice + childChairPrice + rightWheelPrice +
    ((tariff?.price ? tariff.price : 0) * Math.trunc(timeDif / 1000 / 60))

  useEffect(() => {
    let formattedDate = {
      timeDif: 0,
      times: {}
    }
    if (date) formattedDate = dateFormat(date)
    setTimeDif(formattedDate.timeDif)
    setTimes(formattedDate.times)
  }, [date])

  return <div className={"cheque"}>
    <b className={"chequeTitle"}>Ваш заказ:</b>

    <ChequeOption
      title={"Пункт выдачи"}
      text={address?.address + ", " + city?.name}
      condition={!!city?.name && !!address?.address}
    />

    {currentStep >= 1 &&
    <ChequeOption
      title={"Модель"}
      text={car?.name}
      condition={!!car}
    />
    }

    {currentStep >= 2 && <div>
      <ChequeOption
        title={"Цвет"}
        text={color}
        condition={!!color}
      />

      <ChequeOption
        title={"Длительность аренды"}
        text={times?.d + "д. " + times?.h + "ч. " + times?.m + "м."}
        condition={!!times}
      />

      <ChequeOption
        title={"Тариф"}
        text={tariff?.rateTypeId.name}
        condition={!!tariff}
      />

      {isFullTank &&
      <ChequeOption
        title={"Полный бак"}
        text={"Да"}
        condition={true}
      />}

      {isNeedChildChair &&
      <ChequeOption
        title={"Детское кресло"}
        text={"Да"}
        condition={true}
      />}

      {isRightWheel &&
      <ChequeOption
        title={"Правый руль"}
        text={"Да"}
        condition={true}
      />}
    </div>}

    {currentStep >= 1 &&
    <p className={"chequePrice"}>Цена: {chequeFinalPrice}₽</p>
    }

    <CurrentStepButton
      city={city?.name}
      address={address?.address}
      car={car}
      currentStep={currentStep}
      updateCurrentStep={updateCurrentStep}
      color={color}
      date={date}
      tariff={tariff}
      setIsModalOpen={setIsModalOpen}
    />
  </div>
}

const CurrentStepButton = (props) => {
  const {city, address, car, currentStep, updateCurrentStep, color, date, tariff, setIsModalOpen} = props

  switch (currentStep) {
    case 0:
      return <button
        className={"defaultButton orderPageButton"}
        disabled={!city || !address}
        onClick={() => updateCurrentStep(currentStep + 1)}
      >Выбрать модель</button>
    case 1:
      return <button
        className={"defaultButton orderPageButton"}
        disabled={!car}
        onClick={() => updateCurrentStep(currentStep + 1)}
      >Дополнительно</button>
    case 2:
      return <button
        className={"defaultButton orderPageButton"}
        disabled={!color || !date || !tariff}
        onClick={() => updateCurrentStep(currentStep + 1)}
      >Итого</button>
    case 3:
      return <button
        className={"defaultButton orderPageButton"}
        onClick={() => setIsModalOpen(true)}
      >Заказать</button>
    default:
      return
  }
}

const ChequeOption = (props) => {
  const {title, text, condition} = props

  return <Row align={"middle"}>
    <p className="chequeOption">{title}</p>
    <div className={"chequeDots"}/>
    <div className={"chequeValue"}>
      {condition && <p>{text}</p>}
    </div>
  </Row>
}
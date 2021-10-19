import {Row} from "antd";
import './Cheque.css'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export const Cheque = (props) => {
  const {currentStep, updateCurrentStep} = props

  const [times, setTimes] = useState(null)
  const [timeDif, setTimeDif] = useState(null)

  const chequeData = useSelector(state => state.cheque.chequeData)
  const chequePrices = useSelector(state => state.cheque.chequePrices)
  const {city, address, car, tariff, color, date, isFullTank, isNeedChildChair, isRightWheel} = chequeData
  const {carPrice, tankPrice, childChairPrice, rightWheelPrice} = chequePrices
  const chequeFinalPrice = carPrice + tankPrice + childChairPrice + rightWheelPrice +
    ((tariff?.price ? tariff.price : 0) * Math.trunc(timeDif / 1000 / 60))

  useEffect(() => {
    const tempTimeDif = date ? date[1].toDate().getTime() - date[0].toDate().getTime() : 0
    const tempTimes = {
      d: Math.round(tempTimeDif / 1000 / 60 / 60 / 24),
      h: Math.round(tempTimeDif / 1000 / 60 / 60 % 24),
      m: Math.round(tempTimeDif / 1000 / 60 % 60)
    }
    setTimeDif(tempTimeDif)
    setTimes(tempTimes)
  }, [date])

  return <div className={"cheque"}>
    <b className={"chequeTitle"}>Ваш заказ:</b>

    <Row align={"middle"}>
      <p className="chequeOption">Пункт выдачи</p>
      <div className={"chequeDots"}/>
      <div className={"chequeValue"}>
        {!!city && !!address && <p>{address}, {city}</p>}
      </div>
    </Row>

    {currentStep >= 1 &&
    <Row align={"middle"}>
      <p className="chequeOption">Модель</p>
      <div className={"chequeDots"}/>
      <div className={"chequeValue"}>
        {!!car && <p>{car?.name}</p>}
      </div>
    </Row>
    }

    {currentStep >= 2 && <div>
      <Row align={"middle"}>
        <p className="chequeOption">Цвет</p>
        <div className={"chequeDots"}/>
        <div className={"chequeValue"}>
          {!!color && <p>{color}</p>}
        </div>
      </Row>

      <Row align={"middle"}>
        <p className="chequeOption">Длительность аренды</p>
        <div className={"chequeDots"}/>
        <div className={"chequeValue"}>
          {!!times && <p>{times.d}д. {times.h}ч. {times.m}м.</p>}
        </div>
      </Row>

      <Row align={"middle"}>
        <p className="chequeOption">Тариф</p>
        <div className={"chequeDots"}/>
        <div className={"chequeValue"}>
          {!!tariff && <p>{tariff.rateTypeId.name}</p>}
        </div>
      </Row>

      {!isFullTank &&
      <Row align={"middle"}>
        <p className="chequeOption">Полный бак</p>
        <div className={"chequeDots"}/>
        <div className={"chequeValue"}>
          <p>Да</p>
        </div>
      </Row>}

      {!isNeedChildChair &&
      <Row align={"middle"}>
        <p className="chequeOption">Детское кресло</p>
        <div className={"chequeDots"}/>
        <div className={"chequeValue"}>
          <p>Да</p>
        </div>
      </Row>}

      {!isRightWheel &&
      <Row align={"middle"}>
        <p className="chequeOption">Правый руль</p>
        <div className={"chequeDots"}/>
        <div className={"chequeValue"}>
          <p>Да</p>
        </div>
      </Row>}
    </div>}

    {currentStep >= 1 &&
    <p className={"chequePrice"}>Цена: {chequeFinalPrice}₽</p>
    }

    <CurrentStepButton
      city={city}
      address={address}
      car={car}
      currentStep={currentStep}
      updateCurrentStep={updateCurrentStep}
      color={color}
      date={date}
      tariff={tariff}
    />
  </div>
}

const CurrentStepButton = (props) => {
  const {city, address, car, currentStep, updateCurrentStep, color, date, tariff} = props

  switch (currentStep) {
    case 0:
      return <button
        className={"defaultButton orderPageButton"}
        disabled={!city && !address}
        onClick={() => updateCurrentStep(currentStep + 1)}
      >Выбрать модель</button>
    case 1:
      return <button
        className={"defaultButton orderPageButton"}
        disabled={!car}
        onClick={() => updateCurrentStep(currentStep + 1)}
      >Доп опции</button>
    case 2:
      return <button
        className={"defaultButton orderPageButton"}
        disabled={!color && !date && !tariff}
        onClick={() => updateCurrentStep(currentStep + 1)}
      >Подтвердить заказ</button>
    case 3:
      return <button
        className={"defaultButton orderPageButton"}
      >Та да!</button>
    default:
      return
  }
}
import './Cheque.css'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {dateFormat} from "../../../../lib/utils";
import {ChequeOption} from "./ChequeOption";
import {CurrentStepButton} from "./CurrentStepButton";

export const Cheque = (props) => {
  const {currentStep, updateCurrentStep, setIsModalOpen, urlParams} = props

  const [times, setTimes] = useState(null)
  const [timeDif, setTimeDif] = useState(null)

  const chequeData = useSelector(state => state.cheque.chequeData)
  const chequePrices = useSelector(state => state.cheque.chequePrices)
  const myOrder = useSelector(state => state.cheque.order)
  const {city, address, car, tariff, color, date, isFullTank, isNeedChildChair, isRightWheel} = chequeData
  const {carPrice, tankPrice, childChairPrice, rightWheelPrice} = chequePrices

  const chequeFinalPrice = carPrice + tankPrice + childChairPrice + rightWheelPrice +
    ((tariff?.price ? tariff.price : 0) * Math.trunc(timeDif / 1000 / 60))
  const tempTimeDif = myOrder?.dateTo - myOrder?.dateFrom

  useEffect(() => {
    let formattedDate = {
      timeDif: 0,
      times: {}
    }
    if (date) formattedDate = dateFormat(date)
    if (myOrder) formattedDate = dateFormat([], tempTimeDif)
    setTimeDif(formattedDate.timeDif)
    setTimes(formattedDate.times)
  }, [date, myOrder])

  return <div className={"cheque"}>
    <b className={"chequeTitle"}>Ваш заказ:</b>

    <ChequeOption
      title={"Пункт выдачи"}
      text={!myOrder
        ? address?.address + ", " + city?.name
        : myOrder.cityId.name + ", " + myOrder.pointId.address
      }
      condition={(!!city?.name && !!address?.address) || myOrder}
    />

    {currentStep >= 1 &&
    <ChequeOption
      title={"Модель"}
      text={car?.name || myOrder?.carId.name}
      condition={!!car || myOrder}
    />
    }

    {currentStep >= 2 && <div>
      <ChequeOption
        title={"Цвет"}
        text={color || myOrder?.color}
        condition={!!color || myOrder}
      />

      <ChequeOption
        title={"Длительность аренды"}
        text={times?.d + "д. " + times?.h + "ч. " + times?.m + "м."}
        condition={!!times}
      />

      <ChequeOption
        title={"Тариф"}
        text={tariff?.rateTypeId.name || myOrder?.rateId.rateTypeId.name}
        condition={!!tariff || myOrder}
      />

      {(isFullTank || myOrder?.isFullTank) &&
      <ChequeOption
        title={"Полный бак"}
        text={"Да"}
        condition={true}
      />}

      {(isNeedChildChair || myOrder?.isNeedChildChair) &&
      <ChequeOption
        title={"Детское кресло"}
        text={"Да"}
        condition={true}
      />}

      {(isRightWheel || myOrder?.isRightWheel) &&
      <ChequeOption
        title={"Правый руль"}
        text={"Да"}
        condition={true}
      />}
    </div>}

    {currentStep >= 1 &&
    <p className={"chequePrice"}>Цена: {chequeFinalPrice || Math.trunc(myOrder?.price)}₽</p>
    }

    {!!urlParams.orderID
      ? <button className={"defaultButton orderPageButton cancelButton"}>Отменить</button>
      : <CurrentStepButton
        currentStep={currentStep}
        updateCurrentStep={updateCurrentStep}
        setIsModalOpen={setIsModalOpen}
        isDisabled={
          currentStep === 0 ? !city || !address :
            currentStep === 1 ? !car :
              currentStep === 2 ? !color || !date || !tariff :
                false
        }
      />
    }
  </div>
}
import './Cheque.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {dateFormat} from "../../../../lib/utils";
import {ChequeOption} from "./ChequeOption";
import {CurrentStepButton} from "./CurrentStepButton";
import {putOrder} from "../../../../redux/chequeReducer";

export const Cheque = (props) => {
  const {currentStep, lastActualStep, updateCurrentStep, setLastActualStep, setIsModalOpen} = props

  const dispatch = useDispatch()

  const [times, setTimes] = useState(null)
  const [timeDif, setTimeDif] = useState(null)

  const chequeData = useSelector(state => state.cheque.chequeData)
  const chequePrices = useSelector(state => state.cheque.chequePrices)
  const myOrder = useSelector(state => state.cheque.order)
  const orderStatuses = useSelector(state => state.info.orderStatuses)
  const {city, address, car, tariff, color, date, isFullTank, isNeedChildChair, isRightWheel} = chequeData
  const {carPrice, tankPrice, childChairPrice, rightWheelPrice} = chequePrices

  const chequeFinalPrice = carPrice + tankPrice + childChairPrice + rightWheelPrice +
    ((tariff?.price ? tariff.price : 0) * Math.trunc(timeDif / 1000 / 60))
  const tempTimeDif = myOrder?.dateTo - myOrder?.dateFrom

  let isDisabled = false
  switch (currentStep) {
    case 0:
      isDisabled = !city || !address
      break
    case 1:
      isDisabled = !car
      break
    case 2:
      isDisabled = !color || !date || !tariff
      break
    default:
      break
  }

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

  const onCancelOrderHandler = () => {
    const cancelledOrder = {
      ...myOrder,
      orderStatusId: orderStatuses.filter(orderStatus => orderStatus.name === "Отмененые")[0].id
    }
    dispatch(putOrder(cancelledOrder))
  }

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

    {lastActualStep >= 1 &&
    <ChequeOption
      title={"Модель"}
      text={car?.name || myOrder?.carId.name}
      condition={!!car || myOrder}
    />
    }

    {lastActualStep >= 2 && <div>
      <ChequeOption
        title={"Цвет"}
        text={color || myOrder?.color}
        condition={!!color || myOrder}
      />

      <ChequeOption
        title={"Длительность аренды"}
        text={!Object.keys(times).length ? "" : times?.d + "д. " + times?.h + "ч. " + times?.m + "м."}
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

    {lastActualStep >= 1 &&
    <p className={"chequePrice"}>Цена: {chequeFinalPrice || Math.trunc(myOrder?.price) || 0}₽</p>
    }

    {myOrder?.orderStatusId.name !== "Новые" && myOrder?.orderStatusId.name !== "Отмененые" &&
    <CurrentStepButton
      currentStep={currentStep}
      lastActualStep={lastActualStep}
      updateCurrentStep={updateCurrentStep}
      setLastActualStep={setLastActualStep}
      setIsModalOpen={setIsModalOpen}
      isDisabled={isDisabled}
    />}

    {myOrder?.orderStatusId.name === "Новые" &&
    <button
      className={"defaultButton orderPageButton cancelButton"}
      onClick={onCancelOrderHandler}
    >Отменить</button>}
  </div>
}
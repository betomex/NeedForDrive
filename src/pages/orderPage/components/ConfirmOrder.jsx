import React from "react";
import './ConfirmOrder.css'
import {useDispatch, useSelector} from "react-redux";
import {postOrder} from "../../../redux/chequeReducer";
/* eslint-disable react/prop-types */

export const ConfirmOrder = (props) => {
  const {setIsModalOpen} = props

  const chequeData = useSelector(state => state.cheque.chequeData)
  const chequePrices = useSelector(state => state.cheque.chequePrices)
  const orderStatuses = useSelector(state => state.info.orderStatuses)
  const {city, address, car, color, date, tariff, isFullTank, isNeedChildChair, isRightWheel} = chequeData
  const {carPrice, tankPrice, childChairPrice, rightWheelPrice} = chequePrices

  const dispatch = useDispatch()

  const close = () => {
    setIsModalOpen(false);
  };

  const onPostHandler = () => {
    const data = {
      orderStatusId: orderStatuses.filter(orderStatus => orderStatus.name === "Новые")[0].id,
      cityId: city.id,
      pointId: address.id,
      carId: car.id,
      color: color,
      dateFrom: date[0].toDate().getTime(),
      dateTo: date[1].toDate().getTime(),
      rateId: tariff.id,
      price: carPrice + tankPrice + childChairPrice + rightWheelPrice
        + (tariff.price * ((date[1].toDate().getTime() - date[0].toDate().getTime()) / 60000)),
      isFullTank: isFullTank,
      isNeedChildChair: isNeedChildChair,
      isRightWheel: isRightWheel
    }
    dispatch(postOrder(data))
    setIsModalOpen(false);
  }

  return <>
    <div className={"modalShadow"} onClick={close}/>
    <div className={"modal"}>
      <p className={"modalTitle"}>Подтвердить заказ</p>
      <div className={"modalFooter"}>
        <button
          className={"modalButton confirmButton"}
          onClick={onPostHandler}
        >Подтвердить
        </button>
        <button
          className={"modalButton cancelButton"}
          onClick={close}
        >Вернуться
        </button>
      </div>
    </div>
  </>
}
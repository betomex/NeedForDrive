import './InTotalStep.css'
import {useSelector} from "react-redux";

export const InTotalStep = () => {
  const chequeData = useSelector(state => state.cheque.chequeData)
  const myOrder = useSelector(state => state.cheque.order)
  const {car, date} = chequeData

  const number = car?.number ? carNumber(car?.number || "ERROR")
    : carNumber(myOrder?.carId.number || "ERROR")

  const tempDate = new Date(myOrder?.dateFrom)
  const rentDate = date
    ? date[0].toDate().toLocaleString('ru-RU')
    : tempDate.toLocaleString('ru-RU')

  return <div className={"totalContainer"}>
    <div>
      {myOrder.orderStatusId.name === "Новые" &&
      <p className={"confirmed"}>Ваш заказ подтверждён</p>
      }
      {myOrder.orderStatusId.name === "Отмененые" &&
      <p className={"confirmed"}>Ваш заказ отменён</p>
      }
      <p className={"totalCar"}>{car?.name}</p>
      <div className={"totalCarNumber"}>
        <p className={"totalCarNumberContent"}>{number.toUpperCase()}</p>
      </div>
      <p className={"totalTank"}><b>Топливо</b> {car?.tank || myOrder?.carId.tank || 0}%</p>
      <p><b>Доступна с</b> {rentDate}</p>
    </div>
    <img
      className={"totalCarImage"}
      src={car?.thumbnail.path || myOrder?.carId.thumbnail.path}
      alt="CarImage"
    />
  </div>
}

const carNumber = (number) => {
  return number.substr(0, 1) + " " +
    number.substr(1, 3) + " " +
    number.substr(4, 2)
}
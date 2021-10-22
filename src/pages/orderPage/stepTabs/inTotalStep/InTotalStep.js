import './InTotalStep.css'
import {useSelector} from "react-redux";

export const InTotalStep = () => {
  const chequeData = useSelector(state => state.cheque.chequeData)
  const {car, date} = chequeData

  const carNumber = car.number.substr(0, 1) + " "
    + car.number.substr(1, 3) + " "
    + car.number.substr(4, 2)

  return <div className={"totalContainer"}>
    <div>
      <p className={"totalCar"}>{car.name}</p>
      <div className={"totalCarNumber"}>
        <p className={"totalCarNumberContent"}>{carNumber.toUpperCase()}</p>
      </div>
      <p className={"totalTank"}><b>Топливо</b> {car?.tank ? car.tank : 0}%</p>
      <p><b>Доступна с</b> {date[0].toDate().toLocaleString('ru-RU')}</p>
    </div>
    <img
      className={"totalCarImage"}
      src={car.thumbnail.path}
      alt="CarImage"
    />
  </div>
}
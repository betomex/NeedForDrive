import {Row} from "antd";
import './Cheque.css'
import {useSelector} from "react-redux";

export const Cheque = (props) => {
  const {currentStep, updateCurrentStep} = props

  const chequeData = useSelector(state => state.cheque.chequeData)
  const {city, address, car} = chequeData

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
    <div>
      <Row align={"middle"}>
        <p className="chequeOption">Модель</p>
        <div className={"chequeDots"}/>
        <div className={"chequeValue"}>
          {!!car && <p>{car?.name}</p>}
        </div>
      </Row>
      <p className={"chequePrice"}>Цена: от {car?.priceMin} до {car?.priceMax} ₽</p>
    </div>
    }
    <CurrentStepButton
      city={city}
      address={address}
      car={car}
      currentStep={currentStep}
      updateCurrentStep={updateCurrentStep}
    />
  </div>
}

const CurrentStepButton = (props) => {
  const {city, address, car, currentStep, updateCurrentStep} = props

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
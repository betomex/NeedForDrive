import {Row} from "antd";
import './Cheque.css'
import {useSelector} from "react-redux";

export const Cheque = (props) => {
  const {currentStep, updateCurrentStep} = props

  const cityValue = useSelector(state => state.cheque.chequeData.city.value)
  const pointValue = useSelector(state => state.cheque.chequeData.address.value)
  const carValue = useSelector(state => state.cheque.chequeData.car.value)

  return <div className={"cheque"}>
    <b className={"chequeTitle"}>Ваш заказ:</b>
    <Row align={"middle"}>
      <p className="chequeOption">Пункт выдачи</p>
      <div className={"chequeDots"}>{}</div>
      <div className={"chequeValue"}>
        {!!cityValue && !!pointValue && <p>{pointValue}, {cityValue}</p>}
      </div>
    </Row>
    {currentStep === 1 &&
    <Row align={"middle"}>
      <p className="chequeOption">Модель</p>
      <div className={"chequeDots"}>{}</div>
      <div className={"chequeValue"}>
        {!!carValue && <p>{carValue}</p>}
      </div>
    </Row>}
    <CurrentStepButton
      cityValue={cityValue}
      pointValue={pointValue}
      carValue={carValue}
      currentStep={currentStep}
      updateCurrentStep={updateCurrentStep}
    />
  </div>
}

const CurrentStepButton = (props) => {
  const {cityValue, pointValue, carValue, currentStep, updateCurrentStep} = props

  switch (currentStep) {
    case 0:
      return <button
        className={"defaultButton orderPageButton"}
        disabled={!cityValue && !pointValue}
        onClick={() => updateCurrentStep(currentStep + 1)}
      >Выбрать модель</button>
    case 1:
      return <button
        className={"defaultButton orderPageButton"}
        disabled={!carValue}
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
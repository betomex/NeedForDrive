import {Row} from "antd";
import './Cheque.css'

export const Cheque = (props) => {
  const {cityValue, pointValue, currentStep, updateCurrentStep} = props

  return <div className={"cheque"}>
    <b className={"chequeTitle"}>Ваш заказ:</b>
    <Row align={"middle"}>
      <p className="chequeOption">Пункт выдачи</p>
      <div className={"chequeDots"}>{}</div>
      <div className={"chequeValue"}>
        {!!cityValue && !!pointValue && <p>{pointValue}, {cityValue}</p>}
      </div>
    </Row>
    {currentStep === 0 && <button
      className={"defaultButton orderPageButton"}
      disabled={!cityValue && !pointValue}
      onClick={() => updateCurrentStep(currentStep + 1)}
    >Выбрать модель</button>}
    {currentStep === 1 && <button
      className={"defaultButton orderPageButton"}
      onClick={() => updateCurrentStep(currentStep + 1)}
    >Доп опции</button>}
    {currentStep === 2 && <button
      className={"defaultButton orderPageButton"}
      onClick={() => updateCurrentStep(currentStep + 1)}
    >Подтвердить заказ</button>}
    {currentStep === 3 && <button
      className={"defaultButton orderPageButton"}
    >Та да!</button>}
  </div>
}
export const CurrentStepButton = (props) => {
  const {currentStep, updateCurrentStep, setIsModalOpen, isDisabled} = props

  switch (currentStep) {
    case 0:
      return <button
        className={"defaultButton orderPageButton"}
        disabled={isDisabled}
        onClick={() => updateCurrentStep(currentStep + 1)}
      >Выбрать модель</button>
    case 1:
      return <button
        className={"defaultButton orderPageButton"}
        disabled={isDisabled}
        onClick={() => updateCurrentStep(currentStep + 1)}
      >Дополнительно</button>
    case 2:
      return <button
        className={"defaultButton orderPageButton"}
        disabled={isDisabled}
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
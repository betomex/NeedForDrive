export const CurrentStepButton = (props) => {
  const {currentStep, lastActualStep, updateCurrentStep, setLastActualStep, setIsModalOpen, isDisabled} = props

  switch (currentStep) {
    case 0:
      return <StepButton
        isDisabled={isDisabled}
        currentStep={currentStep}
        lastActualStep={lastActualStep}
        updateCurrentStep={updateCurrentStep}
        setLastActualStep={setLastActualStep}
        text={"Выбрать модель"}
      />
    case 1:
      return <StepButton
        isDisabled={isDisabled}
        currentStep={currentStep}
        lastActualStep={lastActualStep}
        updateCurrentStep={updateCurrentStep}
        setLastActualStep={setLastActualStep}
        text={"Дополнительно"}
      />
    case 2:
      return <StepButton
        isDisabled={isDisabled}
        currentStep={currentStep}
        lastActualStep={lastActualStep}
        updateCurrentStep={updateCurrentStep}
        setLastActualStep={setLastActualStep}
        text={"Итого"}
      />
    case 3:
      return <button
        className={"defaultButton orderPageButton"}
        onClick={() => setIsModalOpen(true)}
      >Заказать</button>
    default:
      return
  }
}

const StepButton = (props) => {
  const {isDisabled, currentStep, lastActualStep, updateCurrentStep, setLastActualStep, text} = props

  return <button
    className={"defaultButton orderPageButton"}
    disabled={isDisabled}
    onClick={() => {
      updateCurrentStep(currentStep + 1)
      if (currentStep + 1 > lastActualStep) {
        setLastActualStep(lastActualStep + 1)
      }
    }}
  >{text}</button>
}
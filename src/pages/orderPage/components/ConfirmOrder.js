import React from "react";
import './ConfirmOrder.css'

export const ConfirmOrder = (props) => {
  const {setIsModalOpen} = props

  const close = () => {
    setIsModalOpen(false);
  };

  return <>
    <div className={"modalShadow"} onClick={close}/>
    <div className={"modal"}>
      <p className={"modalTitle"}>Подтвердить заказ</p>
      <div className={"modalFooter"}>
        <button
          className={"modalButton confirmButton"}
          onClick={close}
        >Подтвердить</button>
        <button
          className={"modalButton cancelButton"}
          onClick={close}
        >Вернуться</button>
      </div>
    </div>
  </>
}
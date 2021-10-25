export const chequeActions = {
  updateChequePrice: (price) => ({type: "CHEQUE/UPDATE_PRICE", payload: price}),
  updateChequePoint: (city, address) => ({type: "CHEQUE/UPDATE_CHEQUEPOINT", payload: {city: city, address: address}}),
  updateChequeCar: (car) => ({type: "CHEQUE/UPDATE_CAR", payload: car}),
  updateChequeTariff: (tariff) => ({type: "CHEQUE/UPDATE_TARIFF", payload: tariff}),
  updateChequeColor: (color) => ({type: "CHEQUE/UPDATE_COLOR", payload: color}),
  updateChequeDate: (date) => ({type: "CHEQUE/UPDATE_DATE", payload: date}),
  updateChequeIsFullTank: (price) => ({type: "CHEQUE/TOGGLE_TANK", payload: price}),
  updateChequeIsNeedChildChair: (price) => ({type: "CHEQUE/TOGGLE_CHILD_CHAIR", payload: price}),
  updateChequeIsRightWheel: (price) => ({type: "CHEQUE/TOGGLE_RIGHT_WHEEL", payload: price}),
  setOrder: (order) => ({type: "CHEQUE/SET_ORDER", payload: order}),
}
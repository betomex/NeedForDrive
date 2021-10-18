export const chequeActions = {
  updateChequePoint: (city, address) => ({type: "CHEQUE/UPDATE_CHEQUEPOINT", payload: {city: city, address: address}}),
  updateChequeCar: (car) => ({type: "CHEQUE/UPDATE_CAR", payload: car})
}
export const locationActions = {
  setLocations: (locations) => ({type: "LOCATIONS/SET_LOCATIONS", payload: locations}),
  setPoints: (points) => ({type: "LOCATIONS/SET_POINTS", payload: points})
}
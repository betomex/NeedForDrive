import {locationAPI, pointAPI} from "../api/api";

let initialState = {
  locations: [],
  points: [],
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOCATIONS/SET_LOCATIONS": {
      return {
        ...state,
        locations: action.payload
      }
    }
    case "LOCATIONS/SET_POINTS": {
      return {
        ...state,
        points: action.payload
      }
    }
    default:
      return state;
  }
}

export const actions = {
  setLocations: (locations) => ({type: "LOCATIONS/SET_LOCATIONS", payload: locations}),
  setPoints: (points) => ({type: "LOCATIONS/SET_POINTS", payload: points})
}

export const getLocations = () => async (dispatch) => {
  const data = await locationAPI.getLocations()
  dispatch(actions.setLocations(data))
}

export const getPoints = () => async (dispatch) => {
  const data = await pointAPI.getPoints()
  dispatch(actions.setPoints(data))
}

export default locationReducer;
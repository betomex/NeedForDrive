import {locationAPI, pointAPI} from "../api/api";
import {locationActions} from "./actions/locationActions";

const initialState = {
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

export const getLocations = () => async (dispatch) => {
  const data = await locationAPI.getLocations()
  dispatch(locationActions.setLocations(data))
}

export const getPoints = () => async (dispatch) => {
  const data = await pointAPI.getPoints()
  dispatch(locationActions.setPoints(data))
}

export default locationReducer;
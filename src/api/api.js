import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://api-factory.simbirsoft1.com/api',
  headers: {
    "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
    "Access-Control-Allow-Origin": "*"
  },
});

export const locationAPI = {
  getLocations() {
    return instance.get(`db/city`).then(r => r.data.data);
  }
}

export const pointAPI = {
  getPoints() {
    return instance.get(`db/point`).then(r => r.data.data);
  }
}

export const carAPI = {
  getCars() {
    return instance.get(`db/car`).then(r => r.data.data);
  }
}
import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://api-factory.simbirsoft1.com/api',
  headers: {
    "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
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
  },
  getCategories() {
    return instance.get(`db/category`).then(r => r.data.data);
  }
}

export const addonAPI = {
  getTariff() {
    return instance.get(`db/rate`).then(r => r.data.data);
  }
}

export const orderAPI = {
  getOrderByID(id) {
    return instance.get(`db/order/${id}`).then(r => r.data.data);
  },
  postOrder(data) {
    const body = JSON.stringify(data)
    return instance.post(`db/order`, body);
  },
  putOrder(data) {
    const body = JSON.stringify(data)
    return instance.put(`db/order/${data.id}`, body);
  },
}

export const infoAPI = {
  getOrderStatuses() {
    return instance.get(`db/orderStatus`).then(r => r.data.data);
  },
}
import React from "react";
import {Card, Col, Radio, Row, Spin} from 'antd';
import './CarStep.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCars, getCategories} from "../../../../redux/carReducer";
import {updateChequeCar} from "../../../../redux/chequeReducer";

export const CarStep = () => {
  const [radio, setRadio] = useState(1)
  const [filteredCars, setFilteredCars] = useState([])

  const carsData = useSelector(state => state.orderPageCar)
  const selectedCar = useSelector(state => state.cheque.chequeData.car)
  const {cars, categories} = carsData

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getCars())
  }, [])

  useEffect(() => {
    setFilteredCars(cars)
  }, [cars])

  useEffect(() => {
    setFilteredCars(cars)
    let tempCars = []

    if (radio !== "all") {
      tempCars = cars.filter(car => {
        const name = car.categoryId?.name
        return name === radio
      })
      setFilteredCars(tempCars)
    }
  }, [radio])

  return <div>
    <div>
      <Radio.Group
        name="radiogroup"
        defaultValue={radio}
        className={"radioGroup"}
        onChange={(e) => setRadio(e.target.value)}
      >
        <Radio value={"all"}>Все модели</Radio>
        {categories.map(category =>
          <Radio
            key={category.id}
            value={category.name}
          >{category.name}</Radio>)}
      </Radio.Group>
    </div>
    {cars.length === 0 &&
    <Spin
      tip={"Загрузка данных... Ориентировочное время ожидания 40 сек"}
      size={"large"}/>
    }
    <Row className={"carCardContainer"}>
      {filteredCars.map(car => car.thumbnail.path &&
        <Col key={car.id}>
          <Card
            className={car.id === selectedCar?.id ? "carCard carCardSelected" : "carCard"}
            onClick={() => {
              dispatch(updateChequeCar(car))
            }}
          >
            <div>
              <p className={"carName"}>{car.name.toUpperCase()}</p>
              <p className={"carPrice"}>{car.priceMin} - {car.priceMax} ₽</p>
            </div>
            <img
              className={"carCardImage"}
              src={car.thumbnail.path}
              alt={car.description}
            />
          </Card>
        </Col>)
      }
    </Row>
  </div>
}
import {Card, Col, Radio, Row, Spin} from 'antd';
import './CarStep.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCars, getCategories} from "../../../redux/carReducer";
import {updateChequeCar} from "../../../redux/chequeReducer";

export const CarStep = () => {
  const [radio, setRadio] = useState(1)
  const [filteredCars, setFilteredCars] = useState([])

  const cars = useSelector(state => state.orderPageCar.cars)
  const selectedCar = useSelector(state => state.cheque.chequeData.car)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCars())
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    setFilteredCars(cars)
  }, [cars])

  useEffect(() => {
    setFilteredCars(cars)
    let tempCars = []

    switch (radio) {
      case 2:
        tempCars = cars.filter(car => {
          const name = car.categoryId?.name
          return name === "Эконом+" || name === "Супер-эконом"
        })
        setFilteredCars(tempCars)
        break
      case 3:
        tempCars = cars.filter(car => {
          const name = car.categoryId?.name
          return name === "Люкс" || name === "Спорт" || name === "Бизнес"
        })
        setFilteredCars(tempCars)
        break
      default:
        break
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
        <Radio value={1}>Все модели</Radio>
        <Radio value={2}>Эконом</Radio>
        <Radio value={3}>Премиум</Radio>
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
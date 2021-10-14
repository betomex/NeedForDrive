import {Card, Col, Radio, Row, Spin} from 'antd';
import './CarStep.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCars} from "../../../redux/carReducer";
import {updateChequeCar} from "../../../redux/chequeReducer";

export const CarStep = () => {
  const [radio, setRadio] = useState(1)
  const [filteredCars, setFilteredCars] = useState([])

  const cars = useSelector(state => state.orderPageCar.cars)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCars())
  }, [])

  useEffect(() => {
    setFilteredCars(cars)
  }, [cars])

  useEffect(() => {
    setFilteredCars(cars)
    let tempCars = []

    switch (radio) {
      case 2:
        tempCars = cars.filter(c => {
          let name = c.categoryId?.name
          return name === "Эконом+" || name === "Супер-эконом"
        })
        setFilteredCars(tempCars)
        break
      case 3:
        tempCars = cars.filter(c => {
          let name = c.categoryId?.name
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
    <Row style={{overflowY: "auto", height: "75vh"}}>
      {filteredCars.map(c => c.thumbnail.path &&
        <Col key={c.id}>
          <Card
            className={"carCard"}
            onClick={() => {
              dispatch(updateChequeCar(document.getElementById("carName" + c.id).innerText))
            }}
          >
            <div>
              <p className={"carName"} id={"carName" + c.id}>{c.name.toUpperCase()}</p>
              <p className={"carPrice"}>{c.priceMin} - {c.priceMax} ₽</p>
            </div>
            <img className={"carCardImage"} src={c.thumbnail.path} alt={c.description}/>
          </Card>
        </Col>)
      }
    </Row>
  </div>
}
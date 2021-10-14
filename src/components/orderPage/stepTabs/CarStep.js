import {Card, Col, Radio, Row, Spin} from 'antd';
import './CarStep.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCars} from "../../../redux/carReducer";

export const CarStep = () => {
  const cars = useSelector(state => state.orderPageCar.cars)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCars())
  }, [])

  return <div>
    <div>
      <Radio.Group name="radiogroup" defaultValue={1} className={"radioGroup"}>
        <Radio value={1}>Все модели</Radio>
        <Radio value={2}>Эконом</Radio>
        <Radio value={3}>Премиум</Radio>
      </Radio.Group>
    </div>
    {cars.length === 0 &&
    <Spin
      tip={"Загрузка данных... Ориентировочное время ожидания 15-20 сек"}
      size={"large"}/>
    }
    <Row style={{overflowY: "auto", height: "75vh"}}>
      {cars.map(c => c.thumbnail.path && <Col key={c.id}>
        <Card className={"carCard"}>
          <div>
            <p className={"carName"}>{c.name.toUpperCase()}</p>
            <p className={"carPrice"}>{c.priceMin} - {c.priceMax} ₽</p>
          </div>
          <img className={"carCardImage"} src={c.thumbnail.path} alt={c.description}/>
        </Card>
      </Col>)
      }
    </Row>
  </div>
}
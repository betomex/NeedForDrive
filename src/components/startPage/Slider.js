import {Carousel, Layout, Row} from "antd";
import React from "react";
import './Slider.css'

export const Slider = () => {
  return <Layout.Sider collapsed={true} collapsedWidth={"47.5%"}>
    <Carousel autoplay>
      <Row>
        <div className={"slide slide1"}>
          <div className={"slideContent"}>
            <h1 className={"sliderTitle"}>Бесплатная парковка</h1>
            <p className={"sliderText"}>Оставляйте машину на платных городских парковках и разрешенных местах, не
              нарушая ПДД, а также в аэропортах</p>
            <button className={"defaultButton mainPageDescButton buttonGreenGradient"}>Подробнее</button>
          </div>
        </div>
      </Row>

      <Row>
        <div className={"slide slide2"}>
          <div style={{width: "53%"}}>
            <h1 className={"sliderTitle"}>Cтраховка</h1>
            <p className={"sliderText"}>Полная страховка автомобиля</p>
            <button className={"defaultButton mainPageDescButton buttonBlueGradient"}>Подробнее</button>
          </div>
        </div>
      </Row>

      <Row>
        <div className={"slide slide3"}>
          <div style={{width: "53%"}}>
            <h1 className={"sliderTitle"}>Бензин</h1>
            <p className={"sliderText"}>Полный бак на любой заправке города за наш счёт</p>
            <button className={"defaultButton mainPageDescButton buttonRedGradient"}>Подробнее</button>
          </div>
        </div>
      </Row>

      <Row>
        <div className={"slide slide4"}>
          <div style={{width: "53%"}}>
            <h1 className={"sliderTitle"}>Обслуживание</h1>
            <p className={"sliderText"}>Автомобиль проходит еженедельное ТО</p>
            <button className={"defaultButton mainPageDescButton buttonPurpleGradient"}>Подробнее</button>
          </div>
        </div>
      </Row>
    </Carousel>
  </Layout.Sider>
}
import {Button, Carousel, Grid, Layout, Row} from "antd";
import React, {createRef, useEffect, useState} from "react";
import './Slider.css'

export const Slider = () => {
  const [collapsedWidth, setCollapsedWidth] = useState("50%")
  const pageSize = Grid.useBreakpoint()
  const carousel = createRef()
  const handlePrev = () => carousel.current.prev()
  const handleNext = () => carousel.current.next()

  useEffect(() => {
    if (pageSize.xl) {
      setCollapsedWidth("50%")
    } else if (pageSize.lg) {
      setCollapsedWidth("35%")
    }
  }, [pageSize])

  if (pageSize.lg) return <Layout.Sider
    collapsed
    collapsedWidth={collapsedWidth}
    className={"sliderSider"}
  >
    <Carousel
      autoplay
      ref={carousel}
    >
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
          <div className={"slideContent"}>
            <h1 className={"sliderTitle"}>Cтраховка</h1>
            <p className={"sliderText"}>Полная страховка автомобиля</p>
            <button className={"defaultButton mainPageDescButton buttonBlueGradient"}>Подробнее</button>
          </div>
        </div>
      </Row>

      <Row>
        <div className={"slide slide3"}>
          <div className={"slideContent"}>
            <h1 className={"sliderTitle"}>Бензин</h1>
            <p className={"sliderText"}>Полный бак на любой заправке города за наш счёт</p>
            <button className={"defaultButton mainPageDescButton buttonRedGradient"}>Подробнее</button>
          </div>
        </div>
      </Row>

      <Row>
        <div className={"slide slide4"}>
          <div className={"slideContent"}>
            <h1 className={"sliderTitle"}>Обслуживание</h1>
            <p className={"sliderText"}>Автомобиль проходит еженедельное ТО</p>
            <button className={"defaultButton mainPageDescButton buttonPurpleGradient"}>Подробнее</button>
          </div>
        </div>
      </Row>
    </Carousel>
    <Button
      className={"sliderSwitch leftSliderSwitch"}
      onClick={handlePrev}
    >&#8249;</Button>
    <Button
      className={"sliderSwitch rightSliderSwitch"}
      onClick={handleNext}
    >&#8250;</Button>
  </Layout.Sider>
  return <></>
}
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {useEffect, useRef, useState} from "react";
import './MyMap.css'
import {useDispatch} from "react-redux";
import {updateChequePoint} from "../../redux/chequeReducer";

export const MyMap = (props) => {
  const {points, cityValue, pointValue} = props

  const [pointsCoords, setPointsCoords] = useState([])
  const [ymaps, setYmaps] = useState(null)
  const [coords, setCoords] = useState([45.053424, 38.967237])
  const [updateStatus, setUpdateStatus] = useState(0)

  const map = useRef();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!cityValue) {
      ymaps?.geocode(cityValue).then(r => {
        setCoords(r.geoObjects.get(0).geometry.getCoordinates())
      })
    }
  }, [cityValue])

  useEffect(() => {
    if (!!pointValue) {
      ymaps?.geocode(pointValue + ", " + cityValue).then(r => {
        setCoords(r.geoObjects.get(0).geometry.getCoordinates())
      })
    }
  }, [pointValue])

  useEffect(() => {
    myPanTo(coords)
  }, [coords])

  useEffect(() => {
    const names = []
    const pointsNames = points.map(point => {
      names.push(point.address)
      return point.cityId?.name + ", " + point.address
    })
    let tempPointsCoords = []

    for (let i = 0; i < pointsNames.length; i++) {
      ymaps?.geocode(pointsNames[i]).then(r => {
        const coords = r.geoObjects.get(0).geometry.getCoordinates()
        tempPointsCoords.push({coordinates: coords, name: names[i]})
      })
    }

    setPointsCoords(tempPointsCoords)
  }, [updateStatus])

  const myPanTo = coordinates => {
    if (!!pointValue) {
      map.current?.setZoom(16, {duration: 2000})
    } else {
      map.current?.setZoom(11, {duration: 2000})
    }
    map.current?.panTo(coordinates);
  };

  return <YMaps query={{
    lang: "ru_RU",
    ns: "geocode",
    apikey: "fc475af3-70e8-49b3-b7fe-ddca506b0367",
    load: ["geocode"]
  }}>
    <Map
      defaultState={{center: [45.053424, 38.967237], zoom: 11}}
      className={"map"}
      instanceRef={map}
      onLoad={ymaps => {
        setYmaps(ymaps)
        setUpdateStatus(1)
      }}
    >
      {pointsCoords.map((pointCoords, index) => <Placemark
        key={index}
        geometry={pointCoords.coordinates}
        onClick={() => {
          dispatch(updateChequePoint(cityValue, pointCoords.name))
        }}/>)}
    </Map>
  </YMaps>
}
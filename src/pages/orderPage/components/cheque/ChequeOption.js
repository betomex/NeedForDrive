import {Row} from "antd";
import './ChequeOption.css'

export const ChequeOption = (props) => {
  const {title, text, condition} = props

  return <Row align={"middle"}>
    <p className="chequeOption">{title}</p>
    <div className={"chequeDots"}/>
    <div className={"chequeValue"}>
      {condition && <p>{text}</p>}
    </div>
  </Row>
}
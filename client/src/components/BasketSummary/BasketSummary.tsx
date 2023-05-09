import React from "react"
import { Container, Dropdown, DropdownButton, Row } from "react-bootstrap"
import styles from "./BasketSummary.module.css"

interface Summary {
  total: number
}

function BasketSummary(props: Summary) {
  return (
    <Container>
      <h2>Summary</h2>
      <hr />
      <h3>Shipping</h3>
      <div className={styles.shippingComponentWrap}>
        <select className={styles.shippingComponentSelect}>
          <option value={""}>standard shipping 29,-</option>
          <option value={""}>fast shipping 69,-</option>
        </select>
        <span className={styles.icon}> ▼ </span>
      </div>
      <hr />
      <h3>Total Price: {props.total},-</h3>
    </Container>
  )
}

export default BasketSummary

import React from "react"
import { Container, Dropdown, DropdownButton, Row } from "react-bootstrap"
import styles from "./BasketSummary.module.css"

interface SummaryProps {
  total: string
}

function BasketSummary(props: SummaryProps) {
  return (
    <Container>
      <h2>Summary</h2>
      <hr />
      <h3>Total Price: {props.total},-</h3>
      <hr />
      <button
        className="btn btn-success btn-lg"
        onClick={() =>
          alert("This would lead to a checkout page where you pay :-)")
        }
      >
        CHECKOUT
      </button>
    </Container>
  )
}

export default BasketSummary

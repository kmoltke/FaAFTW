import React from "react";
import {Container, Dropdown, DropdownButton, Row} from "react-bootstrap";

interface Summary {
    total: number
}

function BasketSummary(summary: Summary) {
    return (
        <Container>
            <h4>Shipping</h4>
            <DropdownButton id="dropdown-basic-button"
                            title="Standard-Delivery DKK 60.00"
                            variant="secondary"
                            menuVariant="dark"
                            className="mt-2">
                <Dropdown.Item href="#/action-1"></Dropdown.Item>
            </DropdownButton>
            <hr/>
            <h4>Total Price: DKK {summary.total}</h4>
        </Container>
    )
}

export default BasketSummary
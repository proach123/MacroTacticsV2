import React from 'react'
import {Card} from 'react-bootstrap'

const GameCard = (props) =>{

    console.log(props)

    return(
        <Card>
            <Card.Img variant='top' src={props.cardImg}/>
            <Card.Body>
                <Card.Title>
                    {props.cardTitle}
                </Card.Title>
                <Card.Text>
                    {props.cardText}
                </Card.Text>
            </Card.Body>
        </Card>
    )

}

export default GameCard
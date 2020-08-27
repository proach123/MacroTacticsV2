import React, {useState} from 'react';
import Deck from './Deck'

const Decks = () => {

    const [deckList, setDeckList] =useState({})


    return(
        <div>
            <h3> Your Decks </h3>

            <Deck></Deck>




        </div>
    )
}

export default Decks
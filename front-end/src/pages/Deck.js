import React, {useState} from 'react'
import GameCard from './GameCard'


const Deck = (props) => {

    const [cardList, setCardList] = useState({
        cardImg: 'https://b3h2.scene7.com/is/image/BedBathandBeyond/324468869189531p?$imagePLP$&wid=256&hei=256',
        cardText: 'Usually mined by the lower mountain peoples, its uses are inumerable',
        cardTitle: 'Copper'
    })


    return(
        <div>

            <GameCard cardImg={cardList.cardImg} cardText={cardList.cardText} cardTitle={cardList.cardTitle}></GameCard>

        </div>
    )
}

export default Deck
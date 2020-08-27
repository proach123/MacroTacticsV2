import React from 'react'
import {Switch} from 'react-router-dom'

import Route from './Route'

import Landing from '../pages/Landing'
import Decks from '../pages/Decks'

export default function Routes(){
    return(
        <Switch>
            <Route path='/' exact component={Landing}></Route>
            <Route path='/decks' component={Decks}></Route>
        </Switch>
    )
} 
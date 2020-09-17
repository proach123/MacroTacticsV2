import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import history from './services/history.js'
import Routes from './routes'

import {Client} from 'boardgame.io/react';
import {MacroTactics} from './Game';
import {MacroTacticsBoard} from './Board'


import './App.css';

const App = Client({
  game: MacroTactics,
  board: MacroTacticsBoard,
})

export default App;



// function App() {
//   return (
//     <Router history={history}>
//       <Routes />
//     </Router>
//   );
// }
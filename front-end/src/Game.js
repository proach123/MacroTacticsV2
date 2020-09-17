import {INVALID_MOVE} from 'boardgame.io/core'
import decklist from './Decklist'

export const MacroTactics = {
    setup: (ctx) => ({ 
        cells: Array(100).fill(null),
        player0Deck: [{name: 'dmg', desc:'deal 2 dmg to opponent player', func: dealDmg(ctx,2), key: 0 },{name: 'heal' ,desc:'heal 1 point of dmg',key: 1},{name:'doubledmg', desc:'deal 4 points of dmg',key: 2},
        {name:'megaheal', desc:'heal 5 points of dmg',key: 3},{name:'randomdmg', desc:'deal random dmg', key: 4}, {name:'randomheal', desc:'heal between 1 and 6 health',key: 5}],

        player1Deck: [{name: 'dmg', desc:'deal 2 dmg to opponent player', func: dealDmg(ctx,2), key: 0 },{name: 'heal' ,desc:'heal 1 point of dmg',key: 1},{name:'doubledmg', desc:'deal 4 points of dmg',key: 2},
        {name:'megaheal', desc:'heal 5 points of dmg',key: 3},{name:'randomdmg', desc:'deal random dmg', key: 4}, {name:'randomheal', desc:'heal between 1 and 6 health',key: 5}],

        unshuffled: [{name: 'dmg', desc:'deal 2 dmg to opponent player'},{name: 'heal' ,desc:'heal 1 point of dmg'},{name:'doubledmg', desc:'deal 4 points of dmg'},
        {name:'megaheal', desc:'heal 5 points of dmg'},{name:'randomdmg', desc:'deal random dmg'}, {name:'randomheal', desc:'heal between 1 and 6 health'}],
        player0Graveyard: [],
        player1Graveyard: [],

        intialShuffle: false,

        player0Hand: [], // player hand needs to randomize 2 into it.

        player1Hand: [],

        lifeTotal: Array(2).fill(10) // player life total
    }),

    phases: {
        start: {
            moves: {ShuffleDecks},
            endIf: G => (G.intialShuffle),
            start: true,
            next: 'draw',
        },
        draw:{
            moves: {Player0DrawCard, Player1DrawCard, PlayCard, dealDmg},
        },
        play: {
            moves: {PlayCard, dealDmg},
        },
    },

    turn : {
        moveLimit: 1
    }, // this will be updated to include 7 phases.. draw main etc.

    moves : {
        Player0DrawCard,
        Player1DrawCard,
        dealDmg,
        healDmg,
        TickLife,
        ShuffleDecks,
        PlayCard
    },
    

    endIf: (G, ctx) => {
        if (G.lifeTotal[0] <= 0) {
          return { winner: 1 };
        }
        if (G.lifeTotal[1] <= 0) {
            return { winner: 0 };
          }
      },

    playerView: (G, ctx, playerId) => G

    //   ai: {
    //     enumerate: (G, ctx) => {
    //       let moves = [];
    //       for (let i = 0; i < 9; i++) {
    //         if (G.cells[i] === null) {
    //           moves.push({ move: 'clickCell', args: [i] });
    //         }
    //       }
    //       return moves;
    //     },
    // }
    
    
};

function TickLife(G, ctx,damage){
    G.lifeTotal[ctx.currentPlayer] = G.lifeTotal[ctx.currentPlayer] - damage;
}

function Player0DrawCard(G, ctx){
    G.player0Hand.push(G.player0Deck[1])
    G.player0Deck.shift()
}

function Player1DrawCard(G, ctx){
    G.player1Hand.push(G.player1Deck[1])
    G.player1Deck.shift()
}

function PlayCard(G, ctx, cardId){
    const player = ctx.currentPlayer
    console.log(cardId)
    if(cardId === 0){
        dealDmg(G,player,2)
    }

    if(cardId === 1){
        healDmg(G,player,1)
    }

    if(cardId === 2){
        dealDmg(G,player,4)
    }

    if(cardId === 3){
        healDmg(G,player,5)
    }

    if(cardId === 4){
        dealDmg(G,player,ctx.random.Die(6)) // random die roll of 6
    }

    if(cardId === 5){
        healDmg(G, player, ctx.random.Die(6)) //random die roll of 6
    }

// need to find a way to put card in graveyard after use
    if(ctx.currentPlayer == 0){
        for (let i = 0; i < G.player0Hand.length; i++) {
            if(G.player0Hand[i].key === cardId){
                G.player0Graveyard.push(G.player0Hand[i])
                G.player0Hand.splice(i,1)
                i = G.player0Hand.length; //end the loop if the element is found
            }   
        }

    }

    if(ctx.currentPlayer == 1){
        for (let i = 0; i < G.player1Hand.length; i++) {
            if(G.player1Hand[i].key === cardId){
                G.player1Graveyard.push(G.player1Hand[i])
                G.player1Hand.splice(i,1)
                i = G.player1Hand.length; //end the loop if the element is found
            }   
        }

    }
    

    
}


 

function ShuffleDecks(G, ctx){
    //need to find a way to automatically do this.
    G.player0Deck = ctx.random.Shuffle(G.player0Deck)
    G.player1Deck = ctx.random.Shuffle(G.player1Deck)
    G.intialShuffle = true
}


function dealDmg(G, player, num){
// The comparison for ctx.currentPlayer needs to be double equals NOT triple. Not sure why maybe because its like three levels deep, and is just a reference to the OG.
    
    if(player == 0){
        G.lifeTotal[1] = G.lifeTotal[1] - num
    }
    if (player == 1){
        G.lifeTotal[0] = G.lifeTotal[0] - num
    }
}

function healDmg(G, player, num){
// The comparison for ctx.currentPlayer needs to be double equals NOT triple. Not sure why maybe because its like three levels deep, and is just a reference to the OG.
    
    if(player == 0){
        G.lifeTotal[1] = G.lifeTotal[1] + num
    }
    if (player == 1){
        G.lifeTotal[0] = G.lifeTotal[0] + num
    }
}

import {INVALID_MOVE} from 'boardgame.io/core'
import decklist from './Decklist'

export const MacroTactics = {
    setup: (ctx) => ({ 
        cells: Array(100).fill(null),
        player0Deck: [{name: 'dmg', desc:'deal 2 dmg to opponent player', func: dealDmg(ctx,2), key: 0,owner: '0' },
        {name: 'heal' ,desc:'heal 1 point of dmg',key: 1, owner: '0',}
        ,{name:'doubledmg', desc:'deal 4 points of dmg',key: 2, owner: '0',},
        {name:'megaheal', desc:'heal 5 points of dmg',key: 3, owner: '0',}
        ,{name:'randomdmg', desc:'deal random dmg', key: 4, owner: '0',},
         {name:'randomheal', desc:'heal between 1 and 6 health',key: 5, owner: '0',}],

         player1Deck: [{name: 'dmg', desc:'deal 2 dmg to opponent player', func: dealDmg(ctx,2), key: 0,owner: '1' },
         {name: 'heal' ,desc:'heal 1 point of dmg',key: 1, owner: '1',}
         ,{name:'doubledmg', desc:'deal 4 points of dmg',key: 2, owner: '1',},
         {name:'megaheal', desc:'heal 5 points of dmg',key: 3, owner: '1',}
         ,{name:'randomdmg', desc:'deal random dmg', key: 4, owner: '1',},
          {name:'randomheal', desc:'heal between 1 and 6 health',key: 5, owner: '1',}],

        unshuffled: [{name: 'dmg', desc:'deal 2 dmg to opponent player'},{name: 'heal' ,desc:'heal 1 point of dmg'},{name:'doubledmg', desc:'deal 4 points of dmg'},
        {name:'megaheal', desc:'heal 5 points of dmg'},{name:'randomdmg', desc:'deal random dmg'}, {name:'randomheal', desc:'heal between 1 and 6 health'}],

        player0Graveyard: [],
        player1Graveyard: [],

        intialShuffle: false,

        player0Hand: [], // player hand needs to randomize 2 into it.

        player1Hand: [],

        player1Board: [],

        player0Board: [],

        player0LifeTotal: 10, // player life total
        player1LifeTotal: 10
    }),

    phases: {
        start: {
            moves: {ShuffleDecks,Player0DrawCard, Player1DrawCard},
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
        ShuffleDecks,
        PlayCard,
        InvalidMove
    },
    

    endIf: (G, ctx) => {
        if (G.player0LifeTotal <= 0) {
          return { winner: 1 };
        }
        if (G.player1LifeTotal <= 0) {
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

// function TickLife(G, ctx,damage){
//     G.lifeTotal[ctx.currentPlayer] = G.lifeTotal[ctx.currentPlayer] - damage;
// }

function InvalidMove(G,ctx){
    return(INVALID_MOVE)
}

function Player0DrawCard(G, ctx, drawCount=1){
    if(G.player0Graveyard[0] == null && G.intialShuffle === true && G.player0Hand.length > 5     ){
        return INVALID_MOVE
    }
    if(G.player0Deck[0] == null){
        G.player0Deck = G.player0Graveyard
        G.player0Graveyard = []   
        G.player0Deck = ctx.random.Shuffle(G.player0Deck)
        //deck gets replaced by graveyard then graveyard returns to an arra then deck shuffles, then normal draw happens.
        //this works because boardgame.io handles the immutiblity behind the scenes and lets us do things like this to the G obj.
    }
    let i = 0
    while(i < drawCount){
        G.player0Hand.push(G.player0Deck[0])
        G.player0Deck.shift()
        i++
    }
}

function Player1DrawCard(G, ctx, drawCount=1){
    if(G.player1Graveyard[0] == null && G.intialShuffle === true && G.player1Hand.length > 5 ){
        return INVALID_MOVE
    }
    if(G.player1Deck[0] == null){
        G.player1Deck = G.player1Graveyard
        G.player1Graveyard = []   
        G.player1Deck = ctx.random.Shuffle(G.player1Deck)
        //deck gets replaced by graveyard then graveyard returns to an arra then deck shuffles, then normal draw happens.
    }
    let i = 0
    while(i < drawCount){
        G.player1Hand.push(G.player1Deck[0])
        G.player1Deck.shift()
        i++
    }
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


 

function ShuffleDecks(G, ctx,deck=2){
    //need to find a way to automatically do this.

    if(deck === 2){
        G.player0Deck = ctx.random.Shuffle(G.player0Deck)
        G.player1Deck = ctx.random.Shuffle(G.player1Deck)
        Player0DrawCard(G,ctx,3)
        Player1DrawCard(G,ctx,3)
        G.intialShuffle = true

    }

}


function dealDmg(G, player, num){
// The comparison for ctx.currentPlayer needs to be double equals NOT triple. Not sure why maybe because its like three levels deep, and is just a reference to the OG.
    console.log(`the player who damaged ${player}`)
    if(player == 0){
        G.player1LifeTotal = G.player1LifeTotal - num
    }
    if (player == 1){
        G.player0LifeTotal = G.player0LifeTotal - num
    }
}

function healDmg(G, player, num){
// The comparison for ctx.currentPlayer needs to be double equals NOT triple. Not sure why maybe because its like three levels deep, and is just a reference to the OG.
    
    if(player == 0){
        G.player0LifeTotal = G.player0LifeTotal + num
    }
    if (player == 1){
        G.player1LifeTotal = G.player1LifeTotal + num
    }
}

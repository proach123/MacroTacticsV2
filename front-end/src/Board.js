import React from 'react';

export class MacroTacticsBoard extends React.Component {
  whenClicked(id,owner) {
    console.log(owner)
    if(owner != this.props.ctx.currentPlayer){
      this.props.moves.InvalidMove()
    } else
    this.props.moves.PlayCard(id);
  }

  handleDraw(player){
    
    if(player != this.props.ctx.currentPlayer){
      this.props.moves.InvalidMove()
      return
    }
    if(player === 0){
      this.props.moves.Player0DrawCard(1)
    }
    if(player === 1){
      this.props.moves.Player1DrawCard(1)
    }

    else this.props.moves.InvalidMove()

  }

  render() {
    let winner = '';
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: Player {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    const cellStyle = {
      border: '1px solid #555',
      width: '110px',
      height: '150px',
      lineHeight: '50px',
      textAlign: 'center',
    };

    // let tbody = [];
    // for (let i = 0; i < 10; i++) {
    //   let cells = [];
    //   for (let j = 0; j < 10; j++) {
    //     const id = 10 * i + j;
    //     cells.push(
    //       <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
    //         {this.props.G.cells[id]}
    //       </td>
    //     );
    //   }
    //   tbody.push(<tr key={i}>{cells}</tr>);
    // }

    console.log(this.props.G.player0Graveyard)

    return (
      <div>
        <table id="board">
          {/* <tbody>{tbody}</tbody> */}
        </table>
        {/* <div style={cellStyle}>{this.props.G.player0Deck[0].name}</div> */}
    <div className='player1Hand'>
      <div>player1 hand</div>
      <button onClick={()=>this.handleDraw(1)}>draw</button>
        {
          this.props.G.player1Hand.map((elem) => {
            return(
              <div key={elem.key} style={cellStyle} onClick={()=> this.whenClicked(elem.key,elem.owner)}>
                  <p>
                      {elem.name}
                  <br></br>
                      {elem.desc}
                  </p>
              </div>)
          })
        }
    </div>
    <div className="player1Graveyard">
        <div>Player1 Graveyard</div>
        {this.props.G.player1Graveyard.map((elem)=>{
          return(
            <div key={elem.key} style={cellStyle} onClick={null}> 
                  <p>
                      {elem.name}
                  <br></br>
                      {elem.desc}
                  </p>
              </div>
          )
        })}
      </div>


    <div className='player1LifeTotal'>
      Player1 life:
      <br></br>
      <h2>{this.props.G.player1LifeTotal}</h2>
    </div>

    <div className='player0LifeTotal'>
      Player0 life:
      <br></br>
      <h2>{this.props.G.player0LifeTotal}</h2>
    </div>


        
    <div className='player0Hand'>
      <div>player0 hand</div>
      <button onClick={()=>this.handleDraw(0)}>draw</button>
        {
          this.props.G.player0Hand.map((elem) => {
              return(
              <div key={elem.key} style={cellStyle} onClick={()=> this.whenClicked(elem.key,elem.owner)}>
                  <p>
                      {elem.name}
                  <br></br>
                      {elem.desc}
                  </p>
              </div>)
          })
        }
      </div>
      <div className="player0Graveyard">
        <div>Player0 Graveyard</div>
        {this.props.G.player0Graveyard.map((elem)=>{
          return(
            <div key={elem.key} style={cellStyle} onClick={null}> 
                  <p>
                      {elem.name}
                  <br></br>
                      {elem.desc}
                  </p>
              </div>
          )
        })}
      </div>
      <h3>
        {winner}
      </h3>
    </div>
    );
  }
}
import React from 'react';

export class MacroTacticsBoard extends React.Component {
  onClick(id) {
    this.props.moves.PlayCard(id);
  }

  render() {
    let winner = '';
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
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

    let tbody = [];
    for (let i = 0; i < 10; i++) {
      let cells = [];
      for (let j = 0; j < 10; j++) {
        const id = 10 * i + j;
        cells.push(
          <td style={cellStyle} key={id} onClick={() => this.onClick(id)}>
            {this.props.G.cells[id]}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }
    console.log(`player0 lifetotal:${this.props.G.lifeTotal[0]}`, `player1 lifetotal:${this.props.G.lifeTotal[1]}`)
    console.log(`player0 firstCard:${this.props.G.player0Deck[0].name}`, `player1 firstCard:${this.props.G.player1Deck[0].name}`)


   
    

    return (
      <div>
        <table id="board">
          {/* <tbody>{tbody}</tbody> */}
        </table>
        <div style={cellStyle}>{this.props.G.player0Deck[0].name}</div>
        <div>{this.props.G.lifeTotal[0]}</div>
        <div>{this.props.G.lifeTotal[1]}</div>
    <div>{
        this.props.G.player0Hand.map((elem) => {
            return(
            <div key={elem.key} style={cellStyle} onClick={()=> this.onClick(elem.key)}>
                <p>
                    {elem.name}
                <br></br>
                    {elem.desc}
                </p>
                <button onClick={()=> this.onClick(elem.key)}></button>

            </div>)
        })
    }</div>
        {winner}
      </div>
    );
  }
}
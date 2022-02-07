function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function Square({ value, onClick, onMouseEnter, onMouseLeave, hoveredId, squareId }) {
  return /*#__PURE__*/(
    React.createElement("button", { className: hoveredId === squareId ? "square active" : "square",
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave },

    value));


}

function Board({ squares, onClick, onMouseEnter, onMouseLeave, hoveredId }) {
  let sideLength = Math.sqrt(squares.length);
  let gameBoard = [];
  for (let i = 0; i < sideLength; i++) {
    let boardRow = [];
    for (let ii = 0; ii < sideLength; ii++) {
      let index = i * sideLength + ii;
      boardRow.push( /*#__PURE__*/
      React.createElement(Square, {
        key: index,
        value: squares[index],
        onClick: () => onClick(index),
        onMouseEnter: () => onMouseEnter(index),
        onMouseLeave: () => onMouseLeave(index),
        hoveredId: hoveredId,
        squareId: index }));


    }
    gameBoard.push( /*#__PURE__*/
    React.createElement("div", { key: i, className: "board-row" }, boardRow));

  }
  return /*#__PURE__*/(
    React.createElement("div", null, gameBoard));

}

class Game extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleOnChange",













































    e => {
      e.preventDefault();
      console.log('this ', this);
      let dimension = e.target.value;
      this.setState({
        history: [{
          usedSquareId: "",
          squares: Array(dimension ** 2).fill(null) }],

        dimension: dimension });

    });this.state = { history: [{ usedSquareId: "", squares: Array(9).fill(null) }], hoveredId: null, stepNumber: 0, xIsNext: true, dimension: 3 };}handleClick(i) {const history = this.state.history.slice(0, this.state.stepNumber + 1);const current = history[history.length - 1];const squares = current.squares.slice();const usedSquareId = i;if (calculateWinner(squares) || squares[i]) {return;}squares[i] = this.state.xIsNext ? "X" : "O";this.setState({ history: history.concat({ usedSquareId: i, squares: squares }), stepNumber: history.length, xIsNext: !this.state.xIsNext });}handleMouseEnter(i) {this.setState({ hoveredId: i });}handleMouseLeave(i) {this.setState({ hoveredId: null });}

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0 });

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, moveNum) => {
      const text = moveNum ?
      "go to the move # " + moveNum :
      "go to the game start";
      return /*#__PURE__*/(
        React.createElement("li", { key: moveNum }, /*#__PURE__*/
        React.createElement("button", { onClick: () => {this.jumpTo(moveNum);},
          id: moveNum,
          value: step.usedSquareId,
          className: this.state.hoveredId === step.usedSquareId ? "active" : "",
          onMouseEnter: () => this.handleMouseEnter(step.usedSquareId),
          onMouseLeave: () => this.handleMouseLeave() },
        text)));


    });

    let status;
    if (winner) {
      status = "The winner is " + winner;
    } else {
      status = "Next player " + (this.state.xIsNext ? "X" : "O");
    }


    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("div", { className: "game" }, /*#__PURE__*/
      React.createElement("div", { className: "game-board" }, /*#__PURE__*/

      React.createElement(Board, {
        squares: current.squares,
        onClick: i => this.handleClick(i),
        onMouseEnter: i => this.handleMouseEnter(i),
        onMouseLeave: i => this.handleMouseLeave(i),
        hoveredId: this.state.hoveredId })), /*#__PURE__*/


      React.createElement("div", { className: "game-info" }, /*#__PURE__*/
      React.createElement("label", { htmlFor: "boardDim" }, "Enter board dimension"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("input", { type: "text", id: "boardDim", placeholder: "enter game board dimension", value: this.state.dimension,
        onChange: this.handleOnChange }), /*#__PURE__*/
      React.createElement("div", null, status), /*#__PURE__*/
      React.createElement("ol", null, moves)))));




  }}


function calculateWinner(squares) {
  let length = squares.length;
  let lineLength = Math.sqrt(squares.length);
  let squaresCopy = squares.slice();
  let patternArray = Array.from(Array(length).keys());
  let patterns = [];

  while (length) {
    let horisontalLine = patternArray.splice(0, lineLength);
    patterns.push(horisontalLine);
    length -= lineLength;
  }

  let verticalLine = [];
  length = squares.length;
  patternArray = Array.from(Array(length).keys());

  for (let i = 0; i < lineLength; i++) {
    for (let ii = i; ii < length; ii += lineLength) {
      verticalLine.push(patternArray[ii]);
    }
    patterns.push(verticalLine);
    verticalLine = [];
  }

  let diagonalOne = [patternArray[lineLength - 1]];
  let diagonalTwo = [patternArray[0]];

  for (let i = 0, prev = lineLength - 1; i < lineLength - 1; i++) {
    diagonalOne.push(patternArray[prev + lineLength - 1]);
    prev = prev + lineLength - 1;
  }

  for (let i = 0, prev = 0; i < lineLength - 1; i++) {
    diagonalTwo.push(patternArray[prev + lineLength + 1]);
    prev = prev + lineLength + 1;
  }

  patterns.push(diagonalOne);
  patterns.push(diagonalTwo);

  let gameBoardFilledWithX = squares.reduce((acc, current, index) => {
    if (current === "X") {
      console.log('index X', index);
      acc.push(index);};
    return acc;
  }, []) || [];

  let gameBoardFilledWithO = squares.reduce((acc, current, index) => {
    if (current === "O") {
      console.log('index O', index);
      acc.push(index);};
    return acc;
  }, []) || [];

  let resultX = patterns.some(i => {
    return i.every(ii => {
      return gameBoardFilledWithX.includes(ii);
    });
  });

  let resultO = patterns.some(i => {
    return i.every(ii => {
      return gameBoardFilledWithO.includes(ii);
    });
  });
  return resultX ? 'X' : resultO ? 'O' : null;
}

// ========================================

ReactDOM.render( /*#__PURE__*/
React.createElement(Game, null),
document.getElementById('root'));
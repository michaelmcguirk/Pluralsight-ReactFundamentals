const Stars = (props) => {
  let stars = [];
  for(let i=0; i<props.numberOfStars; i++){
  	stars.push(<i key={i} className="fa fa-star"></i>)
  }
  
  return (
    <div className="col-5">
			{stars}
    </div>
  );
};

const Button = (props) => {
	let button;
  switch(props.answerIsCorrect){
  	case true:
    	button = <button className="btn btn-success" onClick={props.acceptAnswer}><i className="fa fa-check"></i></button>;
    	break;
    case false:
    	button = <button className="btn btn-danger"><i className="fa fa-times"></i></button>;
    	break;
    default:
    	button = <button className="btn" disabled={props.selectedNumbers.length === 0} onClick={props.checkAnswer}>=</button>;
    	break;
  }
  return (
    <div className="col-2 text-center">
      {button}
      <br></br>
      <button className="btn btn-warning btn-sm" onClick={props.redrawStars}
      				disabled={props.numOfRedraw === 0}>
      	<i className="fa fa-refresh"></i>
        {props.numOfRedraw}
      </button>
      <br></br>
    </div>
  );
};

const Answer = (props) => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) => 
      	<span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>
      )}
    </div>
  );
};
 
const Numbers = (props) => {
	const numberClass = (number) => {
  	if(props.usedNumbers.indexOf(number) >= 0){
    	return 'used';
    }
  	if(props.selectedNumbers.indexOf(number) >= 0 ){
    	return 'selected';
    }
  }
  return (
    <div className="card text-center">
      <div>
				{Numbers.list.map((number, i) => 
        	<span key={i} className={numberClass(number)} onClick={() => props.selectNumber(number)}>{number}</span>
        )}
      </div>
    </div>
  );
};

Numbers.list = _.range(1,10);

const DoneFrame = (props) => {
	return (
  	<div className="text-center">
    	<h2>{props.doneStatus}</h2>
    </div>
  )
}

const GiveUp = (props) => {
	let button;
  if(props.inPlay){
  	button = <button className="btn btn-danger" onClick={props.giveUp}>I Give Up!!</button>;
  }else{
  	button = <button className="btn btn-success" onClick={props.resetGame}>Play Again</button>;
  }
	return (
  	<div>
  	  {button}
  	</div>
  )
}

class Game extends React.Component {
	static randomNumber = () => 1 + Math.floor(Math.random()*9);
  static initState = () => ({
  	selectedNumbers: [],
    numberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    numOfRedraw: 5,
    doneStatus: null,
    inPlay: true,
  });
	state = Game.initState();
  
  selectNumber = (clickedNumber) => {
  	if(this.state.selectedNumbers.indexOf(clickedNumber) < 0 && this.state.usedNumbers.indexOf(clickedNumber) < 0){
      this.setState(prevState => ({
      	answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
      }));
    }  
  }
  unselectNumber = (clickedNumber) => {
  	this.setState(prevState => ({
    	answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number != clickedNumber)
    }));
  }
  checkAnswer = () => {
  	this.setState(prevState => ({
    	answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc +n, 0)
    }));
  }
  acceptAnswer = () => {
  	console.log("Accepting Answer");
  	this.setState(prevState => ({
    	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber(),
    }));
    if(this.state.usedNumbers.length === 9){
    	this.setState(prevState => ({
   			doneStatus: "Winner winner chicken dinner!",
    	}));
    }
  }
  redrawStars = () => {
  	if(this.state.numOfRedraw === 0){ return; }
  	this.setState(prevState => ({
      numberOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      selectedNumbers: [],
      numOfRedraw: prevState.numOfRedraw - 1,
    }));
  }
  giveUp = () => {
  	this.setState(prevState => ({
    	doneStatus: "Game Over...",
      inPlay: false,
    }));
  }
  
  resetGame = () => {
  	this.setState(Game.initState());
  }
  render() {
    return (
      <div className="container">
        <h3>
        </h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={this.state.numberOfStars}/>
          <Button selectedNumbers={this.state.selectedNumbers}
          				checkAnswer={this.checkAnswer}
                  answerIsCorrect={this.state.answerIsCorrect}
                  acceptAnswer={this.acceptAnswer}
                  redrawStars={this.redrawStars}
                  numOfRedraw={this.state.numOfRedraw}/>
          <Answer selectedNumbers={this.state.selectedNumbers} unselectNumber=	                             {this.unselectNumber}/>
        </div>
        <br/>
        {this.state.doneStatus ?
        <DoneFrame doneStatus={this.state.doneStatus}/>
        :<Numbers selectedNumbers={this.state.selectedNumbers} 
        				selectNumber={this.selectNumber}
                usedNumbers={this.state.usedNumbers}/>
        }
        <br></br>
        <GiveUp giveUp={this.giveUp} inPlay={this.state.inPlay} resetGame={this.resetGame}/>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
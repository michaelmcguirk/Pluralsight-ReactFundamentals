class Button extends React.Component {
	handleClick = () => {
  	this.props.incCounterProp(this.props.incValue)
  }
  
	render(){
  	return (<button onClick={this.handleClick}> +{this.props.incValue} </button>);
  }
}

const Result = (props) => {
  	return (
    	<div>{props.counterProp}</div>
    )
}


class App extends React.Component {
	state = { counter: 0};
  
  incrementCounter = (incValue) => {
  	this.setState((prevState) =>
    	({ counter: prevState.counter + incValue}))
  };
  
	render(){
  	return(
    	<div>
      	<Button incValue={5} incCounterProp={this.incrementCounter} />
        <Button incValue={10} incCounterProp={this.incrementCounter} />
        <Button incValue={100} incCounterProp={this.incrementCounter} />
      	<Result counterProp={this.state.counter}/>
      </div>
    )
  }
}
ReactDOM.render(<App />, mountNode);
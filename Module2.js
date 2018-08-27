const Card = (props) => {
	return (
  	<div>
  	  <img width="75" src={props.avatar_url}/>
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
        	{props.name}
        </div>
        <div>{props.company}</div>
      </div>
      
  	</div>
  )
}

const CardList = (props) => {
	return(
  	<div>
    	{props.cards.map(card => <Card {...card}/>)}
    </div>
  )
}

class Form extends React.Component {
	state = { userName: ''}
	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`).then(resp => {
      	this.props.onSubmit(resp.data);
      });
  };
	render(){
  	return(
    	<form onSubmit={this.handleSubmit}>
      	<input type="text"
        value={this.state.userName} 
        onChange={(event) => this.setState({userName: event.target.value})}
        placeholder="Github Username" />
        <button type="submit">Add Card</button>
      </form>
    )
  }
}

class App extends React.Component {
	state = {
  	cards: [
      {"name": "Michael McGuirk",
        "company": "Workday",
        "avatar_url": "https://avatars3.githubusercontent.com/u/5692405?v=4"},
      {"name": "Michael McGuirk22",
      "company": "Workday2",
      "avatar_url": "https://avatars3.githubusercontent.com/u/5692405?v=4"}
    ]
  };
  
  addNewCard = (cardInfo) => {
  	this.setState(prevState => ({
    	cards: prevState.cards.concat(cardInfo)
    }))
  };
  
	render(){
  	return(
    	<div>
      	<Form onSubmit={this.addNewCard}/>
      	<CardList cards={this.state.cards}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode);
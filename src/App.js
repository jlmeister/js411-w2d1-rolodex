import React, { Component } from 'react';
import './App.css';

const Header = () => {
  return (
    <header>
      <h1>
        Some Random Users 😛
      </h1>
    </header>
  )
}

const List = ({ list }) => {
  return (
    <div className="list">
      {list.map((user) => (
        <UserCard key={user.email} {...user} />
      ))}
    </div>
  )
}

class UserCard extends Component {
  state = {
    resultsHidden: true
  }

  handleClick = () => {
    this.setState({
      resultsHidden: !this.state.resultsHidden
    });
  }

  render() {
    console.log('user card props: ', this.props);
    return (
      <div className="card">
        <div className="card-header">
          <img src={this.props.avatar} />
          <p>{this.props.name}</p>
          <button onClick={this.handleClick}>{this.state.resultsHidden ? 'show details' : 'hide details'}</button>
        </div>
        {!this.state.resultsHidden && (
          <>
            <p>email: {this.props.email}</p>
            <p>username: {this.props.username}</p>
            <p>age: {this.props.age}</p>
          </>  
        )}
      </div>
    )
  }
}

class App extends Component {
  state = {
    users: [],
    isLoaded: false
  }

  componentDidMount() {
    fetch('https://randomuser.me/api?results=25')
      .then(response => response.json())
      .then(parsedJSON => parsedJSON.results.map(user => (
        {
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          username: user.login.username,
          avatar: user.picture.thumbnail,
          age: user.dob.age
        }
      )))
      .then(users => this.setState({
        users: users,
        isLoaded: true
      }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.state.isLoaded ? <List list={this.state.users}/> : <p>loading...</p>}
      </div>
    )
  }
}

export default App;

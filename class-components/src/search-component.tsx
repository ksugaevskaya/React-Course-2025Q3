import { Component } from 'react';

export default class Search extends Component {
  handleClick = () => {};
  render() {
    return (
      <div>
        <input placeholder="Start your search"></input>
        <button onClick={this.handleClick}> Search </button>
      </div>
    );
  }
}

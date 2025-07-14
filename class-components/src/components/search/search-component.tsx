import { Component } from 'react';
import './search.css';

type Props = {
  onClick: () => void;
};

export default class Search extends Component<Props> {
  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('text', event.target.value.trim());
  };
  render() {
    return (
      <div className="top-container">
        <input
          className="input"
          defaultValue={localStorage.getItem('text') ?? ''}
          onChange={this.onInputChange}
          placeholder="Start your search"
        ></input>
        <button onClick={this.props.onClick}> Search </button>
      </div>
    );
  }
}

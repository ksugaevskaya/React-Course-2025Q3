import { Component } from 'react';

type Props = {
  onClick: () => void;
};

export default class Search extends Component<Props> {
  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('text', event.target.value.trim());
  };
  render() {
    return (
      <div>
        <input
          defaultValue={localStorage.getItem('text') ?? ''}
          onChange={this.onInputChange}
          placeholder="Start your search"
        ></input>
        <button onClick={this.props.onClick}> Search </button>
      </div>
    );
  }
}

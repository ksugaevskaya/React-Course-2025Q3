import { Component } from 'react';
import './pokemon.css';

type Props = {
  name: string;
  image: string;
  description: string;
};

export default class Pokemon extends Component<Props> {
  render() {
    return (
      <div className="pokemon-container">
        <img src={this.props.image}></img>
        <div className="pokemon-text-container">
          <h2 className="h2"> {this.props.name} </h2>
          <span>{this.props.description}</span>
        </div>
      </div>
    );
  }
}

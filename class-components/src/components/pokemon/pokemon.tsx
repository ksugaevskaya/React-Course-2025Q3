import './pokemon.css';

type Props = {
  name: string;
  image: string;
  description: string;
};

export default function Pokemon({ name, image, description }: Props) {
  return (
    <div className="pokemon-container">
      <img src={image}></img>
      <div className="pokemon-text-container">
        <h2 className="h2"> {name} </h2>
        <span className="pokemon-desription">{description}</span>
      </div>
    </div>
  );
}

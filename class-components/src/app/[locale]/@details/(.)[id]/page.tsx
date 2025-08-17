import DetailsPage from '../../../../pages/details/details';

type Props = { params: { id: string } };

export default async function PokemonDetails({ params }: Props) {
  return <DetailsPage pokemonId={params.id} />;
}

import './details.css';

export default function Details() {
  return (
    <>
      <div>
        <div>
          <div>
            <img
              className="details-img"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png
"
            />
          </div>
          <div className="pokemon-details-text-container">
            <h2 className="h2"> BULBASAUR </h2>
            <h3 className="h3">
              Description:{' '}
              <i>
                {' '}
                When the bulb on its back grows large, it appears to lose the
                ability to stand on its hind legs.
              </i>
            </h3>
            <h3 className="h3"> Base experience: 64</h3>
            <h3 className="h3"> Weight: 69</h3>
            <h3 className="h3"> Height: 7 </h3>
            <h3 className="h3"> Types: grass, poison</h3>
          </div>
        </div>
      </div>
    </>
  );
}

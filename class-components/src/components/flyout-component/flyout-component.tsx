import { useDispatch, useSelector } from 'react-redux';
import './flyout-component.css';
import type { RootState } from '../../redux/store';
import { unselectAll } from '../../redux/slices/selected-pokemon-slice';
export default function FlyOutComponent() {
  const dispatch = useDispatch();
  const ids = useSelector((state: RootState) => state.selectedPokemon.ids);
  const handleClick = () => {
    dispatch(unselectAll());
  };
  return (
    <>
      <div className={`flyout ${ids.length >= 1 ? 'show' : 'hide'}`}>
        {' '}
        <span className="bn-text">Selected: {ids.length}</span>{' '}
        <button onClick={handleClick} className="bn-text">
          {' '}
          Unselect all{' '}
        </button>
        <button className="bn-text"> Download </button>
      </div>
    </>
  );
}

import './App.css';
import { useState } from 'react';
import Modal from './components/modal/modal';
import UncontrolledForm from './components/uncontrolled/uncontrolled';
import ControlledForm from './components/controlled/controlled';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';

function App() {
  const form = useSelector((state: RootState) => state.form);
  const [controlled, setControlled] = useState(false);
  const [uncontrolled, setUncontrolled] = useState(false);

  const handleControlledButton = () => {
    setControlled(true);
  };

  const handleUncontrolledButton = () => {
    setUncontrolled(true);
  };

  const handleCloseButtonControlled = () => {
    setControlled(false);
  };

  const handleCloseButtonUncontrolled = () => {
    setUncontrolled(false);
  };
  return (
    <>
      <button onClick={handleControlledButton}> Open Controlled Modal</button>
      <button onClick={handleUncontrolledButton}>
        {' '}
        Open Uncontrolled Modal
      </button>
      <Modal visible={controlled} onClose={handleCloseButtonControlled}>
        <ControlledForm></ControlledForm>
      </Modal>
      <Modal visible={uncontrolled} onClose={handleCloseButtonUncontrolled}>
        <UncontrolledForm></UncontrolledForm>
      </Modal>
      <div>
        <p>Controlled:</p>
        <p>{JSON.stringify(form.controlled, null, 2)}</p>
      </div>
      <div>
        <p>Uncontrolled:</p>
        <p>{JSON.stringify(form.uncontrolled, null, 2)}</p>
      </div>
    </>
  );
}

export default App;

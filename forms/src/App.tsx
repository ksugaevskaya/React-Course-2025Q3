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
      <div className="button-container">
        <button onClick={handleControlledButton}> Open Controlled Modal</button>
        <button onClick={handleUncontrolledButton}>
          {' '}
          Open Uncontrolled Modal
        </button>
      </div>
      <Modal visible={controlled} onClose={handleCloseButtonControlled}>
        <ControlledForm
          onSubmitted={handleCloseButtonControlled}
        ></ControlledForm>
      </Modal>
      <Modal visible={uncontrolled} onClose={handleCloseButtonUncontrolled}>
        <UncontrolledForm
          onSubmitted={handleCloseButtonUncontrolled}
        ></UncontrolledForm>
      </Modal>
      <div>
        <p>Controlled:</p>
        <div className="data-container">
          <div className="text-container">
            <div>
              {' '}
              <b>NAME :</b> {form.controlled?.fname}
            </div>
            <div>
              <b>AGE </b> {form.controlled?.age}
            </div>
            <div>
              <b>EMAIL: </b>
              {form.controlled?.email}
            </div>
            <div>
              <b>PASSWORD:</b> {form.controlled?.password}
            </div>
            <div>
              {' '}
              <b>REPEAT PASSWORD: </b>
              {form.controlled?.passwordRepeat}
            </div>
            <div>
              {' '}
              <b>GENDER: </b>
              {form.controlled?.gender}
            </div>
            <div>
              {' '}
              <b>T&C: </b>
              {form.controlled?.checkbox}
            </div>{' '}
          </div>
          <div>
            <img
              src={form.controlled?.file}
              alt="Base64 image"
              style={{ width: 200, height: 200 }}
            />
          </div>
        </div>
      </div>
      <div>
        <p>Uncontrolled:</p>
        <div className="data-container">
          <div className="text-container">
            <div>
              {' '}
              <b>NAME :</b> {form.uncontrolled?.fname}
            </div>
            <div>
              <b>AGE </b> {form.uncontrolled?.age}
            </div>
            <div>
              <b>EMAIL: </b>
              {form.uncontrolled?.email}
            </div>
            <div>
              <b>PASSWORD:</b> {form.uncontrolled?.password}
            </div>
            <div>
              {' '}
              <b>REPEAT PASSWORD: </b>
              {form.uncontrolled?.passwordRepeat}
            </div>
            <div>
              {' '}
              <b>GENDER: </b>
              {form.uncontrolled?.gender}
            </div>
            <div>
              {' '}
              <b>T&C: </b>
              {form.uncontrolled?.checkbox}
            </div>{' '}
          </div>
          <div>
            <img
              src={form.uncontrolled?.file}
              alt="Base64 image"
              style={{ width: 200, height: 200 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

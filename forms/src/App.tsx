import "./App.css";
import { useState } from "react";
import Modal from "./components/modal/modal";

function App() {
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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={handleControlledButton}> Open Controlled Modal</button>
      <button onClick={handleUncontrolledButton}>
        {" "}
        Open Uncontrolled Modal
      </button>
      <Modal visible={controlled} onClose={handleCloseButtonControlled}>
        {" "}
        привет ксю
      </Modal>
      <Modal visible={uncontrolled} onClose={handleCloseButtonUncontrolled}>
        {" "}
        привет
      </Modal>
    </>
  );
}

export default App;

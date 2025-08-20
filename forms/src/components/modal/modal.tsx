import "./modal.css";
import cross from "../../assets/cross.svg";

export default function Modal({ visible, children, onClose }) {
  const onStop = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {visible === true && (
        <div onClick={onClose} className="modal-container">
          <div onClick={onStop} className="modal-content">
            <img onClick={onClose} className="cross" src={cross}></img>
            {children}
          </div>
        </div>
      )}{" "}
    </>
  );
}

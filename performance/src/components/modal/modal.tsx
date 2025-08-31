import './modal.css';
import cross from '../../assets/cross.svg';
import { createPortal } from 'react-dom';
import { useCallback, useEffect } from 'react';
import React from 'react';

type ModalProps = {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

function Modal({ visible, children, onClose }: ModalProps) {
  const onStop = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <>
      {visible === true &&
        createPortal(
          <div
            onClick={onClose}
            className="modal-container"
            data-testid="greyArea"
          >
            <div
              role="dialog"
              aria-modal="true"
              onClick={onStop}
              className="modal-content"
              data-testid="modalContent"
            >
              <img
                aria-label="Close dialog"
                onClick={onClose}
                className="cross"
                src={cross}
                data-testid="cross"
              ></img>
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default React.memo(Modal);

import { useState } from 'react';
import Modal from '../modal/modal';
import type { Row } from '../../api/api';
import React from 'react';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (fields: (keyof Row)[]) => void;
};

function Columns({ visible, onClose, onConfirm }: Props) {
  const [fields, setFields] = useState<(keyof Row)[]>([]);

  const toggleField = (field: keyof Row) => {
    setFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleSubmit = () => {
    onConfirm(fields);
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <div>
        <input
          type="checkbox"
          id="one"
          name="methane"
          checked={fields.includes('methane')}
          onChange={() => toggleField('methane')}
        />
        <label htmlFor="one">Methane</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="two"
          name="oil_co2"
          checked={fields.includes('oilCO2')}
          onChange={() => toggleField('oilCO2')}
        />
        <label htmlFor="two">Oil CO2</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="three"
          name="temperature_change_from_co2"
          checked={fields.includes('temperatureChangeFromCO2')}
          onChange={() => toggleField('temperatureChangeFromCO2')}
        />
        <label htmlFor="three">Temperature change from CO2</label>
      </div>
      <button onClick={handleSubmit}>Confirm</button>
    </Modal>
  );
}

export default React.memo(Columns);

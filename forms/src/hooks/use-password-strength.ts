import { useState } from 'react';
import { hasAtLeastOneSymbol } from '../validation/has-at-least-one-symbol';

const usePasswordStrength = () => {
  const [strength, setStrength] = useState(0);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrength(0);

    if (hasAtLeastOneSymbol(e.target.value, '0123456789')) {
      setStrength((s) => s + 1);
    }
    if (hasAtLeastOneSymbol(e.target.value, 'qwertyuiopasdfghjklzxcvbnm')) {
      setStrength((s) => s + 1);
    }
    if (hasAtLeastOneSymbol(e.target.value, 'QWERTYUIOPASDFGHJKLZXCVBNM')) {
      setStrength((s) => s + 1);
    }
    if (
      hasAtLeastOneSymbol(e.target.value, `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~'`)
    ) {
      setStrength((s) => s + 1);
    }
  };

  return [strength, handlePasswordChange] as const;
};

export default usePasswordStrength;

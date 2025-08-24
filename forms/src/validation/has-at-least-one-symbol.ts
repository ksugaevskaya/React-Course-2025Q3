export const hasAtLeastOneSymbol = (
  string: string,
  symbols: string
): boolean => {
  for (let i = 0; i < symbols.length; i++) {
    if (string.includes(symbols[i])) {
      return true;
    }
  }

  return false;
};

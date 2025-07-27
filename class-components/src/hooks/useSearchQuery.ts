export default function useSearchQuery() {
  const set = (parametr: string) => {
    return localStorage.setItem('text', parametr);
  };
  const get = (): string => {
    return localStorage.getItem('text') ?? '';
  };

  return [set, get] as const;
}

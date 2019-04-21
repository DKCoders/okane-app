import { useState, useCallback } from 'react';

let debounce;
function useDebounceState(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  const setValue = useCallback((_value) => {
    if (debounce) {
      clearTimeout(debounce);
    }
    debounce = setTimeout(() => setDebouncedValue(_value), delay);
  }, [value]);

  return [debouncedValue, setValue];
}

export default useDebounceState;

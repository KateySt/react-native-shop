import { useState, useCallback } from 'react';

const useDebouncedSearch = (searchFunction: (term: string) => void, delay: number = 500) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      searchFunction(term);
    }, delay),
    [searchFunction, delay],
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleClose = () => {
    setSearchTerm('');
  };

  return { searchTerm, handleSearch, handleClose };
};

const debounce = <F extends (...args: any[]) => void>(func: F, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

export { useDebouncedSearch };

import React, { useState, useEffect } from 'react';

/*
@initialState initial state of localStorage
@key the key for localStorage 
*/

export default function useLocalStorage(initialState, key) {
  const get = () => {
    const storage = localStorage.getItem(key);
    const store = JSON.parse(storage)[value];
    if (store) return JSON.parse(storage)[value];
    return initialState;
  };

  const [value, setValue] = useState(get());
  console.log('value', value);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value]);

  return [value, setValue];
}

import React, { useState, useEffect } from 'react';
import useLocalStorageHook from './useLocalStorage';

// useEffect can resolve
// many class based life cycle methods
// and the callback with this.setState

// componentDidMount()
// useEffect(() => {}, [])

// run always on renders
// useEffect(() => {})

// run only when x changes
// useEffect(() => {},x)

// helps with testing
const dcrmnt = state => {
  // breaks
  //   if (state < -10) return;
  if (state <= -10) return state;
  return state - 1;
};

const storeInLocalStorage = count => {
  if (count) {
    localStorage.setItem('count', JSON.stringify({ count: count }));
  }
};

const getStoreFromLocalStorage = () => {
  const count = localStorage.getItem('count');
  if (count) {
    return JSON.parse(count).count;
  }
  return 0;
};

const Counter = ({ max, step }) => {
  //   const [count, setCount] = useState(getStoreFromLocalStorage());
  const [count, setCount] = useLocalStorageHook(0, 'counter');

  useEffect(() => {
    document.title = `Count: ${count}`;
    // storeInLocalStorage(count);
  }, [count]);

  const increment = () => {
    setCount(count + 1);
    //   no effect
    // setCount(count + 1);
    // setCount(count + 1);
  };

  const decrement = () => {
    setCount(dcrmnt);
    // has effect
    // setCount(dcrmnt)
    // setCount(dcrmnt)
  };

  const reset = () => setCount(count => 0);

  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={() => reset()}>Reset</button>
      </section>
    </div>
  );
};

export default Counter;

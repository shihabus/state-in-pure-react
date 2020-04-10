import React, { useState, useEffect, useRef } from 'react';

const Counter = ({ max, step }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef();

  let message = '--';
  if (counterRef.current < count) message = 'High';
  if (counterRef.current > count) message = 'Low';

  counterRef.current = count;

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  useEffect(() => {
    let id = setInterval(function() {
      console.log(count);
    }, 3000);
    return () => clearInterval(id);
  }, [count]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(c => c - 1);
  };

  const reset = () => setCount(count => 0);

  return (
    <div className="Counter">
      <p>{message}</p>
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={() => reset()}>Reset</button>
      </section>
    </div>
  );
};

export default Counter;

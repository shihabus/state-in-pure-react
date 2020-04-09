import React, { Component } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('count');
  console.log(JSON.parse(storage));
  if (storage) return JSON.parse(storage);
  return { count: 0 };
};

function setStateInLocalStorage() {
  console.log('Post decrement callback', this.state.count);
  localStorage.setItem('count', JSON.stringify(this.state));
}

function updateDocTitle() {
  document.title = `count: ${this.state.count}`;
}

// helps with testing
const increment = (state, props) => {
  const { step, max } = props;
  if (state.count >= max) return;
  return { count: state.count + step };
};

class Counter extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   count: 0,
    // };
    this.state = getStateFromLocalStorage();
    this.decrement = this.decrement.bind(this);
    this.updateDocTitle = updateDocTitle.bind(this);
  }

  increment = () => {
    // const { max, step } = this.props;
    // this.setState(({ count }) => {
    //   if (count >= max) return;
    //   return { count: count + step };
    // });
    // -----XXXXXX----------
    // this.setState((state, props) => {
    //   const { step, max } = props;
    //   if (state.count >= max) return;
    //   return { count: state.count + step };
    // });
    this.setState(increment, updateDocTitle);
  };

  decrement() {
    this.setState(
      ({ count }) => ({ count: count - 1 }),
      // function() {
      //   console.log('Post decrement callback', this.state.count);
      //   localStorage.setItem('count', JSON.stringify(this.state));
      // },
      setStateInLocalStorage.bind(this),
    );

    console.log('Post decrement', this.state.count);
    // this all triggers if called
    // this.setState(({ count }) => ({ count: count - 1 }));
    // this.setState(({ count }) => ({ count: count - 1 }));
    // this.setState(({ count }) => ({ count: count - 1 }));
  }

  reset() {
    this.setState(
      { count: 0 },
      () => (document.title = `count:${this.state.count}`),
    );
  }

  render() {
    const { count } = this.state;
    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={() => this.reset()}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;

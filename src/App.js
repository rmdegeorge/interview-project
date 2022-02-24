import React from 'react'
import styles from './App.module.css';

import Deck from './components/deck/deck.component'

function App() {
  return (
    <div className={styles.table}>
      <h1>
        Lets Draw Some Cards
      </h1>
      <div className='container'>
        <Deck />
      </div>
    </div>
  );
}

export default App;

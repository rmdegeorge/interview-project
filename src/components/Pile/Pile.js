import React from 'react';
import styles from './Pile.module.scss';
import PropTypes from 'prop-types';

export default function Pile({ suit, cards }) {
	const cardCodes = cards.map((card) => card.value)
  return(
    <div id={`${suit}-pile`}>
			<h2>{suit}</h2>
			{cards.length > 0 && <div>[{cardCodes.join(', ')}]</div>}
			<div className={styles.pile}>
				{cards.map((card, index) => (
					<div key={`${index}${card.code}`}className={styles.cardContainer}>
						<img
							className={styles.cardImg}
							src={card.image}
							alt={`${card.value} of ${card.suit}`}
						/>
					</div>
				))}
			</div>
    </div>
  );

}

Pile.propTypes = {
	suit: PropTypes.oneOf(['Clubs', 'Diamonds', 'Spades', 'Hearts']).isRequired,
	cards: PropTypes.array.isRequired,
};


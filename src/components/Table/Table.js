import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pile from '../Pile';

export default function Table() {
	const [deck, setDeck] = useState(null);
	const [clubs, setClubs] = useState([]);
	const [diamonds, setDiamonds] = useState([]);
	const [spades, setSpades] = useState([]);
	const [hearts, setHearts] = useState([]);
	const [hasQueenClubs, setHasQueenClubs] = useState(false);
	const [hasQueenDiamonds, setHasQueenDiamonds] = useState(false);
	const [hasQueenSpades, setHasQueenSpades] = useState(false);
	const [hasQueenHearts, setHasQueenHearts] = useState(false);
	const [hasAllQueens, setHasAllQueens] = useState(false);
	const [disableButtons, setDisableButtons] = useState(false);

	const disableButtonsForTime = (time) => {
		setDisableButtons(true);
		setTimeout(() => setDisableButtons(false), time);
	};

	const shuffle = async () => {
		try {
			const result = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
			setDeck(result.data);
		} catch (error) {
			console.log(error);
		} finally {
			disableButtonsForTime(1000);
		}
	};

	const getFaceCardValue = (value) => {
		switch (value) {
			case 'KING':
				return '13';
			case 'JACK':
				return '11';
			case 'ACE':
				return '0';
			default:
				return value;
		}
	};

	const addToPile = (card) => {
		if (card.suit === 'CLUBS') {
			if (card.value === 'QUEEN') {
				setHasQueenClubs(true);
				card.value = '12';
			} else {
				card.value = getFaceCardValue(card.value);
			}
			setClubs(clubs => [...clubs, card]);
		} else if (card.suit === 'DIAMONDS') {
			if (card.value === 'QUEEN') {
				setHasQueenDiamonds(true);
				card.value = '12';
			} else {
				card.value = getFaceCardValue(card.value);
			}
			setDiamonds(diamonds => [...diamonds, card]);
		} else if (card.suit === 'SPADES') {
			if (card.value === 'QUEEN') {
				setHasQueenSpades(true);
				card.value = '12';
			} else {
				card.value = getFaceCardValue(card.value);
			}
			setSpades(spades => [...spades, card])
		} else {
			if (card.value === 'QUEEN') {
				setHasQueenHearts(true);
				card.value = '12';
			} else {
				card.value = getFaceCardValue(card.value);
			}
			setHearts(hearts => [...hearts, card])
		}
	};

	const draw = async () => {
		try {
			const result = await axios.get(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`);
			const cards = result.data.cards;
			cards.forEach((card) => addToPile(card));
		} catch (error) {
			console.log(error);
		} finally {
			disableButtonsForTime(1000);
		}
	};

	const sortPile = ((pile) => {
		const compare = (a, b) => {
			let valA = a.value;
			let valB = b.value;
			let values = [valA, valB];
			values.forEach((value) =>{
				switch (value) {
					case 'KING':
						value = '13';
						break;
					case 'QUEEN':
						value = '12';
						break;
					case 'JACK':
						value = '11';
						break;
					case 'ACE':
						value = '0';
						break;
					default:
						break;
				}
			});
			return values[0] - values[1];
		}
		let sortedPile = pile.sort((a, b) => compare(a, b));
		return [...sortedPile];
	});

	const handSortPilesClick = () => {
		setClubs(clubs => sortPile(clubs));
		setDiamonds(diamonds => sortPile(diamonds));
		setSpades(spades => sortPile(spades));
		setHearts(hearts => sortPile(hearts));
		setDisableButtons(true);
	};

	useEffect(() => {
		if (hasQueenClubs && hasQueenDiamonds && hasQueenSpades && hasQueenHearts) setHasAllQueens(true);
	}, [hasQueenClubs, hasQueenDiamonds, hasQueenSpades, hasQueenHearts]);

	return(
		<div className='container'>
			<div className='row'>
				{deck == null ? (
					<div className='col-sm-4 mx-auto'>
						<button className='btn btn-primary' onClick={shuffle} disabled={disableButtons}>
							Shuffle
						</button>
					</div>
				) : !hasAllQueens ? (
					<div className='col-sm-4 mx-auto'>
						<button className='btn btn-secondary' onClick={draw} disabled={disableButtons}>
							Draw
						</button>
					</div>
				) : (
					<div className='col-sm-4 mx-auto'>
						<button className='btn btn-primary' onClick={handSortPilesClick} disabled={disableButtons}>
							Sort Piles
						</button>
					</div>
				)}
			</div>
			<div className='row'>
				<div className='col-sm text-center'>
					<Pile suit='Clubs' cards={clubs} />
				</div>
				<div className='col-sm text-center'>
					<Pile suit='Diamonds' cards={diamonds} />
				</div>
				<div className='col-sm text-center'>
					<Pile suit='Spades' cards={spades} />
				</div>
				<div className='col-sm text-center'>
					<Pile suit='Hearts' cards={hearts} />
				</div>
			</div>
		</div>
	);
}

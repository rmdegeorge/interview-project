import React from 'react';
import styles from './TopBanner.module.scss';

export default function TopBanner() {
	return(
		<div className={styles.bannerContainer}>
			<div className="row">
				<div className="col-sm-12 text-center">
					<h1 id={styles.title}>Find the Queens!</h1>
				</div>
			</div>
		</div>
	);
}

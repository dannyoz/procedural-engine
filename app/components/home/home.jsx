import React from 'react';
import * as Engine from '../../../engine/engine';

const level_2 = new Engine.Level2();
level_2.generate();
const grid = level_2.grid;
console.log(level_2);

let home = React.createClass({
	render() {
		let map = grid.map((row, index) => {
			return (
				<span className="row" key={index}>
					{row.columns.map((column, index) => {
						return <span className={column.playable ? "column playable" : "column"} key={index}>{column.number}</span>
					})}
				</span>
		)});
		return(
			<div className="centre">
				<div className="map">
					{map}
				</div>
			</div>
		);
	}
});

export default home;
import React from 'react';
import * as Engine from '../../../engine/engine';


const level_1 = new Engine.Level(5,5);
level_1.generate();
const grid = level_1.grid;
console.log(level_1);

let home = React.createClass({
	render() {
		let map = grid.map((row, index) => {
			return (
				<span className="row" key={index}>
					{row.columns.map((column, index) => {
						return <span className="column" key={index}>{column.number}</span>
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
import React from 'react';
import * as Engine from '../../../engine/engine';

// const level_2 = new Engine.Level2();
// level_2.generate();
// const grid = level_2.grid;
// console.log(level_2);

const map = new Engine.map(12, 25, 35, 3);
map.generate();
const grid = map.grid;
console.log(map);

let home = React.createClass({
	render() {
		let map = grid.map((row, index) => {
			return (
				<span className="row" key={index}>
					{row.map((column, index) => {
						return <span className={column == 1 ? "column playable" : "column"} key={index}></span>
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
import React from 'react';
import * as Engine from '../../../engine/engine';

// const level_2 = new Engine.Level2();
// level_2.generate();
// const grid = level_2.grid;
// console.log(level_2);

let home = React.createClass({

	getInitialState() {
		return {
			width: 25,
			height: 25,
			fill: 40,
			smoothing: 3,
			grid: [],
		}
	},
	componentDidMount() {
		this.generate();
	},
	generate() {
		const map = new Engine.map(12, 18, 23, 3);
		map.generate();
		const grid = map.grid;
		console.log(map);
		this.setState({
			grid: grid
		});
	},
	handleChange(key, event) {
		const state = this.state;
		state[key] = event.target.value;
		this.setState(state); 
	},
	render() {
		let map = this.state.grid.map((row, index) => {
			return (
				<span className="row" key={index}>
					{row.map((column, index) => {
						return <span className={column == 1 ? "column playable" : "column"} key={index}></span>
					})}
				</span>
		)});
		return(
			<div>
				<div className="centre">
					<div className="map">
						{map}
					</div>
				</div>
				<div>
					<label>width</label>
					<input value={this.state.width} type="number" onChange={this.handleChange.bind(null,'width')}/>
					<label>height</label>
					<input value={this.state.height} type="number" onChange={this.handleChange.bind(null,'height')}/>
					<label>fill</label>
					<input value={this.state.fill} type="number" onChange={this.handleChange.bind(null,'fill')}/>
					<label>smoothing</label>
					<input value={this.state.smoothing} type="number" onChange={this.handleChange.bind(null,'smoothing')}/>
					<button onClick={this.generate}>generate</button>
				</div>
			</div>
		);
	}
});

export default home;
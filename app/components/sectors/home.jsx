import React from 'react';

import * as Engine from '../../../engine/sectors';

let home = React.createClass({

	getInitialState() {
		return {
			width: 8,
			height: 9,
			restrict: 1,
			grid: [],
		}
	},
	componentDidMount() {
		this.generate();
	},
	generate() {
		const w = this.state.width;
		const h = this.state.height;
		const r = this.state.restrict;
		// const map = new Engine.map(w, h, f, s, c);
		const sectors = new Engine.sectors(w, h, r);

		console.log(sectors);

		this.setState({
			grid: sectors.grid
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
						return <span className={column.playable ? "column playable" : "column"} key={index}></span>
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
				<div className="controls">
					<div className="controls__input">
						<label>Width: {this.state.width}</label>
						<input value={this.state.width} type="range" min="3" max="200" onChange={this.handleChange.bind(null,'width')}/>
					</div>
					<div className="controls__input">
						<label>Height: {this.state.height}</label>
						<input value={this.state.height} type="range" min="3" max="200" onChange={this.handleChange.bind(null,'height')}/>
					</div>
					<div className="controls__input">
						<label>restrict: {this.state.restrict}</label>
						<input value={this.state.restrict} type="range" min="0" max="3" onChange={this.handleChange.bind(null,'restrict')}/>
					</div>
					<div className="controls__input">
						<button onClick={this.generate}>generate</button>
					</div>
				</div>
			</div>
		);
	}
});

export default home;
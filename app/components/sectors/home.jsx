import React from 'react';

import * as Engine from '../../../engine/sectors';

let home = React.createClass({

	getInitialState() {
		return {
			width: 7,
			height: 5,
			fill: 40,
			smoothing: 4,
			cycles: 3,
			grid: [],
		}
	},
	componentDidMount() {
		this.generate();
	},
	generate() {
		const w = this.state.width;
		const h = this.state.height;
		const f = this.state.fill;
		const s = this.state.smoothing;
		const c = this.state.cycles;
		// const map = new Engine.map(w, h, f, s, c);
		const sectors = new Engine.sectors(w, h);

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
						<label>Fill: {this.state.fill}</label>
						<input value={this.state.fill} type="range" min="10" onChange={this.handleChange.bind(null,'fill')}/>
					</div>
					<div className="controls__input">
						<label>Smoothing: {this.state.smoothing}</label>
						<input value={this.state.smoothing} type="range" min="4" max="6" onChange={this.handleChange.bind(null,'smoothing')}/>
					</div>
					<div className="controls__input">
						<label>Smoothing cycles: {this.state.cycles}</label>
						<input value={this.state.cycles} type="range" max="5" onChange={this.handleChange.bind(null,'cycles')}/>
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
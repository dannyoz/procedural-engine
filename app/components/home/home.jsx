import React from 'react';
import * as Engine from '../../../engine/engine';

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
		let w = this.state.width;
		let h = this.state.height;
		let f = this.state.fill;
		let s = this.state.smoothing;
		let map = new Engine.map(w, h, f, s);

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
				<div className="controls">
					<div className="controls__input">
						<label>Width: {this.state.width}</label>
						<input value={this.state.width} type="range" min="12" max="40" onChange={this.handleChange.bind(null,'width')}/>
					</div>
					<div className="controls__input">
						<label>Height: {this.state.height}</label>
						<input value={this.state.height} type="range" min="12" max="40" onChange={this.handleChange.bind(null,'height')}/>
					</div>
					<div className="controls__input">
						<label>Fill: {this.state.fill}</label>
						<input value={this.state.fill} type="range" min="10" onChange={this.handleChange.bind(null,'fill')}/>
					</div>
					<div className="controls__input">
						<label>Smoothing: {this.state.smoothing}</label>
						<input value={this.state.smoothing} type="range" max="5" onChange={this.handleChange.bind(null,'smoothing')}/>
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
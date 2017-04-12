import React from 'react';

let Path = React.createClass({
	getInitialState() {
		return {
			active: null,
		}
	},

	componentDidMount() {
		const self = this;
		window.onkeydown = (e) => {
			self.handleKeyPress(e.key);
		};
	},

	handleKeyPress(key) {
		if (key === 'ArrowDown' && this.state.active === null) {
			this.setState({
				active: 1
			});
		} else if (key === 'ArrowDown' && this.state.active < (this.props.path.length -1)) {
			this.setState({
				active: this.state.active + 1
			});
		} else if (key === 'ArrowUp' && this.state.active > 0) {
			this.setState({
				active: this.state.active - 1
			});
		}
		const cell = this.props.path[this.state.active];
		this.props.highlight(cell);
	},

	highlight(cell, index) {
		this.setState({
			active: index,
		})
		this.props.highlight(cell);
	},

	render() {

		return ( 
			<div className="path">
				{this.props.path && 
					<ul>
						{this.props.path.map((cell, index) => {
							return (
								<li className={this.state.active === index ? 'active' : ''} onClick={this.highlight.bind(null, cell, index)} key={index}>
									<span>Cell {index+1}</span><br />
									<span>X: {cell.x} Y: {cell.y}</span>
								</li>
							)
						})}
					</ul>
				}
			</div>
		);
	}
});

export default Path;

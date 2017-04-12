import React from 'react';

let Path = React.createClass({
	getInitialState() {
		return {
			active: null,
		}
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

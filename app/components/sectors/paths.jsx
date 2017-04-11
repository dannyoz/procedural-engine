import React from 'react';

class Path extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			active: 0,
		};
	}

	render() {

		return ( 
			<div className="path">
				{this.props.path && 
					<ul>
						{this.props.path.map((cell, index) => {
							return (
								<li onClick={this.props.highlight.bind(null, cell)} key={index}>
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
};

export default Path;

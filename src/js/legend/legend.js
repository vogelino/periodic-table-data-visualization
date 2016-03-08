import React, { Component, PropTypes } from 'react';

export default class LegendView extends Component {
	static propTypes = {
		state: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
	}
	render() {
		const colors = this.props.state.get('colors').toJSON();
		return (
			<div className="legend">
				<div className="color-legend">
					{Object.keys(colors).map((colorKey, index) => {
						const colorStyles = {
							backgroundColor: colors[colorKey]
						};
						return (
								<div className="color-legend-wrapper" key={index}>
									<span
										className="color-badge"
										style={colorStyles}>
									</span>
									<span className="color-label">{colorKey}</span>
								</div>
							);
					})}
				</div>
				<div className="bar-legend">
					<div className="bar-legend-wrapper">
						<div className="atomic-number"></div>
						<div className="atomic-number-number">119</div>
						<div className="atomic-number-line"></div>
						<div className="atomic-number-label">Atomic number</div>
						<div className="element-symbol"></div>
						<div className="element-symbol-symbol">Abc</div>
						<div className="element-symbol-line"></div>
						<div className="element-symbol-label">Symbol</div>
					</div>
				</div>
			</div>
		);
	}
};

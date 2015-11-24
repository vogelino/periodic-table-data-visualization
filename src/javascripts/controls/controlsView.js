import React, { Component, PropTypes } from 'react';
const Select = require('react-select');

export default class ContorlsView extends Component {
	static propTypes = {
		state: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
	}
	render() {
		let parameters = this.props.state.get('parameters')
		parameters = parameters.map((parameter) => {
			return {
				value: parameter,
				label: parameter
			};
		});
		return (
			<div className="controls">
				<div className="control-group">
					<label>
						<span className="label-text">Sort by:</span>
						<Select
							className="react-select"
							name="sorting-select"
							ref="sorting"
							value={this.props.state.get('selectedSortingKey')}
							options={parameters.toArray()}
							onChange={this.props.actions.onSortingChanged}
							allowCreate={false}
							clearable={false}
							searchable={false} />
					</label>
				</div>
			</div>
		);
	}
};

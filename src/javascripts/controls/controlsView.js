import React, { Component, PropTypes } from 'react';

export default class ContorlsView extends Component {
	static propTypes = {
		state: PropTypes.object.isRequired
	};
	render() {
		return (
			<div>
				<h1>Hello World</h1>
			</div>
		);
	}
};

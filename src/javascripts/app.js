import React from 'react';
import ReactDOM from 'react-dom';
import Deferred from 'deferred-js';
import ElementsModel from './visualizution/elements/elementsModel';
import ElementsList from './visualizution/elements/elementsList';
import ControlsView from './controls/controlsView';
import Immutable from 'immutable';

let state = Immutable.Map({});
const actions = {};
const elementsModel = new ElementsModel();
const elementsList = new ElementsList();

const initApp = () => {
	elementsList.setElement('periodic-table-data-visualization');
	elementsList.setModel(elementsModel);
	elementsModel.fetch().done(() => {
		initElements();
		elementsList.render();
	});
};

const initElements = () => {
	setState({
		parameters: [
			'atomicNumber',
			'groupBlock',
			'name',
			'symbol'
		],
		selectedSortingKey: 'groupBlock'
	});
};

// Actions
actions.onSortingChanged = (selectedSortingKey) => {
	elementsList.setSortingKey(selectedSortingKey);
	elementsList.render();
	setState({selectedSortingKey})
};

function setState(changes) {
    state = state.mergeDeep(changes);
    let Component = React.createElement(ControlsView, {
		state: state,
		actions
	});
    ReactDOM.render(Component, document.getElementById('periodic-table-controls'));
}

window.document.addEventListener('DOMContentLoaded', initApp);

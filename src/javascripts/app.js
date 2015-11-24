import React from 'react';
import ReactDOM from 'react-dom';
import ElementsModel from './visualizution/elements/elementsModel';
import ElementsList from './visualizution/elements/elementsList';
import ControlsView from './controls/controlsView';

const initApp = () => {
	initDataVisualization();
	initControls();
};

const initControls = () => {
	setState({
		sortingKey: 'groupBlock',
		sizeParameter: 'atomicNumber'
	});
};

const initDataVisualization = () => {
	const elementsModel = new ElementsModel();
	const elementsList = new ElementsList();

	elementsList.setElement('periodic-table-data-visualization');
	elementsList.setModel(elementsModel);
	elementsModel.fetch().done(() => {
		elementsList.render();
	});
};

// Model
const state = {};

function setState(changes) {
    Object.assign(state, changes);
    var Component = React.createElement(ControlsView, {
		state: Object.assign({}, state)
	});
    ReactDOM.render(Component, document.getElementById('periodic-table-controls'));
}

window.document.addEventListener('DOMContentLoaded', initApp);

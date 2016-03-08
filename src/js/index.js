import React from 'react';
import ReactDOM from 'react-dom';
import Deferred from 'deferred-js';
import ElementsModel from './visualizution/elementsModel';
import ElementsList from './visualizution/elementsList';
import ControlsView from './controls/controlsView';
import Immutable from 'immutable';
import styles from '../stylesheets/index.styl';

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
	const colors = {
		'nonmetal': 			'#CD51CB',
		'noble gas': 			'#73D74D',
		'alkali metal': 		'#D55438',
		'alkaline earth metal': '#559BBA',
		'metalloid': 			'#57D29E',
		'halogen': 				'#CC567E',
		'metal': 				'#5D8A3A',
		'transition metal': 	'#917ACA',
		'lanthanoid': 			'#BE8630',
		'actinoid': 			'#CDD143'
	};
	setState({
		parameters: [
			'atomicNumber',
			'groupBlock',
			'name',
			'symbol'
		],
		selectedSortingKey: 'groupBlock',
		colors
	});
	elementsList.setColors(colors);
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

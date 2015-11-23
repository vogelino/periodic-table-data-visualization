import ElementsModel from './visualizution/elements/elementsModel';
import ElementsList from './visualizution/elements/elementsList';

const initDataVisualization = () => {
	const elementsModel = new ElementsModel();
	const elementsList = new ElementsList();

	elementsList.setElement('periodic-table-data-visualization');
	elementsList.setModel(elementsModel);
	elementsModel.fetch().done(() => {
		elementsList.render();
	});
};

window.document.addEventListener('DOMContentLoaded', initDataVisualization);

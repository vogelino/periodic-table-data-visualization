const d3 = require('d3');
const Deferred = require('deferred-js');
const Immutable = require('immutable');

const ElementsModel = () => {
	const that = {};
	const my = {};

	my.model = Immutable.Map({
		elements: Immutable.List
	});

	that.construct = () => {};

	that.fetch = () => {
		const dfd = new Deferred();
		d3.json('../data/elements.json', (data) => {
			const elements = Immutable.List(data[0].elements);
			that.set('elements', elements);
			dfd.resolve(that.get());
		});
		return dfd.promise();
	};

	that.set = (keyPath, value) => {
		if (!Array.isArray(keyPath)) {
			keyPath = [keyPath];
		}
		my.model = my.model.setIn(keyPath, value);
	};

	that.get = (keyPath = ['elements']) => {
		return my.model.getIn(keyPath);
	};

	that.construct.apply(arguments);
	return that;
};

export default ElementsModel;

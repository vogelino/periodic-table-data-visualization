const d3 = require('d3');
const Immutable = require('immutable');

const ElementsList = () => {
	const that = {};
	const my = {};

	my.defaults = {
		verticalSpace: 35,
		dotRadius: 15,
		sortingKey: 'groupBlock',
		sizeParameter: 'atomicNumber',
		dotToLabelDistance: 60,
		dotTextSize: 12,
		strokeWidth: 2,
		legendsHeight: 100,
		colors: {
			'nonmetal': 			'#DA56D6',
			'noble gas': 			'#6ED549',
			'alkali metal': 		'#E25E48',
			'alkaline earth metal': '#52C3C3',
			'metalloid': 			'#8B98CD',
			'halogen': 				'#D8699A',
			'metal': 				'#C78F37',
			'transition metal': 	'#C4CC43',
			'lanthanoid': 			'#69B971',
			'actinoid': 			'#967BE2'
		}
	};

	that.setElement = (id) => {
		my.id = id;
	};

	that.render = () => {
		document.getElementById(my.id).innerHTML = "";
		const margin = {top: 40, right: 40, bottom: 30, left: 40};
		my.width = window.innerWidth - margin.left - margin.right;
		my.height = my.model.get().size * my.defaults.verticalSpace;
		my.svg = d3.select(`#${my.id}`).append("svg")
			.attr("width", my.width + margin.left + margin.right)
			.attr("height", my.height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		my.displayList();
	};

	that.setSortingKey = (sortingKey) => {
		my.defaults.sortingKey = sortingKey;
	};

	that.setSizeKey = (sizeParameter) => {
		my.defaults.sizeParameter = sizeParameter;
	};

	my.displayList = () => {
		const scale = d3.scale.linear();
		let elements = my.model.get();
		scale.domain(my.getScaleDomain(elements));
		scale.range([0, (my.width - my.defaults.dotRadius - 200)]);
		elements = elements.sort((a, b) => my.sortElementsBy(my.defaults.sortingKey, a, b));
		elements = elements.toJSON();

		my.svg.selectAll('.grid-line')
			.data(elements)
			.enter().append('line')
			.attr('stroke', (d, i) => i % 10 === 0 ? 'lightgrey' : 'whitesmoke')
			.attr('stroke-width', 1)
			.attr('x1', (d, i) => scale(i))
			.attr('y1', 0)
			.attr('x2', (d, i) => scale(i))
			.attr('y2', my.height);

		my.svg.selectAll('.name')
			.data(elements)
			.enter().append('text')
			.attr('fill', my.mapGroupBlockToColor)
			.attr('x', (d) => scale(d[my.defaults.sizeParameter]) + my.defaults.dotToLabelDistance)
			.attr('y', (d, i) => (i * my.defaults.verticalSpace) + 7)
			.text((d) => `${d.name}`);

		my.svg.selectAll('.line')
			.data(elements)
			.enter().append('line')
			.attr('stroke', my.mapGroupBlockToColor)
			.attr('stroke-width', my.defaults.strokeWidth)
			.attr('x1', scale(0))
			.attr('y1', (d, i) => (i * my.defaults.verticalSpace))
			.attr('x2', (d) => scale(d[my.defaults.sizeParameter]))
			.attr('y2', (d, i) => (i * my.defaults.verticalSpace));

		my.svg.selectAll('.symbol-dot')
			.data(elements)
			.enter().append('circle')
			.attr('stroke', my.mapGroupBlockToColor)
			.attr('fill', my.mapGroupBlockToColor)
			.attr('stroke-width', my.defaults.strokeWidth)
			.attr('r', my.defaults.dotRadius)
			.attr('cx', (d) => scale(d[my.defaults.sizeParameter]) + (my.defaults.dotRadius * 2))
			.attr('cy', (d, i) => (i * my.defaults.verticalSpace));

		const rectSize = (my.defaults.dotRadius * 2);
		my.svg.selectAll('.symbol-rect')
			.data(elements)
			.enter().append('rect')
			.attr('stroke', my.mapGroupBlockToColor)
			.attr('fill', my.mapGroupBlockToColor)
			.attr('stroke-width', my.defaults.strokeWidth)
			.attr('width', rectSize)
			.attr('height', rectSize)
			.attr('x', (d) => scale(d[my.defaults.sizeParameter]) - (rectSize / 10))
			.attr('y', (d, i) => (i * my.defaults.verticalSpace) - my.defaults.dotRadius);

		my.svg.selectAll('.value-dot')
			.data(elements)
			.enter().append('circle')
			.attr('stroke', my.mapGroupBlockToColor)
			.attr('stroke-width', my.defaults.strokeWidth)
			.attr('fill', '#fff')
			.attr('r', my.defaults.dotRadius)
			.attr('cx', (d) => scale(d[my.defaults.sizeParameter]))
			.attr('cy', (d, i) => (i * my.defaults.verticalSpace));

		my.svg.selectAll('.value-text')
			.data(elements)
			.enter().append('text')
			.attr('fill', my.mapGroupBlockToColor)
			.attr('x', (d) => scale(d[my.defaults.sizeParameter]))
			.attr('y', (d, i) => (i * my.defaults.verticalSpace) + 5)
			.attr('font-size', my.defaults.dotTextSize)
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'middle')
			.text((d) => {
				return d[my.defaults.sizeParameter] !== '' ?
					`${d[my.defaults.sizeParameter]}` : '?';
			});

		my.svg.selectAll('.symbol-text')
			.data(elements)
			.enter().append('text')
			.attr('fill', '#fff')
			.attr('x', (d) => scale(d[my.defaults.sizeParameter]) +
				rectSize - (my.defaults.strokeWidth))
			.attr('y', (d, i) => (i * my.defaults.verticalSpace) + 5)
			.attr('font-size', my.defaults.dotTextSize)
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'middle')
			.text((d) => `${d.symbol}`);
	};

	my.mapGroupBlockToColor = (d) => {
		switch (d.groupBlock) {
			case 'nonmetal':
				return my.defaults.colors['nonmetal'];
			case 'noble gas':
				return my.defaults.colors['noble gas'];
			case 'alkali metal':
				return my.defaults.colors['alkali metal'];
			case 'alkaline earth metal':
				return my.defaults.colors['alkaline earth metal'];
			case 'metalloid':
				return my.defaults.colors['metalloid'];
			case 'halogen':
				return my.defaults.colors['halogen'];
			case 'metal':
				return my.defaults.colors['metal'];
			case 'transition metal':
				return my.defaults.colors['transition metal'];
			case 'lanthanoid':
				return my.defaults.colors['lanthanoid'];
			case 'actinoid':
				return my.defaults.colors['actinoid'];
		}
	};

	my.getScaleDomain = (elements) => {
		const sortedElems = elements.sort(
			(a, b) => my.sortElementsBy(my.defaults.sizeParameter, a, b)).toJSON();

		return [
			sortedElems[0][my.defaults.sizeParameter] || 0,
			sortedElems[sortedElems.length - 1][my.defaults.sizeParameter]
		];
	};

	my.sortElementsBy = (key, a, b) => {
		if(a[key] < b[key]) return -1;
		if(a[key] > b[key]) return 1;
		return 0;
	};

	that.setModel = (model) => {
		my.model = model;
	};

	my.getModel = () => {
		return my.model;
	};

	return that;
};

export default ElementsList;
